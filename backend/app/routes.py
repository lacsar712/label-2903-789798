from flask import Blueprint, render_template, url_for, flash, redirect, request, jsonify
from app import db, bcrypt
from app.models import User, CarModel, SalesData, ChargingPile, FilterPreset, AlertRule, AlertNotification, CarReview
from flask_login import login_user, current_user, logout_user, login_required
from sqlalchemy import func, or_, text
import random
import json
from datetime import datetime

bp = Blueprint('main', __name__)

@bp.route("/")
@login_required
def home():
    return render_template('index.html')

@bp.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('main.home'))
        else:
            flash('登录失败，请检查用户名或密码', 'danger')
    return render_template('login.html')

@bp.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('账号创建成功！请登录', 'success')
        return redirect(url_for('main.login'))
    return render_template('register.html')

@bp.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('main.login'))

@bp.route("/admin/data")
@login_required
def admin_data():
    if current_user.role != 'admin':
        return redirect(url_for('main.home'))
    return render_template('admin_data.html')

# --- Helper for Chart Filtering ---
def apply_car_filters(query):
    brand = request.args.get('brand')
    category_list = request.args.getlist('category[]')
    price_min = request.args.get('price_min')
    price_max = request.args.get('price_max')
    range_min = request.args.get('range_min')

    if brand:
        query = query.filter(CarModel.brand == brand)
    if category_list:
        query = query.filter(CarModel.category.in_(category_list))
    if price_min:
        query = query.filter(CarModel.price >= float(price_min))
    if price_max:
        query = query.filter(CarModel.price <= float(price_max))
    if range_min:
        query = query.filter(CarModel.range_km >= int(range_min))
    return query

# --- Chart APIs ---

@bp.route("/api/chart/bar")
@login_required
def get_bar_data():
    query = CarModel.query
    query = apply_car_filters(query)
    
    sort_field = request.args.get('sort_field', 'model_name')
    sort_order = request.args.get('sort_order', 'asc')
    
    # Map sort fields to columns
    field_map = {
        'range': CarModel.range_km,
        'price': CarModel.price,
        'power': CarModel.power_consumption,
        'sales': func.sum(SalesData.quantity)
    }
    
    if sort_field == 'sales':
        # Join with SalesData for sales sorting
        query = db.session.query(CarModel, func.sum(SalesData.quantity).label('total_sales')).join(SalesData).group_by(CarModel.id)
        # Re-apply filters if we recreated the query
        brand = request.args.get('brand')
        category_list = request.args.getlist('category[]')
        price_min = request.args.get('price_min')
        price_max = request.args.get('price_max')
        range_min = request.args.get('range_min')
        if brand: query = query.filter(CarModel.brand == brand)
        if category_list: query = query.filter(CarModel.category.in_(category_list))
        if price_min: query = query.filter(CarModel.price >= float(price_min))
        if price_max: query = query.filter(CarModel.price <= float(price_max))
        if range_min: query = query.filter(CarModel.range_km >= int(range_min))

        if sort_order == 'desc':
            query = query.order_by(func.sum(SalesData.quantity).desc())
        else:
            query = query.order_by(func.sum(SalesData.quantity).asc())
        
        results = query.all()
        cars = [r[0] for r in results]
    else:
        col = field_map.get(sort_field, CarModel.model_name)
        if sort_order == 'desc':
            query = query.order_by(col.desc())
        else:
            query = query.order_by(col.asc())
        cars = query.all()
    
    return jsonify({
        'models': [c.model_name for c in cars],
        'model_ids': [c.id for c in cars],
        'brands': [c.brand for c in cars],
        'range': [c.range_km for c in cars],
        'price': [c.price for c in cars],
        'power': [c.power_consumption for c in cars]
    })

@bp.route("/api/chart/line")
@login_required
def get_line_data():
    brand = request.args.get('brand')
    # If a brand is selected, show its trend vs total
    query = db.session.query(SalesData.period, func.sum(SalesData.quantity))
    if brand:
        query = query.join(CarModel).filter(CarModel.brand == brand)
    
    sales = query.group_by(SalesData.period).order_by(SalesData.period).all()
    
    # Also get market share logic if brand selected
    return jsonify({
        'periods': [s[0] for s in sales],
        'sales': [int(s[1]) for s in sales]
    })

@bp.route("/api/chart/pie")
@login_required
def get_pie_data():
    city = request.args.get('city', '北京')
    # Use 'like' to match both '北京' and '北京市'
    sales = db.session.query(
        CarModel.brand, func.sum(SalesData.quantity)
    ).join(SalesData).filter(SalesData.region.like(f"%{city}%")).group_by(CarModel.brand).all()
    
    return jsonify([{"name": s[0], "value": int(s[1])} for s in sales])

@bp.route("/api/chart/scatter")
@login_required
def get_scatter_data():
    query = CarModel.query
    query = apply_car_filters(query)
    cars = query.all()
    
    return jsonify({
        'price_range': [[c.price, c.range_km, c.model_name] for c in cars],
        'weight_power': [[c.weight_kg, c.power_consumption, c.model_name] for c in cars]
    })

@bp.route("/api/chart/map")
@login_required
def get_map_data():
    brand = request.args.get('brand')
    mode = request.args.get('mode', 'sales') # sales or density
    
    if mode == 'density':
        subq = db.session.query(
            ChargingPile.province,
            func.max(ChargingPile.period).label('max_period')
        ).group_by(ChargingPile.province).subquery()

        piles = db.session.query(ChargingPile).join(
            subq,
            (ChargingPile.province == subq.c.province) & (ChargingPile.period == subq.c.max_period)
        ).all()

        if not piles:
            piles = ChargingPile.query.all()

        seen = {}
        for p in piles:
            if p.province not in seen:
                seen[p.province] = p.density

        return jsonify({
            'data': [{"name": prov, "value": dens} for prov, dens in seen.items()],
            'title': '各省份充电桩密度分布'
        })
    else:
        query = db.session.query(SalesData.region, func.sum(SalesData.quantity)).join(CarModel)
        
        # Apply filters to Sales Map
        brand = request.args.get('brand')
        category_list = request.args.getlist('category[]')
        price_min = request.args.get('price_min')
        price_max = request.args.get('price_max')
        range_min = request.args.get('range_min')
        
        if brand: query = query.filter(CarModel.brand == brand)
        if category_list: query = query.filter(CarModel.category.in_(category_list))
        if price_min: query = query.filter(CarModel.price >= float(price_min))
        if price_max: query = query.filter(CarModel.price <= float(price_max))
        if range_min: query = query.filter(CarModel.range_km >= int(range_min))
            
        sales = query.group_by(SalesData.region).all()
        
        # Keeping names as they are (e.g. "北京市") to match Alibaba GeoJSON exactly
        formatted_sales = []
        for s in sales:
            formatted_sales.append({"name": s[0], "value": int(s[1])})

        return jsonify({
            'data': formatted_sales,
            'title': f'{brand} 全国销量分布' if brand else '全国销售热力分布'
        })

