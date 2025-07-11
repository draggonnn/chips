import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db, User
from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.products import products_bp
from src.routes.orders import orders_bp
from src.routes.payment import payment_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'), static_url_path='/')

# Configuration
app.config['SECRET_KEY'] = 'brasil-apple-secret-key-2024-secure'
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for all routes
CORS(app, supports_credentials=True, origins=['*'])

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(products_bp, url_prefix='/api')
app.register_blueprint(orders_bp, url_prefix='/api')
app.register_blueprint(payment_bp, url_prefix='/api')

# Initialize database
db.init_app(app)

with app.app_context():
    # Create all tables
    db.create_all()
    
    # Create default admin user
    User.create_admin_user()
    
    # Create sample products if none exist
    from src.models.user import Product
    if Product.query.count() == 0:
        sample_products = [
            {
                'name': 'iPhone 15 Pro',
                'description': 'iPhone 15 Pro com chip A17 Pro, câmera de 48MP e tela Super Retina XDR de 6,1 polegadas.',
                'price': 8999.00,
                'category': 'iPhone',
                'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium.jpg',
                'stock': 50,
                'colors': ['Azul Titânio', 'Titânio Natural', 'Titânio Branco', 'Titânio Preto']
            },
            {
                'name': 'MacBook Air M3',
                'description': 'MacBook Air de 13 polegadas com chip M3, 8GB de memória unificada e SSD de 256GB.',
                'price': 12999.00,
                'category': 'Mac',
                'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606.jpg',
                'stock': 30,
                'colors': ['Meia-noite', 'Luz das estrelas', 'Prata', 'Dourado espacial']
            },
            {
                'name': 'iPad Pro 12.9"',
                'description': 'iPad Pro de 12,9 polegadas com chip M2, tela Liquid Retina XDR e suporte ao Apple Pencil.',
                'price': 9999.00,
                'category': 'iPad',
                'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202210.jpg',
                'stock': 25,
                'colors': ['Cinza Espacial', 'Prata']
            },
            {
                'name': 'AirPods Pro (2ª geração)',
                'description': 'AirPods Pro com cancelamento ativo de ruído, áudio espacial personalizado e estojo MagSafe.',
                'price': 2999.00,
                'category': 'Acessórios',
                'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83.jpg',
                'stock': 100,
                'colors': ['Branco']
            },
            {
                'name': 'Apple Watch Series 9',
                'description': 'Apple Watch Series 9 com GPS, tela Always-On Retina e resistência à água.',
                'price': 4299.00,
                'category': 'Apple Watch',
                'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-gps-select-aluminum-midnight-202309.jpg',
                'stock': 40,
                'colors': ['Meia-noite', 'Rosa', 'Prata', 'Vermelho', 'Azul']
            },
            {
                'name': 'iMac 24"',
                'description': 'iMac de 24 polegadas com chip M3, tela Retina 4.5K e design ultrafino.',
                'price': 15999.00,
                'category': 'Mac',
                'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104.jpg',
                'stock': 15,
                'colors': ['Azul', 'Verde', 'Rosa', 'Prata', 'Amarelo', 'Laranja', 'Roxo']
            }
        ]
        
        for product_data in sample_products:
            product = Product(**product_data)
            db.session.add(product)
        
        db.session.commit()
        print("Sample products created!")

@app.route('/api/status', methods=['GET'])
def status():
    """API status endpoint"""
    return {
        'status': 'online',
        'message': 'Brasil Apple API está funcionando!',
        'version': '1.0.0'
    }

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    print("🚀 Starting Brasil Apple Backend...")
    print("📊 Admin credentials:")
    print("   Username: admin")
    print("   Password: admin123")
    print("🌐 API will be available at: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
