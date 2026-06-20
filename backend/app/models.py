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

class FilterPreset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    filters_json = db.Column(db.Text, nullable=False)
    is_public = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    user = db.relationship('User', backref=db.backref('filter_presets', lazy=True))