# --- Admin CRUD APIs ---

@bp.route("/api/admin/cars", methods=['GET'])
@login_required
def get_all_cars():
    if current_user.role != 'admin': return jsonify([]), 403
    cars = CarModel.query.all()
    return jsonify([{
        'id': c.id, 'brand': c.brand, 'model_name': c.model_name,
        'price': c.price, 'range_km': c.range_km, 'power': c.power_consumption,
        'weight': c.weight_kg, 'category': c.category
    } for c in cars])

@bp.route("/api/admin/cars", methods=['POST'])
@login_required
def add_car():
    if current_user.role != 'admin': return jsonify({}), 403
    data = request.json
    car = CarModel(
        brand=data['brand'], model_name=data['model_name'],
        price=float(data['price']), range_km=int(data['range_km']),
        power_consumption=float(data['power']), weight_kg=int(data['weight']),
        category=data['category']
    )
    db.session.add(car)
    db.session.flush() # Get the ID before commit

    # Auto-generate some dummy sales for this car so it shows in charts
    regions = ['北京市', '上海市', '广东省', '浙江省']
    periods = ['2023 Q4', '2024 Q1']
    for r in regions:
        for p in periods:
            sale = SalesData(car_model_id=car.id, region=r, period=p, quantity=random.randint(500, 1500))
            db.session.add(sale)
            
    db.session.commit()
    return jsonify({'id': car.id})

@bp.route("/api/admin/cars/<int:id>", methods=['PUT', 'DELETE'])
@login_required
def update_delete_car(id):
    if current_user.role != 'admin': return jsonify({}), 403
    car = CarModel.query.get_or_404(id)
    if request.method == 'DELETE':
        # Also clean up sales data
        SalesData.query.filter_by(car_model_id=id).delete()
        db.session.delete(car)
        db.session.commit()
        return jsonify({'status': 'deleted'})
    
    data = request.json
    car.brand = data['brand']
    car.model_name = data['model_name']
    car.price = float(data['price'])
    car.range_km = int(data['range_km'])
    car.power_consumption = float(data['power'])
    car.weight_kg = int(data['weight'])
    car.category = data['category']
    db.session.commit()
    return jsonify({'status': 'updated'})

@bp.route("/admin/init_db")
@login_required
def init_db_data():
    if current_user.role != 'admin':
        return jsonify({'error': '无权限'}), 403
    
    db.session.query(SalesData).delete()
    db.session.query(CarModel).delete()
    db.session.query(ChargingPile).delete()
    
    models_data = [
        ('特斯拉', 'Model 3', 25.5, 600, 12.5, 1600, '纯电'),
        ('特斯拉', 'Model Y', 31.0, 545, 14.0, 1850, '纯电'),
        ('比亚迪', '汉EV', 22.0, 610, 13.2, 1750, '纯电'),
        ('比亚迪', '秦Plus Dm-i', 12.0, 120, 4.5, 1500, '混动'),
        ('蔚来', 'ET7', 45.0, 675, 15.5, 1950, '纯电'),
        ('蔚来', 'ES6', 38.0, 490, 17.0, 2100, '纯电'),
        ('小鹏', 'P7', 23.5, 586, 13.0, 1700, '纯电'),
        ('小鹏', 'G9', 30.0, 520, 16.0, 2200, '纯电')
    ]
    
    for m in models_data:
        car = CarModel(brand=m[0], model_name=m[1], price=m[2], range_km=m[3], power_consumption=m[4], weight_kg=m[5], category=m[6])
        db.session.add(car)
    db.session.commit()
    
    # Full list of 34 Chinese regions to avoid "NaN" on map
    provinces = [
        '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', 
        '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '湖北省', 
        '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', 
        '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', 
        '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区', '台湾省'
    ]
    periods = ['2023 Q3', '2023 Q4', '2024 Q1']
    
    for car in CarModel.query.all():
        for p in provinces:
            for t in periods:
                s = SalesData(car_model_id=car.id, region=p, period=t, quantity=random.randint(100, 1000))
                db.session.add(s)
    
    # Populate Charging Pile Data with multiple periods for history
    pile_periods = ['2023 Q3', '2023 Q4', '2024 Q1']
    for p in provinces:
        base_density = round(random.uniform(5.0, 50.0), 1)
        for i, period in enumerate(pile_periods):
            variation = round(base_density - i * random.uniform(0.5, 3.0), 1)
            density = round(max(variation, 1.0), 1)
            pile = ChargingPile(province=p, density=density, period=period)
            db.session.add(pile)
        
    db.session.commit()
    
    return jsonify({'status': '数据初始化成功'})

# --- User Management & Password Change ---

@bp.route("/api/admin/users", methods=['GET', 'POST'])
@login_required
def manage_users():
    if current_user.role != 'admin': return jsonify([]), 403
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([{'id': u.id, 'username': u.username, 'role': u.role} for u in users])
    
    data = request.json
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], password=hashed_pw, role=data.get('role', 'user'))
    db.session.add(user)
    db.session.commit()
    return jsonify({'status': 'created'})

