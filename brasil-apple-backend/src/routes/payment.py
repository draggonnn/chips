from flask import Blueprint, request, jsonify, session
from src.models.user import db, Order, Product, User
from datetime import datetime
import uuid
import random
import time

payment_bp = Blueprint('payment', __name__)

def require_auth():
    """Check if user is authenticated"""
    user_id = session.get('user_id')
    if not user_id:
        return None
    
    user = User.query.get(user_id)
    return user if user and user.is_active else None

# Simulated payment database (in production, use a real database)
payment_intents = {}

class PaymentIntent:
    def __init__(self, amount, currency='BRL', order_id=None):
        self.id = str(uuid.uuid4())
        self.amount = amount
        self.currency = currency
        self.status = 'requires_payment_method'
        self.order_id = order_id
        self.created_at = datetime.utcnow()
        self.payment_method = None
        self.client_secret = f"pi_{self.id}_secret_{uuid.uuid4().hex[:16]}"

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'currency': self.currency,
            'status': self.status,
            'order_id': self.order_id,
            'created_at': self.created_at.isoformat(),
            'client_secret': self.client_secret,
            'payment_method': self.payment_method
        }

@payment_bp.route('/payment/create-intent', methods=['POST'])
def create_payment_intent():
    """Create payment intent for order"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        data = request.get_json()
        
        order_id = data.get('order_id')
        amount = data.get('amount')
        
        if not order_id or not amount:
            return jsonify({'error': 'order_id e amount são obrigatórios'}), 400
        
        # Validate order belongs to user
        order = Order.query.filter_by(id=order_id, user_id=user.id).first()
        if not order:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        if order.status != 'pending':
            return jsonify({'error': 'Pedido não pode ser pago'}), 400
        
        # Create payment intent
        payment_intent = PaymentIntent(
            amount=float(amount),
            order_id=order_id
        )
        
        # Store in simulated database
        payment_intents[payment_intent.id] = payment_intent
        
        return jsonify({
            'payment_intent': payment_intent.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@payment_bp.route('/payment/confirm/<payment_intent_id>', methods=['POST'])
def confirm_payment(payment_intent_id):
    """Confirm payment with payment method"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        data = request.get_json()
        payment_method = data.get('payment_method', {})
        
        # Get payment intent
        payment_intent = payment_intents.get(payment_intent_id)
        if not payment_intent:
            return jsonify({'error': 'Payment intent não encontrado'}), 404
        
        # Validate order belongs to user
        order = Order.query.filter_by(id=payment_intent.order_id, user_id=user.id).first()
        if not order:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        # Simulate payment processing
        payment_intent.status = 'processing'
        payment_intent.payment_method = payment_method
        
        # Simulate processing time
        time.sleep(1)
        
        # Simulate payment result (90% success rate)
        success = random.random() < 0.9
        
        if success:
            payment_intent.status = 'succeeded'
            
            # Update order status
            order.status = 'confirmed'
            db.session.commit()
            
            return jsonify({
                'payment_intent': payment_intent.to_dict(),
                'message': 'Pagamento processado com sucesso!'
            }), 200
        else:
            payment_intent.status = 'failed'
            
            return jsonify({
                'payment_intent': payment_intent.to_dict(),
                'error': 'Pagamento falhou. Tente novamente.'
            }), 400
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@payment_bp.route('/payment/status/<payment_intent_id>', methods=['GET'])
def get_payment_status(payment_intent_id):
    """Get payment status"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        payment_intent = payment_intents.get(payment_intent_id)
        if not payment_intent:
            return jsonify({'error': 'Payment intent não encontrado'}), 404
        
        # Validate order belongs to user
        order = Order.query.filter_by(id=payment_intent.order_id, user_id=user.id).first()
        if not order:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        return jsonify({
            'payment_intent': payment_intent.to_dict(),
            'order': order.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@payment_bp.route('/payment/methods', methods=['GET'])
def get_payment_methods():
    """Get available payment methods"""
    return jsonify({
        'payment_methods': [
            {
                'id': 'credit_card',
                'name': 'Cartão de Crédito',
                'description': 'Visa, Mastercard, Elo',
                'icon': 'credit-card',
                'enabled': True
            },
            {
                'id': 'debit_card',
                'name': 'Cartão de Débito',
                'description': 'Débito à vista',
                'icon': 'credit-card',
                'enabled': True
            },
            {
                'id': 'pix',
                'name': 'PIX',
                'description': 'Pagamento instantâneo',
                'icon': 'smartphone',
                'enabled': True
            },
            {
                'id': 'boleto',
                'name': 'Boleto Bancário',
                'description': 'Vencimento em 3 dias úteis',
                'icon': 'file-text',
                'enabled': True
            },
            {
                'id': 'paypal',
                'name': 'PayPal',
                'description': 'Conta PayPal',
                'icon': 'dollar-sign',
                'enabled': False
            }
        ]
    }), 200

@payment_bp.route('/payment/calculate-installments', methods=['POST'])
def calculate_installments():
    """Calculate installment options"""
    try:
        data = request.get_json()
        amount = float(data.get('amount', 0))
        
        if amount <= 0:
            return jsonify({'error': 'Valor inválido'}), 400
        
        installments = []
        
        # Calculate installments (up to 12x)
        for i in range(1, 13):
            # Simulate interest rates
            if i == 1:
                interest_rate = 0  # No interest for cash payment
            elif i <= 6:
                interest_rate = 0.02  # 2% per month for up to 6x
            else:
                interest_rate = 0.035  # 3.5% per month for 7x+
            
            total_amount = amount * (1 + interest_rate * (i - 1))
            installment_amount = total_amount / i
            
            installments.append({
                'installments': i,
                'installment_amount': round(installment_amount, 2),
                'total_amount': round(total_amount, 2),
                'interest_rate': interest_rate,
                'description': f"{i}x de R$ {installment_amount:.2f}" + 
                             (" sem juros" if i == 1 else f" (total: R$ {total_amount:.2f})")
            })
        
        return jsonify({
            'installments': installments,
            'original_amount': amount
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@payment_bp.route('/payment/simulate-pix', methods=['POST'])
def simulate_pix_payment():
    """Simulate PIX payment generation"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        data = request.get_json()
        payment_intent_id = data.get('payment_intent_id')
        
        payment_intent = payment_intents.get(payment_intent_id)
        if not payment_intent:
            return jsonify({'error': 'Payment intent não encontrado'}), 404
        
        # Generate PIX code (simulated)
        pix_code = f"00020126580014BR.GOV.BCB.PIX0136{uuid.uuid4().hex}5204000053039865802BR5925BRASIL APPLE TECNOLOGIA6009SAO PAULO62070503***6304"
        
        # Generate QR code data (simulated)
        qr_code_data = f"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        
        return jsonify({
            'pix_code': pix_code,
            'qr_code': qr_code_data,
            'amount': payment_intent.amount,
            'expires_at': (datetime.utcnow().timestamp() + 1800) * 1000,  # 30 minutes
            'instructions': [
                'Abra o app do seu banco',
                'Escolha a opção PIX',
                'Escaneie o QR Code ou cole o código',
                'Confirme o pagamento'
            ]
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@payment_bp.route('/payment/simulate-boleto', methods=['POST'])
def simulate_boleto_payment():
    """Simulate boleto payment generation"""
    user = require_auth()
    if not user:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        data = request.get_json()
        payment_intent_id = data.get('payment_intent_id')
        
        payment_intent = payment_intents.get(payment_intent_id)
        if not payment_intent:
            return jsonify({'error': 'Payment intent não encontrado'}), 404
        
        # Generate boleto data (simulated)
        due_date = datetime.utcnow().timestamp() + (3 * 24 * 60 * 60)  # 3 days
        barcode = f"34191.79001 01043.510047 91020.150008 1 {int(due_date)}{int(payment_intent.amount * 100):010d}"
        
        return jsonify({
            'barcode': barcode,
            'due_date': due_date * 1000,
            'amount': payment_intent.amount,
            'pdf_url': f"/api/payment/boleto/{payment_intent_id}/pdf",
            'instructions': [
                'Imprima o boleto ou anote o código de barras',
                'Pague em qualquer banco, lotérica ou app bancário',
                'O pagamento pode levar até 2 dias úteis para ser processado',
                'Guarde o comprovante de pagamento'
            ]
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

