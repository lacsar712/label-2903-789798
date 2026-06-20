from app import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(10), nullable=False, default='user')
    has_seen_tour = db.Column(db.Boolean, nullable=False, default=False)

class CarModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(50), nullable=False)
    model_name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    range_km = db.Column(db.Integer, nullable=False)
    power_consumption = db.Column(db.Float, nullable=False)
    weight_kg = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(20), nullable=False) # 纯电 / 混动

class SalesData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    car_model_id = db.Column(db.Integer, db.ForeignKey('car_model.id'), nullable=False)
    region = db.Column(db.String(50), nullable=False)
    period = db.Column(db.String(20), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    car_model = db.relationship('CarModel', backref=db.backref('sales', lazy=True))

class ChargingPile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    province = db.Column(db.String(50), nullable=False)
    density = db.Column(db.Float, nullable=False)
    period = db.Column(db.String(20), nullable=False, default='latest')

class FilterPreset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    filters_json = db.Column(db.Text, nullable=False)
    is_public = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    user = db.relationship('User', backref=db.backref('filter_presets', lazy=True))

class AlertRule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    rule_type = db.Column(db.String(50), nullable=False)
    dimension = db.Column(db.String(50), nullable=False)
    target_value = db.Column(db.String(100))
    metric = db.Column(db.String(50), nullable=False)
    condition = db.Column(db.String(20), nullable=False)
    threshold = db.Column(db.Float, nullable=False)
    consecutive_periods = db.Column(db.Integer, nullable=False, default=1)
    is_enabled = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    last_checked = db.Column(db.DateTime)
    user = db.relationship('User', backref=db.backref('alert_rules', lazy=True))
    notifications = db.relationship('AlertNotification', backref='rule', lazy=True, cascade='all, delete-orphan')

class AlertNotification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rule_id = db.Column(db.Integer, db.ForeignKey('alert_rule.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    snapshot_json = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    user = db.relationship('User', backref=db.backref('notifications', lazy=True))
