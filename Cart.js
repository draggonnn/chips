import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();

  // Por simplicidade, vamos mostrar uma página de carrinho básica
  // Em uma implementação real, isso seria conectado a um estado global ou context
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Carrinho de Compras</h1>
        
        <div className="cart-content">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos ao seu carrinho para continuar com a compra.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