@bp.route("/api/admin/users/<int:id>", methods=['PUT', 'DELETE'])
@login_required
def edit_user(id):
    if current_user.role != 'admin': return jsonify({}), 403
    user = User.query.get_or_404(id)
    if request.method == 'DELETE':
        if user.id == current_user.id: return jsonify({'error': '不能删除自己'}), 400
        db.session.delete(user)
        db.session.commit()
        return jsonify({'status': 'deleted'})
    
    data = request.json
    user.username = data['username']
    user.role = data['role']
    if data.get('password'):
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    db.session.commit()
    return jsonify({'status': 'updated'})

@bp.route("/change_password", methods=['GET', 'POST'])
@login_required
def change_password():
    if request.method == 'POST':
        old_pw = request.form.get('old_password')
        new_pw = request.form.get('new_password')
        if bcrypt.check_password_hash(current_user.password, old_pw):
            current_user.password = bcrypt.generate_password_hash(new_pw).decode('utf-8')
            db.session.commit()
            flash('密码修改成功！', 'success')
            return redirect(url_for('main.home'))
        else:
            flash('旧密码错误', 'danger')
    return render_template('change_password.html')

@bp.route("/admin/users")
@login_required
def admin_users():
    if current_user.role != 'admin':
        return redirect(url_for('main.home'))
    return render_template('admin_users.html')

@bp.route("/api/user/tour_status")
@login_required
def get_tour_status():
    return jsonify({'has_seen_tour': current_user.has_seen_tour})

@bp.route("/api/user/tour_status", methods=['POST'])
@login_required
def mark_tour_seen():
    if not current_user.has_seen_tour:
        current_user.has_seen_tour = True
        db.session.commit()
    return jsonify({'status': 'ok', 'has_seen_tour': current_user.has_seen_tour})

# --- Filter Preset APIs ---

@bp.route("/api/filter_presets", methods=['GET'])
@login_required
def list_filter_presets():
    mine = FilterPreset.query.filter_by(user_id=current_user.id).all()
    public = FilterPreset.query.filter_by(is_public=True).filter(FilterPreset.user_id != current_user.id).all()
    
    is_admin = current_user.role == 'admin'
    
    result = []
    for p in mine:
        result.append({
            'id': p.id,
            'name': p.name,
            'filters': json.loads(p.filters_json),
            'is_public': p.is_public,
            'is_mine': True,
            'owner_name': p.user.username,
            'can_edit': True,
            'can_delete': True,
            'can_toggle_public': is_admin,
            'created_at': p.created_at.strftime('%Y-%m-%d %H:%M')
        })
    for p in public:
        result.append({
            'id': p.id,
            'name': p.name,
            'filters': json.loads(p.filters_json),
            'is_public': True,
            'is_mine': False,
            'owner_name': p.user.username,
            'can_edit': False,
            'can_delete': is_admin,
            'can_toggle_public': is_admin,
            'created_at': p.created_at.strftime('%Y-%m-%d %H:%M')
        })
    
    result.sort(key=lambda x: (0 if x['is_mine'] else 1, x['name']))
    return jsonify(result)

@bp.route("/api/filter_presets", methods=['POST'])
@login_required
def create_filter_preset():
    data = request.json
    name = data.get('name', '').strip()
    filters = data.get('filters')
    
    if not name:
        return jsonify({'error': '方案名称不能为空'}), 400
    if not filters or not isinstance(filters, dict):
        return jsonify({'error': '筛选参数无效'}), 400
    
    existing = FilterPreset.query.filter_by(user_id=current_user.id, name=name).first()
    if existing:
        return jsonify({'error': '您已存在同名方案'}), 400
    
    preset = FilterPreset(
        name=name,
        user_id=current_user.id,
        filters_json=json.dumps(filters, ensure_ascii=False),
        is_public=False
    )
    db.session.add(preset)
    db.session.commit()
    
    return jsonify({
        'id': preset.id,
        'name': preset.name,
        'filters': json.loads(preset.filters_json),
        'is_public': False,
        'is_mine': True,
        'owner_name': current_user.username,
        'can_edit': True,
        'can_delete': True,
        'can_toggle_public': current_user.role == 'admin',
        'created_at': preset.created_at.strftime('%Y-%m-%d %H:%M')
    })

@bp.route("/api/filter_presets/<int:preset_id>", methods=['PUT'])
@login_required
def update_filter_preset(preset_id):
    preset = FilterPreset.query.get_or_404(preset_id)
    is_admin = current_user.role == 'admin'
    
    if preset.user_id != current_user.id and not is_admin:
        return jsonify({'error': '无权限修改此方案'}), 403
    
    data = request.json
    name = data.get('name')
    is_public = data.get('is_public')
    filters = data.get('filters')
    
    if name is not None:
        name = name.strip()
        if not name:
            return jsonify({'error': '方案名称不能为空'}), 400
        preset.name = name
    
    if is_public is not None:
        if not is_admin:
            return jsonify({'error': '仅管理员可标记公共方案'}), 403
        preset.is_public = bool(is_public)
    
    if filters is not None:
        if not isinstance(filters, dict):
            return jsonify({'error': '筛选参数无效'}), 400
        preset.filters_json = json.dumps(filters, ensure_ascii=False)
    
    db.session.commit()
    
    return jsonify({
        'id': preset.id,
        'name': preset.name,
        'filters': json.loads(preset.filters_json),
        'is_public': preset.is_public,
        'is_mine': preset.user_id == current_user.id,
        'owner_name': preset.user.username,
        'can_edit': preset.user_id == current_user.id,
        'can_delete': preset.user_id == current_user.id or is_admin,
        'can_toggle_public': is_admin,
        'created_at': preset.created_at.strftime('%Y-%m-%d %H:%M')
    })

@bp.route("/api/filter_presets/<int:preset_id>", methods=['DELETE'])
@login_required
def delete_filter_preset(preset_id):
    preset = FilterPreset.query.get_or_404(preset_id)
    is_admin = current_user.role == 'admin'
    
    if preset.user_id != current_user.id and not is_admin:
        return jsonify({'error': '无权限删除此方案'}), 403
    
    db.session.delete(preset)
    db.session.commit()
    return jsonify({'status': 'deleted'})

