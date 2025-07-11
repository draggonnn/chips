from flask import Blueprint, request, jsonify, session
from src.models.user import db, User
from datetime import datetime
import re

auth_bp = Blueprint('auth', __name__)

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validate password strength"""
    if len(password) < 6:
        return False, "Senha deve ter pelo menos 6 caracteres"
    return True, "Senha válida"

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'full_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        username = data['username'].strip()
        email = data['email'].strip().lower()
        password = data['password']
        full_name = data['full_name'].strip()
        phone = data.get('phone', '').strip()
        
        # Validate email format
        if not validate_email(email):
            return jsonify({'error': 'Formato de email inválido'}), 400
        
        # Validate password
        is_valid, message = validate_password(password)
        if not is_valid:
            return jsonify({'error': message}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Nome de usuário já existe'}), 400
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email já está cadastrado'}), 400
        
        # Create new user
        user = User(
            username=username,
            email=email,
            full_name=full_name,
            phone=phone,
            is_admin=False  # Regular users are not admin by default
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Auto-login after registration
        session['user_id'] = user.id
        session['is_admin'] = user.is_admin
        
        return jsonify({
            'message': 'Usuário cadastrado com sucesso',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        username_or_email = data.get('username_or_email', '').strip()
        password = data.get('password', '')
        
        if not username_or_email or not password:
            return jsonify({'error': 'Username/email e senha são obrigatórios'}), 400
        
        # Find user by username or email
        user = User.query.filter(
            (User.username == username_or_email) | 
            (User.email == username_or_email.lower())
        ).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Credenciais inválidas'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Conta desativada'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create session
        session['user_id'] = user.id
        session['is_admin'] = user.is_admin
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Logout user"""
    session.clear()
    return jsonify({'message': 'Logout realizado com sucesso'}), 200

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    """Get current logged in user"""
    user_id = session.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'Não autenticado'}), 401
    
    user = User.query.get(user_id)
    if not user or not user.is_active:
        session.clear()
        return jsonify({'error': 'Usuário não encontrado'}), 401
    
    return jsonify({'user': user.to_dict()}), 200

@auth_bp.route('/check-admin', methods=['GET'])
def check_admin():
    """Check if current user is admin"""
    user_id = session.get('user_id')
    is_admin = session.get('is_admin', False)
    
    if not user_id:
        return jsonify({'error': 'Não autenticado'}), 401
    
    if not is_admin:
        return jsonify({'error': 'Acesso negado - Admin necessário'}), 403
    
    user = User.query.get(user_id)
    if not user or not user.is_admin or not user.is_active:
        session.clear()
        return jsonify({'error': 'Acesso negado'}), 403
    
    return jsonify({'message': 'Admin autenticado', 'user': user.to_dict()}), 200

@auth_bp.route('/admin-login', methods=['POST'])
def admin_login():
    """Special admin login endpoint"""
    try:
        data = request.get_json()
        
        username_or_email = data.get('username_or_email', '').strip()
        password = data.get('password', '')
        
        if not username_or_email or not password:
            return jsonify({'error': 'Username/email e senha são obrigatórios'}), 400
        
        # Find admin user
        user = User.query.filter(
            ((User.username == username_or_email) | 
             (User.email == username_or_email.lower())) &
            (User.is_admin == True)
        ).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Credenciais de admin inválidas'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Conta de admin desativada'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create admin session
        session['user_id'] = user.id
        session['is_admin'] = True
        
        return jsonify({
            'message': 'Login de admin realizado com sucesso',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@auth_bp.route('/change-password', methods=['POST'])
def change_password():
    """Change user password"""
    user_id = session.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'Não autenticado'}), 401
    
    try:
        data = request.get_json()
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        
        if not current_password or not new_password:
            return jsonify({'error': 'Senha atual e nova senha são obrigatórias'}), 400
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        if not user.check_password(current_password):
            return jsonify({'error': 'Senha atual incorreta'}), 400
        
        # Validate new password
        is_valid, message = validate_password(new_password)
        if not is_valid:
            return jsonify({'error': message}), 400
        
        user.set_password(new_password)
        db.session.commit()
        
        return jsonify({'message': 'Senha alterada com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

