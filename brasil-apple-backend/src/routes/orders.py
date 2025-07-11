from flask import Blueprint, request, jsonify, session
from src.models.user import db, Order, Product, User
from datetime import datetime

orders_bp = Blueprint('orders', __name__)

def require_auth():
    """Check if user is authenticated"""
    user_id = session.get('user_id')
    if not user_id:
        return None
    
    user = User.query.get(user_id)
    return user if user and user.is_active else None

def require_admin():
    """Check if user is admin"""
    user = require_auth()
    return user and user.is_admin

@orders_bp.route('/orders', methods=['POST'])
def create_order():
    """Create new order"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['product_id', 'quantity', 'shipping_address']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        product_id = data['product_id']
        quantity = int(data['quantity'])
        selected_color = data.get('selected_color')
        shipping_address = data['shipping_address']
        
        # Validate product
        product = Product.query.filter_by(id=product_id, is_active=True).first()
        if not product:
            return jsonify({'error': 'Produto não encontrado'}), 404
        
        # Check stock
        if product.stock < quantity:
            return jsonify({'error': 'Estoque insuficiente'}), 400
        
        # Validate color if product has colors
        if product.colors and selected_color:
            if selected_color not in product.colors:
                return jsonify({'error': 'Cor não disponível para este produto'}), 400
        
        # Calculate total price
        total_price = product.price * quantity
        
        # Create order
        order = Order(
            user_id=user.id,
            product_id=product_id,
            quantity=quantity,
            selected_color=selected_color,
            total_price=total_price,
            shipping_address=shipping_address,
            status='pending'
        )
        
        # Update product stock
        product.stock -= quantity
        
        db.session.add(order)
        db.session.commit()
        
        return jsonify({
            'message': 'Pedido criado com sucesso',
            'order': order.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@orders_bp.route('/orders', methods=['GET'])
def get_user_orders():
    """Get current user's orders"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        orders = Order.query.filter_by(user_id=user.id).order_by(Order.created_at.desc()).all()
        
        return jsonify({
            'orders': [order.to_dict() for order in orders],
            'total': len(orders)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Get single order"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        order = Order.query.filter_by(id=order_id, user_id=user.id).first()
        
        if not order:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        return jsonify({'order': order.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@orders_bp.route('/admin/orders', methods=['GET'])
def admin_get_orders():
    """Admin: Get all orders"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        status = request.args.get('status')
        
        query = Order.query
        if status:
            query = query.filter_by(status=status)
        
        orders = query.order_by(Order.created_at.desc()).all()
        
        return jsonify({
            'orders': [order.to_dict() for order in orders],
            'total': len(orders)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@orders_bp.route('/admin/orders/<int:order_id>/status', methods=['PUT'])
def admin_update_order_status(order_id):
    """Admin: Update order status"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        data = request.get_json()
        new_status = data.get('status')
        
        valid_statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
        if new_status not in valid_statuses:
            return jsonify({'error': 'Status inválido'}), 400
        
        # If cancelling order, restore stock
        if new_status == 'cancelled' and order.status != 'cancelled':
            product = Product.query.get(order.product_id)
            if product:
                product.stock += order.quantity
        
        order.status = new_status
        db.session.commit()
        
        return jsonify({
            'message': 'Status do pedido atualizado com sucesso',
            'order': order.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@orders_bp.route('/admin/orders/<int:order_id>', methods=['DELETE'])
def admin_delete_order(order_id):
    """Admin: Delete order"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        # Restore stock if order was not cancelled
        if order.status != 'cancelled':
            product = Product.query.get(order.product_id)
            if product:
                product.stock += order.quantity
        
        db.session.delete(order)
        db.session.commit()
        
        return jsonify({'message': 'Pedido removido com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@orders_bp.route('/orders/stats', methods=['GET'])
def get_order_stats():
    """Get order statistics"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        total_orders = Order.query.filter_by(user_id=user.id).count()
        pending_orders = Order.query.filter_by(user_id=user.id, status='pending').count()
        completed_orders = Order.query.filter_by(user_id=user.id, status='delivered').count()
        
        total_spent = db.session.query(db.func.sum(Order.total_price)).filter_by(
            user_id=user.id
        ).scalar() or 0
        
        return jsonify({
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'completed_orders': completed_orders,
            'total_spent': float(total_spent)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@orders_bp.route('/admin/orders/stats', methods=['GET'])
def admin_get_order_stats():
    """Admin: Get order statistics"""
    if not require_admin():
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    try:
        total_orders = Order.query.count()
        pending_orders = Order.query.filter_by(status='pending').count()
        confirmed_orders = Order.query.filter_by(status='confirmed').count()
        shipped_orders = Order.query.filter_by(status='shipped').count()
        delivered_orders = Order.query.filter_by(status='delivered').count()
        cancelled_orders = Order.query.filter_by(status='cancelled').count()
        
        total_revenue = db.session.query(db.func.sum(Order.total_price)).filter(
            Order.status.in_(['confirmed', 'shipped', 'delivered'])
        ).scalar() or 0
        
        # Orders today
        today = datetime.utcnow().date()
        orders_today = Order.query.filter(
            db.func.date(Order.created_at) == today
        ).count()
        
        return jsonify({
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'confirmed_orders': confirmed_orders,
            'shipped_orders': shipped_orders,
            'delivered_orders': delivered_orders,
            'cancelled_orders': cancelled_orders,
            'total_revenue': float(total_revenue),
            'orders_today': orders_today
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