@bp.route("/api/filter_presets/<int:preset_id>/toggle_public", methods=['POST'])
@login_required
def toggle_preset_public(preset_id):
    if current_user.role != 'admin':
        return jsonify({'error': '仅管理员可操作'}), 403
    
    preset = FilterPreset.query.get_or_404(preset_id)
    preset.is_public = not preset.is_public
    db.session.commit()
    
    return jsonify({
        'id': preset.id,
        'is_public': preset.is_public,
        'name': preset.name
    })

# ============ Market Alert Subscription Center ============

@bp.route("/alert_center")
@login_required
def alert_center():
    return render_template('alert_center.html')

@bp.route("/api/alert/rules", methods=['GET'])
@login_required
def list_alert_rules():
    rules = AlertRule.query.filter_by(user_id=current_user.id).order_by(AlertRule.created_at.desc()).all()
    return jsonify([{
        'id': r.id,
        'name': r.name,
        'rule_type': r.rule_type,
        'dimension': r.dimension,
        'target_value': r.target_value,
        'metric': r.metric,
        'condition': r.condition,
        'threshold': r.threshold,
        'consecutive_periods': r.consecutive_periods,
        'is_enabled': r.is_enabled,
        'created_at': r.created_at.strftime('%Y-%m-%d %H:%M'),
        'last_checked': r.last_checked.strftime('%Y-%m-%d %H:%M') if r.last_checked else None
    } for r in rules])

@bp.route("/api/alert/rules", methods=['POST'])
@login_required
def create_alert_rule():
    data = request.json
    name = data.get('name', '').strip()
    rule_type = data.get('rule_type')
    dimension = data.get('dimension')
    target_value = data.get('target_value')
    metric = data.get('metric')
    condition = data.get('condition')
    threshold = data.get('threshold')
    consecutive_periods = data.get('consecutive_periods', 1)

    if not name:
        return jsonify({'error': '规则名称不能为空'}), 400
    if not rule_type or not dimension or not metric or not condition or threshold is None:
        return jsonify({'error': '请填写完整的规则参数'}), 400

    rule = AlertRule(
        user_id=current_user.id,
        name=name,
        rule_type=rule_type,
        dimension=dimension,
        target_value=target_value,
        metric=metric,
        condition=condition,
        threshold=float(threshold),
        consecutive_periods=int(consecutive_periods),
        is_enabled=True
    )
    db.session.add(rule)
    db.session.commit()

    return jsonify({
        'id': rule.id,
        'name': rule.name,
        'rule_type': rule.rule_type,
        'dimension': rule.dimension,
        'target_value': rule.target_value,
        'metric': rule.metric,
        'condition': rule.condition,
        'threshold': rule.threshold,
        'consecutive_periods': rule.consecutive_periods,
        'is_enabled': rule.is_enabled,
        'created_at': rule.created_at.strftime('%Y-%m-%d %H:%M')
    })

@bp.route("/api/alert/rules/<int:rule_id>", methods=['PUT'])
@login_required
def update_alert_rule(rule_id):
    rule = AlertRule.query.get_or_404(rule_id)
    if rule.user_id != current_user.id:
        return jsonify({'error': '无权限修改此规则'}), 403

    data = request.json
    if 'name' in data:
        name = data['name'].strip()
        if not name:
            return jsonify({'error': '规则名称不能为空'}), 400
        rule.name = name
    if 'is_enabled' in data:
        rule.is_enabled = bool(data['is_enabled'])
    if 'rule_type' in data:
        rule.rule_type = data['rule_type']
    if 'dimension' in data:
        rule.dimension = data['dimension']
    if 'target_value' in data:
        rule.target_value = data['target_value']
    if 'metric' in data:
        rule.metric = data['metric']
    if 'condition' in data:
        rule.condition = data['condition']
    if 'threshold' in data:
        rule.threshold = float(data['threshold'])
    if 'consecutive_periods' in data:
        rule.consecutive_periods = int(data['consecutive_periods'])

    db.session.commit()
    return jsonify({
        'id': rule.id,
        'name': rule.name,
        'rule_type': rule.rule_type,
        'dimension': rule.dimension,
        'target_value': rule.target_value,
        'metric': rule.metric,
        'condition': rule.condition,
        'threshold': rule.threshold,
        'consecutive_periods': rule.consecutive_periods,
        'is_enabled': rule.is_enabled,
        'created_at': rule.created_at.strftime('%Y-%m-%d %H:%M'),
        'last_checked': rule.last_checked.strftime('%Y-%m-%d %H:%M') if rule.last_checked else None
    })

@bp.route("/api/alert/rules/<int:rule_id>", methods=['DELETE'])
@login_required
def delete_alert_rule(rule_id):
    rule = AlertRule.query.get_or_404(rule_id)
    if rule.user_id != current_user.id:
        return jsonify({'error': '无权限删除此规则'}), 403

    db.session.delete(rule)
    db.session.commit()
    return jsonify({'status': 'deleted'})

@bp.route("/api/alert/rules/<int:rule_id>/toggle", methods=['POST'])
@login_required
def toggle_alert_rule(rule_id):
    rule = AlertRule.query.get_or_404(rule_id)
    if rule.user_id != current_user.id:
        return jsonify({'error': '无权限操作此规则'}), 403

    rule.is_enabled = not rule.is_enabled
    db.session.commit()
    return jsonify({
        'id': rule.id,
        'is_enabled': rule.is_enabled
    })

# ============ Alert Detection Engine ============

def get_brand_sales_periods(brand):
    query = db.session.query(
        SalesData.period,
        func.sum(SalesData.quantity)
    ).join(CarModel).filter(CarModel.brand == brand).group_by(SalesData.period).order_by(SalesData.period).all()
    return [(p[0], int(p[1])) for p in query]

def get_region_brand_sales(region, brand=None):
    query = db.session.query(
        SalesData.period,
        func.sum(SalesData.quantity)
    ).join(CarModel).filter(SalesData.region.like(f"%{region}%"))
    if brand:
        query = query.filter(CarModel.brand == brand)
    sales = query.group_by(SalesData.period).order_by(SalesData.period).all()
    return [(p[0], int(p[1])) for p in sales]

