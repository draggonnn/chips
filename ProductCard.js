import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="product-card fade-in">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img 
            src={product.image || '/images/placeholder.jpg'} 
            alt={product.name}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          {product.stock <= 5 && product.stock > 0 && (
            <span className="stock-badge">Últimas unidades!</span>
          )}
          {product.stock === 0 && (
            <span className="stock-badge out-of-stock">Esgotado</span>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          <div className="product-footer">
            <div className="product-price">
              <span className="price">{formatPrice(product.price)}</span>
            </div>
            
            <button 
              className={`btn btn-primary ${product.stock === 0 ? 'btn-disabled' : ''}`}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Esgotado' : 'Comprar Agora'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

