from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
import os

db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()

def create_app():
    import os
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    frontend_dir = os.path.join(base_dir, 'frontend', 'src')
    database_dir = os.path.join(base_dir, 'database')
    
    in_docker = os.path.exists('/frontend') and os.path.exists('/database')
    
    if in_docker:
        template_folder = '/frontend/src/templates'
        static_folder = '/frontend/src'
        database_uri = 'sqlite:////database/nev_data.db'
    else:
        template_folder = os.path.join(frontend_dir, 'templates')
        static_folder = frontend_dir
        os.makedirs(database_dir, exist_ok=True)
        database_uri = f'sqlite:///{os.path.join(database_dir, "nev_data.db")}'

    app = Flask(__name__, 
                template_folder=template_folder,
                static_folder=static_folder)
    
    app.config['SECRET_KEY'] = 'nev_secret_key_2024'
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)
    
    login_manager.login_view = 'main.login'

    from app import routes
    app.register_blueprint(routes.bp)

    from app import models
    with app.app_context():
        if not in_docker:
            os.makedirs(database_dir, exist_ok=True)
        else:
            if not os.path.exists('../database'):
                os.makedirs('../database')
        db.create_all()
        
        # Migration: Add has_seen_tour column if it doesn't exist
        try:
            from sqlalchemy import text
            db.session.execute(text('SELECT has_seen_tour FROM "user" LIMIT 1'))
        except Exception:
            try:
                db.session.execute(text('ALTER TABLE "user" ADD COLUMN has_seen_tour BOOLEAN NOT NULL DEFAULT 0'))
                db.session.commit()
            except Exception as e:
                print("Migration notice:", e)
        
        # Migration: Add period column to ChargingPile if it doesn't exist
        try:
            from sqlalchemy import text
            db.session.execute(text('SELECT period FROM charging_pile LIMIT 1'))
        except Exception:
            try:
                db.session.execute(text("ALTER TABLE charging_pile ADD COLUMN period VARCHAR(20) NOT NULL DEFAULT 'latest'"))
                db.session.commit()
            except Exception as e:
                print("Migration notice (ChargingPile.period):", e)
        
        # Migration: Create car_review table if it doesn't exist
        try:
            from sqlalchemy import text
            db.session.execute(text('SELECT id FROM car_review LIMIT 1'))
        except Exception:
            try:
                db.session.execute(text("""
                    CREATE TABLE car_review (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        car_model_id INTEGER NOT NULL,
                        rating INTEGER NOT NULL,
                        comment TEXT NOT NULL,
                        status VARCHAR(20) NOT NULL DEFAULT 'pending',
                        admin_note TEXT,
                        reviewed_at DATETIME,
                        reviewer_id INTEGER,
                        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES user (id),
                        FOREIGN KEY (car_model_id) REFERENCES car_model (id),
                        FOREIGN KEY (reviewer_id) REFERENCES user (id),
                        UNIQUE (user_id, car_model_id)
                    )
                """))
                db.session.commit()
            except Exception as e:
                print("Migration notice (car_review):", e)
        
        # Migration: Create system_config table if it doesn't exist
        try:
            from sqlalchemy import text
            db.session.execute(text('SELECT id FROM system_config LIMIT 1'))
        except Exception:
            try:
                db.session.execute(text("""
                    CREATE TABLE system_config (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        config_key VARCHAR(50) UNIQUE NOT NULL,
                        config_value TEXT NOT NULL,
                        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                    )
                """))
                db.session.commit()
            except Exception as e:
                print("Migration notice (system_config):", e)
        
        # Initialize default system config
        default_configs = {
            'site_title': '新能源汽车数据分析系统',
            'default_city': '北京',
            'map_color_scheme': 'cool',
            'self_registration_enabled': 'true'
        }
        for key, value in default_configs.items():
            existing = models.SystemConfig.query.filter_by(config_key=key).first()
            if not existing:
                config = models.SystemConfig(config_key=key, config_value=value)
                db.session.add(config)
        db.session.commit()
        
        # Automatic Admin Creation
        admin = models.User.query.filter_by(username='admin').first()
        if not admin:
            hashed_password = bcrypt.generate_password_hash('admin123').decode('utf-8')
            admin = models.User(username='admin', password=hashed_password, role='admin')
            db.session.add(admin)
            db.session.commit()

    return app
