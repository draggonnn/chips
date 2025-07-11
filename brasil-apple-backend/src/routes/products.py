from flask import Blueprint, request, jsonify, session
from src.models.user import db, Product, User

products_bp = Blueprint('products', __name__)

def require_admin():
    """Decorator to require admin access"""
    user_id = session.get('user_id')
    is_admin = session.get('is_admin', False)
    
    if not user_id or not is_admin:
        return False
    
    user = User.query.get(user_id)
    return user and user.is_admin and user.is_active

@products_bp.route('/products', methods=['GET'])
def get_products():
    """Get all active products"""
    try:
        category = request.args.get('category')
        search = request.args.get('search')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        
        query = Product.query.filter_by(is_active=True)
        
        if category:
            query = query.filter(Product.category == category)
        
        if search:
            query = query.filter(Product.name.contains(search))
        
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        
        products = query.all()
        
        return jsonify({
            'products': [product.to_dict() for product in products],
            'total': len(products)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get single product by ID"""
    try:
        product = Product.query.filter_by(id=product_id, is_active=True).first()
        
        if not product:
            return jsonify({'error': 'Produto não encontrado'}), 404
        
        return jsonify({'product': product.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@products_bp.route('/admin/products', methods=['GET'])
def admin_get_products():
    """Admin: Get all products (including inactive)"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        products = Product.query.all()
        
        return jsonify({
            'products': [product.to_dict() for product in products],
            'total': len(products)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@products_bp.route('/admin/products', methods=['POST'])
def admin_create_product():
    """Admin: Create new product"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'price', 'category']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        product = Product(
            name=data['name'].strip(),
            description=data.get('description', '').strip(),
            price=float(data['price']),
            category=data['category'].strip(),
            image_url=data.get('image_url', '').strip(),
            stock=int(data.get('stock', 0)),
            colors=data.get('colors', []),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'message': 'Produto criado com sucesso',
            'product': product.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@products_bp.route('/admin/products/<int:product_id>', methods=['PUT'])
def admin_update_product(product_id):
    """Admin: Update product"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Produto não encontrado'}), 404
        
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            product.name = data['name'].strip()
        if 'description' in data:
            product.description = data['description'].strip()
        if 'price' in data:
            product.price = float(data['price'])
        if 'category' in data:
            product.category = data['category'].strip()
        if 'image_url' in data:
            product.image_url = data['image_url'].strip()
        if 'stock' in data:
            product.stock = int(data['stock'])
        if 'colors' in data:
            product.colors = data['colors']
        if 'is_active' in data:
            product.is_active = data['is_active']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Produto atualizado com sucesso',
            'product': product.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@products_bp.route('/admin/products/<int:product_id>', methods=['DELETE'])
def admin_delete_product(product_id):
    """Admin: Delete product (soft delete)"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Produto não encontrado'}), 404
        
        # Soft delete - just mark as inactive
        product.is_active = False
        db.session.commit()
        
        return jsonify({'message': 'Produto removido com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@products_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all product categories"""
    try:
        categories = db.session.query(Product.category).filter_by(is_active=True).distinct().all()
        category_list = [cat[0] for cat in categories]
        
        return jsonify({'categories': category_list}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