def get_province_pile_density_history(province):
    piles = ChargingPile.query.filter_by(province=province).order_by(ChargingPile.period).all()
    if piles:
        distinct_piles = {}
        for p in piles:
            distinct_piles[p.period] = float(p.density)
        return sorted(distinct_piles.items(), key=lambda x: x[0])
    return []

def calculate_change(values):
    if len(values) < 2:
        return None
    latest = values[-1]
    previous = values[-2]
    if previous == 0:
        return None
    return ((latest - previous) / previous) * 100

def check_condition(actual, condition, threshold):
    if condition == 'gt':
        return actual > threshold
    elif condition == 'gte':
        return actual >= threshold
    elif condition == 'lt':
        return actual < threshold
    elif condition == 'lte':
        return actual <= threshold
    elif condition == 'eq':
        return abs(actual - threshold) < 0.001
    return False

def evaluate_rule(rule):
    snapshot = {}
    triggered = False
    metric_value = None
    values_series = []

    if rule.rule_type == 'sales':
        if rule.dimension == 'brand':
            values_series = get_brand_sales_periods(rule.target_value)
            snapshot['brand'] = rule.target_value
        elif rule.dimension == 'region':
            values_series = get_region_brand_sales(rule.target_value)
            snapshot['region'] = rule.target_value
        elif rule.dimension == 'brand_region':
            parts = rule.target_value.split('|') if rule.target_value else ['', '']
            values_series = get_region_brand_sales(parts[0], parts[1] if len(parts) > 1 else None)
            snapshot['region'] = parts[0]
            snapshot['brand'] = parts[1] if len(parts) > 1 else ''

        snapshot['periods'] = [v[0] for v in values_series]
        snapshot['values'] = [v[1] for v in values_series]

        if rule.metric == 'quantity':
            if values_series:
                metric_value = values_series[-1][1]
        elif rule.metric == 'change_rate':
            metric_value = calculate_change([v[1] for v in values_series])

    elif rule.rule_type == 'charging_pile':
        values_series = get_province_pile_density_history(rule.target_value)
        snapshot['province'] = rule.target_value
        snapshot['periods'] = [v[0] for v in values_series]
        snapshot['values'] = [v[1] for v in values_series]

        if rule.metric == 'density':
            if values_series:
                metric_value = values_series[-1][1]
        elif rule.metric == 'consecutive_decline':
            vals = [v[1] for v in values_series]
            if len(vals) >= rule.consecutive_periods:
                declines = 0
                for i in range(len(vals) - rule.consecutive_periods, len(vals) - 1):
                    if vals[i + 1] < vals[i]:
                        declines += 1
                snapshot['consecutive_declines'] = declines
                if declines >= rule.consecutive_periods - 1:
                    triggered = True
                    metric_value = declines

    if metric_value is not None and rule.metric != 'consecutive_decline':
        triggered = check_condition(metric_value, rule.condition, rule.threshold)

    snapshot['metric_value'] = metric_value
    snapshot['threshold'] = rule.threshold
    snapshot['condition'] = rule.condition
    snapshot['metric'] = rule.metric

    return triggered, snapshot

@bp.route("/api/alert/check", methods=['POST'])
@login_required
def check_all_alerts():
    rules = AlertRule.query.filter_by(user_id=current_user.id, is_enabled=True).all()
    triggered_count = 0
    new_notifications = []

    for rule in rules:
        try:
            triggered, snapshot = evaluate_rule(rule)
            rule.last_checked = datetime.now()

            if triggered:
                metric_desc = {
                    'quantity': '销量',
                    'change_rate': '销量环比变化率',
                    'density': '充电桩密度',
                    'consecutive_decline': '连续下滑期数'
                }.get(rule.metric, rule.metric)

                condition_desc = {
                    'gt': '大于',
                    'gte': '大于等于',
                    'lt': '小于',
                    'lte': '小于等于',
                    'eq': '等于'
                }.get(rule.condition, rule.condition)

                unit = '%' if rule.metric == 'change_rate' else ('个/km²' if rule.metric == 'density' else '辆')
                value_display = f"{snapshot.get('metric_value', 'N/A')}{unit}" if snapshot.get('metric_value') is not None else 'N/A'

                title = f"异动警报：{rule.name}"
                message = f"{rule.target_value or ''} 的{metric_desc}为{value_display}，{condition_desc}阈值 {rule.threshold}{unit}，已触发监测规则。"

                existing = AlertNotification.query.filter_by(
                    user_id=current_user.id,
                    rule_id=rule.id,
                    is_read=False
                ).order_by(AlertNotification.created_at.desc()).first()

                should_create = True
                if existing:
                    from datetime import timedelta
                    if datetime.now() - existing.created_at < timedelta(hours=1):
                        should_create = False

                if should_create:
                    notification = AlertNotification(
                        user_id=current_user.id,
                        rule_id=rule.id,
                        title=title,
                        message=message,
                        snapshot_json=json.dumps(snapshot, ensure_ascii=False)
                    )
                    db.session.add(notification)
                    new_notifications.append(notification)
                    triggered_count += 1

        except Exception as e:
            print(f"Error checking rule {rule.id}: {e}")
            continue

    db.session.commit()

    return jsonify({
        'triggered_count': triggered_count,
        'rules_checked': len(rules)
    })

# ============ Alert Notifications ============

@bp.route("/api/alert/notifications", methods=['GET'])
@login_required
def list_notifications():
    only_unread = request.args.get('unread', '0') == '1'
    query = AlertNotification.query.filter_by(user_id=current_user.id)
    if only_unread:
        query = query.filter_by(is_read=False)
    notifications = query.order_by(AlertNotification.created_at.desc()).limit(50).all()

    return jsonify([{
        'id': n.id,
        'rule_id': n.rule_id,
        'rule_name': n.rule.name if n.rule else '',
        'title': n.title,
        'message': n.message,
        'snapshot': json.loads(n.snapshot_json) if n.snapshot_json else {},
        'is_read': n.is_read,
        'created_at': n.created_at.strftime('%Y-%m-%d %H:%M')
    } for n in notifications])

