import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getById(id);
      setProduct(response.data);
    } catch (err) {
      setError('Produto não encontrado.');
      console.error('Erro ao buscar produto:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (product && product.stock > 0) {
      // Simular adição ao carrinho e redirecionamento para checkout
      const orderData = {
        products: [{
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image
        }],
        totalAmount: product.price * quantity
      };
      
      // Salvar no localStorage temporariamente
      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando produto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-message">
        <h2>Produto não encontrado</h2>
        <p>{error || 'O produto que você está procurando não existe.'}</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">
            Início
          </button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Imagem do produto */}
          <div className="product-image-section">
            <div className="main-image">
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
          </div>

          {/* Informações do produto */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-price-section">
              <span className="current-price">{formatPrice(product.price)}</span>
            </div>

            <div className="product-description">
              <h3>Descrição</h3>
              <p>{product.description}</p>
            </div>

            {/* Especificações */}
            <div className="product-specs">
              <h3>Especificações</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Categoria:</span>
                  <span className="spec-value">{product.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Estoque:</span>
                  <span className="spec-value">
                    {product.stock > 0 ? `${product.stock} unidades` : 'Esgotado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Controles de compra */}
            <div className="purchase-controls">
              {product.stock > 0 && (
                <div className="quantity-selector">
                  <label>Quantidade:</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="purchase-actions">
                <button 
                  className={`btn btn-primary btn-large ${product.stock === 0 ? 'btn-disabled' : ''}`}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Produto Esgotado' : 'Comprar Agora'}
                </button>
                
                <div className="total-price">
                  <span>Total: {formatPrice(product.price * quantity)}</span>
                </div>
              </div>
            </div>

            {/* Informações de entrega */}
            <div className="delivery-info">
              <h3>Informações de Entrega</h3>
              <div className="delivery-features">
                <div className="delivery-feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                  <span>Entrega rápida em todo o Brasil</span>
                </div>
                <div className="delivery-feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                  </svg>
                  <span>Garantia de qualidade</span>
                </div>
                <div className="delivery-feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span>Atendimento premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