@bp.route("/api/alert/notifications/unread_count", methods=['GET'])
@login_required
def unread_notification_count():
    count = AlertNotification.query.filter_by(user_id=current_user.id, is_read=False).count()
    return jsonify({'unread_count': count})

@bp.route("/api/alert/notifications/<int:notif_id>/read", methods=['POST'])
@login_required
def mark_notification_read(notif_id):
    notification = AlertNotification.query.get_or_404(notif_id)
    if notification.user_id != current_user.id:
        return jsonify({'error': '无权限操作'}), 403

    notification.is_read = True
    db.session.commit()
    return jsonify({'status': 'ok', 'is_read': True})

@bp.route("/api/alert/notifications/read_all", methods=['POST'])
@login_required
def mark_all_notifications_read():
    AlertNotification.query.filter_by(user_id=current_user.id, is_read=False).update({'is_read': True})
    db.session.commit()
    return jsonify({'status': 'ok'})

@bp.route("/api/alert/meta", methods=['GET'])
@login_required
def get_alert_meta():
    brands = [b[0] for b in db.session.query(CarModel.brand).distinct().all()]
    provinces = [p[0] for p in db.session.query(ChargingPile.province).distinct().all()]
    return jsonify({
        'brands': brands,
        'provinces': provinces,
        'metrics': {
            'sales': [
                {'value': 'quantity', 'label': '销量绝对值'},
                {'value': 'change_rate', 'label': '环比变化率 (%)'}
            ],
            'charging_pile': [
                {'value': 'density', 'label': '密度绝对值'},
                {'value': 'consecutive_decline', 'label': '连续下滑期数'}
            ]
        },
        'conditions': [
            {'value': 'gt', 'label': '大于 (>)'},
            {'value': 'gte', 'label': '大于等于 (≥)'},
            {'value': 'lt', 'label': '小于 (<)'},
            {'value': 'lte', 'label': '小于等于 (≤)'},
            {'value': 'eq', 'label': '等于 (=)'}
        ]
    })

# ============ Quarterly Report ============

@bp.route("/quarterly_report")
@login_required
def quarterly_report():
    if current_user.role != 'admin':
        return redirect(url_for('main.home'))
    return render_template('quarterly_report.html')

@bp.route("/api/report/periods", methods=['GET'])
@login_required
def get_report_periods():
    if current_user.role != 'admin':
        return jsonify({'error': '无权限'}), 403
    
    periods = db.session.query(SalesData.period).distinct().order_by(SalesData.period.asc()).all()
    brands = db.session.query(CarModel.brand).distinct().order_by(CarModel.brand.asc()).all()
    
    return jsonify({
        'periods': [p[0] for p in periods],
        'brands': [b[0] for b in brands]
    })

@bp.route("/api/report/generate", methods=['POST'])
@login_required
def generate_quarterly_report():
    if current_user.role != 'admin':
        return jsonify({'error': '无权限'}), 403
    
    data = request.json
    target_period = data.get('period')
    selected_brands = data.get('brands', [])
    
    if not target_period:
        return jsonify({'error': '请选择目标季度'}), 400
    
    # Parse period for previous quarter calculation
    # Expected format: "YYYY QN" e.g. "2024 Q1"
    try:
        year_part, q_part = target_period.split()
        year = int(year_part)
        q_num = int(q_part.replace('Q', ''))
    except:
        return jsonify({'error': '季度格式错误'}), 400
    
    # Calculate previous period
    if q_num == 1:
        prev_q_num = 4
        prev_year = year - 1
    else:
        prev_q_num = q_num - 1
        prev_year = year
    prev_period = f"{prev_year} Q{prev_q_num}"
    
    # Build base queries
    sales_query = db.session.query(
        SalesData, CarModel
    ).join(CarModel).filter(SalesData.period == target_period)
    
    prev_sales_query = db.session.query(
        SalesData, CarModel
    ).join(CarModel).filter(SalesData.period == prev_period)
    
    if selected_brands:
        sales_query = sales_query.filter(CarModel.brand.in_(selected_brands))
        prev_sales_query = prev_sales_query.filter(CarModel.brand.in_(selected_brands))
    
    # ========== 1. 销量总览 ==========
    total_sales_current = db.session.query(
        func.coalesce(func.sum(SalesData.quantity), 0)
    ).join(CarModel).filter(SalesData.period == target_period)
    
    total_sales_prev = db.session.query(
        func.coalesce(func.sum(SalesData.quantity), 0)
    ).join(CarModel).filter(SalesData.period == prev_period)
    
    if selected_brands:
        total_sales_current = total_sales_current.filter(CarModel.brand.in_(selected_brands))
        total_sales_prev = total_sales_prev.filter(CarModel.brand.in_(selected_brands))
    
    total_current = total_sales_current.scalar() or 0
    total_prev = total_sales_prev.scalar() or 0
    
    qoq_change = 0
    if total_prev > 0:
        qoq_change = round(((total_current - total_prev) / total_prev) * 100, 1)
    
    # Number of models and brands
    distinct_models = db.session.query(func.count(func.distinct(CarModel.id))).join(SalesData).filter(SalesData.period == target_period)
    distinct_brands_count = db.session.query(func.count(func.distinct(CarModel.brand))).join(SalesData).filter(SalesData.period == target_period)
    distinct_regions = db.session.query(func.count(func.distinct(SalesData.region))).join(CarModel).filter(SalesData.period == target_period)
    
    if selected_brands:
        distinct_models = distinct_models.filter(CarModel.brand.in_(selected_brands))
        distinct_brands_count = distinct_brands_count.filter(CarModel.brand.in_(selected_brands))
        distinct_regions = distinct_regions.filter(CarModel.brand.in_(selected_brands))
    
    # ========== 2. 品牌前五榜单 ==========
    brand_rank_query = db.session.query(
        CarModel.brand,
        func.sum(SalesData.quantity).label('brand_sales'),
        func.count(func.distinct(CarModel.id)).label('model_count')
    ).join(SalesData).filter(SalesData.period == target_period)
    
    if selected_brands:
        brand_rank_query = brand_rank_query.filter(CarModel.brand.in_(selected_brands))
    
    brand_rankings = brand_rank_query.group_by(CarModel.brand).order_by(func.sum(SalesData.quantity).desc()).limit(5).all()
    
    brand_ranking_list = []
    for i, br in enumerate(brand_rankings):
        market_share = round((br.brand_sales / total_current * 100), 1) if total_current > 0 else 0
        
        # Get previous sales for this brand
        prev_brand_sales = db.session.query(
            func.coalesce(func.sum(SalesData.quantity), 0)
        ).join(CarModel).filter(
            SalesData.period == prev_period,
            CarModel.brand == br.brand
        ).scalar() or 0
        
        brand_qoq = 0
        if prev_brand_sales > 0:
            brand_qoq = round(((br.brand_sales - prev_brand_sales) / prev_brand_sales) * 100, 1)
        
        # Top model for this brand
        top_model = db.session.query(
            CarModel.model_name,
            func.sum(SalesData.quantity).label('model_sales')
        ).join(SalesData).filter(
            SalesData.period == target_period,
            CarModel.brand == br.brand
        ).group_by(CarModel.model_name).order_by(func.sum(SalesData.quantity).desc()).first()
        
        brand_ranking_list.append({
            'rank': i + 1,
            'brand': br.brand,
            'sales': br.brand_sales,
            'market_share': market_share,
            'qoq_change': brand_qoq,
            'model_count': br.model_count,
            'top_model': top_model.model_name if top_model else '-',
            'top_model_sales': top_model.model_sales if top_model else 0
        })
    
    # ========== 3. 各省热力缩略 ==========
    province_query = db.session.query(
        SalesData.region,
        func.sum(SalesData.quantity).label('region_sales')
    ).join(CarModel).filter(SalesData.period == target_period)
    
    if selected_brands:
        province_query = province_query.filter(CarModel.brand.in_(selected_brands))
    
    province_sales = province_query.group_by(SalesData.region).order_by(func.sum(SalesData.quantity).desc()).all()
    
    province_list = []
    max_province_sales = max([ps.region_sales for ps in province_sales]) if province_sales else 1
    for ps in province_sales:
        intensity = round((ps.region_sales / max_province_sales) * 100, 0) if max_province_sales > 0 else 0
        province_list.append({
            'name': ps.region,
            'value': ps.region_sales,
            'intensity': intensity
        })
    
    # Top 5 provinces
    top_provinces = province_list[:5]
    
    # ========== 4. 电耗表现优异车型清单 ==========
    # Vehicles with lower than average power consumption, with sales data
    avg_power = db.session.query(func.avg(CarModel.power_consumption)).scalar() or 15
    
    energy_eff_query = db.session.query(
        CarModel,
        func.sum(SalesData.quantity).label('total_sales')
    ).join(SalesData).filter(
        SalesData.period == target_period,
        CarModel.power_consumption <= avg_power
    )
    
    if selected_brands:
        energy_eff_query = energy_eff_query.filter(CarModel.brand.in_(selected_brands))
    
    energy_eff_vehicles = energy_eff_query.group_by(CarModel.id).order_by(
        CarModel.power_consumption.asc()
    ).limit(10).all()
    
    energy_list = []
    for v in energy_eff_vehicles:
        cm = v.CarModel
        # Efficiency score: lower is better, normalized
        eff_score = round((1 - (cm.power_consumption / avg_power)) * 100, 1) if avg_power > 0 else 0
        energy_list.append({
            'brand': cm.brand,
            'model_name': cm.model_name,
            'category': cm.category,
            'power_consumption': cm.power_consumption,
            'range_km': cm.range_km,
            'weight_kg': cm.weight_kg,
            'price': cm.price,
            'sales': v.total_sales or 0,
            'eff_score': eff_score
        })
    
    # ========== 5. 车型销量排行 ==========
    model_sales_query = db.session.query(
        CarModel.brand,
        CarModel.model_name,
        CarModel.category,
        func.sum(SalesData.quantity).label('model_sales')
    ).join(SalesData).filter(SalesData.period == target_period)
    
    if selected_brands:
        model_sales_query = model_sales_query.filter(CarModel.brand.in_(selected_brands))
    
    top_models = model_sales_query.group_by(CarModel.id).order_by(func.sum(SalesData.quantity).desc()).limit(5).all()
    
    top_models_list = [{
        'rank': i + 1,
        'brand': tm.brand,
        'model_name': tm.model_name,
        'category': tm.category,
        'sales': tm.model_sales
    } for i, tm in enumerate(top_models)]
    
    # Generate timestamp
    generated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    return jsonify({
        'report_info': {
            'period': target_period,
            'prev_period': prev_period,
            'brands_scope': selected_brands if selected_brands else ['全部品牌'],
            'generated_at': generated_at,
            'generated_by': current_user.username
        },
        'sales_overview': {
            'total_sales': total_current,
            'total_sales_prev': total_prev,
            'qoq_change': qoq_change,
            'models_count': distinct_models.scalar() or 0,
            'brands_count': distinct_brands_count.scalar() or 0,
            'regions_count': distinct_regions.scalar() or 0,
            'avg_power_consumption': round(avg_power, 1)
        },
        'brand_rankings': brand_ranking_list,
        'province_data': {
            'all': province_list,
            'top5': top_provinces
        },
        'energy_efficiency': energy_list,
        'top_models': top_models_list
    })

# ============ Energy Consumption Ranking ============

@bp.route("/energy_ranking")
@login_required
def energy_ranking():
    return render_template('energy_ranking.html')

@bp.route("/api/ranking/energy")
@login_required
def get_energy_ranking():
    filter_type = request.args.get('filter', 'all')
    weight_sort = request.args.get('weight_sort', None)
    
    query = CarModel.query
    
    if filter_type == '纯电':
        query = query.filter(CarModel.category == '纯电')
    elif filter_type == '混动':
        query = query.filter(CarModel.category == '混动')
    
    query = query.order_by(CarModel.power_consumption.asc())
    
    if weight_sort == 'asc':
        query = query.order_by(CarModel.weight_kg.asc())
    elif weight_sort == 'desc':
        query = query.order_by(CarModel.weight_kg.desc())
    
    vehicles = query.all()
    
    if not vehicles:
        return jsonify({
            'vehicles': [],
            'total': 0,
            'avg_consumption': 0,
            'best_consumption': 0
        })
    
    total = len(vehicles)
    avg_consumption = round(sum(v.power_consumption for v in vehicles) / total, 1)
    best_consumption = min(v.power_consumption for v in vehicles)
    
    return jsonify({
        'vehicles': [{
            'id': v.id,
            'brand': v.brand,
            'model_name': v.model_name,
            'price': v.price,
            'range_km': v.range_km,
            'power_consumption': v.power_consumption,
            'weight_kg': v.weight_kg,
            'category': v.category
        } for v in vehicles],
        'total': total,
        'avg_consumption': avg_consumption,
        'best_consumption': best_consumption
    })

# ============ Car Review System ============

@bp.route("/api/reviews", methods=['POST'])
@login_required
def submit_review():
    data = request.json
    car_model_id = data.get('car_model_id')
    rating = data.get('rating')
    comment = data.get('comment', '').strip()

    if not car_model_id or not rating:
        return jsonify({'error': '请选择车型并给出评分'}), 400

    try:
        rating = int(rating)
        if rating < 1 or rating > 5:
            return jsonify({'error': '评分必须在1-5星之间'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': '评分格式无效'}), 400

    if not comment:
        return jsonify({'error': '请填写评价内容'}), 400

    car = CarModel.query.get(car_model_id)
    if not car:
        return jsonify({'error': '车型不存在'}), 404

    existing = CarReview.query.filter_by(
        user_id=current_user.id,
        car_model_id=car_model_id
    ).first()

    if existing:
        existing.rating = rating
        existing.comment = comment
        existing.status = 'pending'
        existing.admin_note = None
        existing.reviewed_at = None
        existing.reviewer_id = None
        existing.updated_at = datetime.now()
        message = '评价已更新，重新进入审核队列'
    else:
        review = CarReview(
            user_id=current_user.id,
            car_model_id=car_model_id,
            rating=rating,
            comment=comment,
            status='pending'
        )
        db.session.add(review)
        message = '评价提交成功，等待管理员审核'

    db.session.commit()
    return jsonify({'status': 'ok', 'message': message})

@bp.route("/api/reviews/summary/<int:car_id>", methods=['GET'])
@login_required
def get_review_summary(car_id):
    car = CarModel.query.get(car_id)
    if not car:
        return jsonify({'error': '车型不存在'}), 404

    approved = CarReview.query.filter_by(
        car_model_id=car_id,
        status='approved'
    ).all()

    count = len(approved)
    avg_rating = 0
    if count > 0:
        avg_rating = round(sum(r.rating for r in approved) / count, 1)

    return jsonify({
        'car_id': car_id,
        'model_name': car.model_name,
        'brand': car.brand,
        'avg_rating': avg_rating,
        'review_count': count
    })

@bp.route("/api/reviews/my/<int:car_id>", methods=['GET'])
@login_required
def get_my_review(car_id):
    review = CarReview.query.filter_by(
        user_id=current_user.id,
        car_model_id=car_id
    ).first()

    if not review:
        return jsonify({'review': None})

    return jsonify({
        'review': {
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'status': review.status,
            'admin_note': review.admin_note,
            'created_at': review.created_at.strftime('%Y-%m-%d %H:%M'),
            'updated_at': review.updated_at.strftime('%Y-%m-%d %H:%M')
        }
    })

@bp.route("/admin/reviews")
@login_required
def admin_reviews():
    if current_user.role != 'admin':
        return redirect(url_for('main.home'))
    return render_template('admin_reviews.html')

@bp.route("/api/admin/reviews", methods=['GET'])
@login_required
def get_admin_reviews():
    if current_user.role != 'admin':
        return jsonify([]), 403

    status = request.args.get('status', 'pending')
    query = CarReview.query

    if status in ['pending', 'approved', 'rejected']:
        query = query.filter_by(status=status)

    reviews = query.order_by(CarReview.created_at.desc()).all()

    return jsonify([{
        'id': r.id,
        'user_id': r.user_id,
        'username': r.user.username,
        'car_model_id': r.car_model_id,
        'model_name': r.car_model.model_name,
        'brand': r.car_model.brand,
        'rating': r.rating,
        'comment': r.comment,
        'status': r.status,
        'admin_note': r.admin_note,
        'reviewer_name': r.reviewer.username if r.reviewer else None,
        'created_at': r.created_at.strftime('%Y-%m-%d %H:%M'),
        'updated_at': r.updated_at.strftime('%Y-%m-%d %H:%M'),
        'reviewed_at': r.reviewed_at.strftime('%Y-%m-%d %H:%M') if r.reviewed_at else None
    } for r in reviews])

@bp.route("/api/admin/reviews/<int:review_id>/review", methods=['POST'])
@login_required
def review_approval(review_id):
    if current_user.role != 'admin':
        return jsonify({'error': '无权限'}), 403

    review = CarReview.query.get_or_404(review_id)
    data = request.json
    action = data.get('action')
    admin_note = data.get('admin_note', '').strip()

    if action not in ['approve', 'reject']:
        return jsonify({'error': '无效的操作'}), 400

    if action == 'reject' and not admin_note:
        return jsonify({'error': '驳回时请填写处理意见'}), 400

    review.status = 'approved' if action == 'approve' else 'rejected'
    review.admin_note = admin_note if admin_note else None
    review.reviewed_at = datetime.now()
    review.reviewer_id = current_user.id

    db.session.commit()

    return jsonify({
        'status': 'ok',
        'message': f'已{"通过" if action == "approve" else "驳回"}该评价'
    })
