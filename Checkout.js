import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService, pixService } from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [pixData, setPixData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: dados, 2: pagamento

  useEffect(() => {
    // Recuperar dados do pedido do localStorage
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else {
      // Se não há pedido, redirecionar para home
      navigate('/');
    }
  }, [navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitCustomerData = (e) => {
    e.preventDefault();
    if (customerData.name && customerData.email && customerData.phone) {
      setStep(2);
      generatePixPayment();
    }
  };

  const generatePixPayment = async () => {
    try {
      setLoading(true);
      
      // Gerar QR Code PIX
      const pixResponse = await pixService.generateQRCode({
        amount: orderData.totalAmount,
        customerName: customerData.name
      });
      
      setPixData(pixResponse.data);
      
      // Criar pedido no backend
      const order = {
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        products: orderData.products,
        totalAmount: orderData.totalAmount
      };
      
      const orderResponse = await orderService.create(order);
      
      // Salvar ID do pedido
      localStorage.setItem('currentOrderId', orderResponse.data.id);
      
    } catch (error) {
      console.error('Erro ao gerar pagamento PIX:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinishOrder = () => {
    // Limpar dados temporários
    localStorage.removeItem('currentOrder');
    localStorage.removeItem('currentOrderId');
    
    // Redirecionar para home com mensagem de sucesso
    alert('Pedido realizado com sucesso! Você receberá um e-mail de confirmação.');
    navigate('/');
  };

  if (!orderData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Finalizar Pedido</h1>
        
        <div className="checkout-content">
          {/* Resumo do pedido */}
          <div className="order-summary">
            <h2>Resumo do Pedido</h2>
            <div className="order-items">
              {orderData.products.map((item, index) => (
                <div key={index} className="order-item">
                  <img 
                    src={item.image || '/images/placeholder.jpg'} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantidade: {item.quantity}</p>
                    <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <strong>Total: {formatPrice(orderData.totalAmount)}</strong>
            </div>
          </div>

          {/* Formulário de dados ou pagamento */}
          <div className="checkout-form">
            {step === 1 ? (
              <div className="customer-form">
                <h2>Dados do Cliente</h2>
                <form onSubmit={handleSubmitCustomerData}>
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-large">
                    Continuar para Pagamento
                  </button>
                </form>
              </div>
            ) : (
              <div className="payment-section">
                <h2>Pagamento via PIX</h2>
                
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                    <p>Gerando QR Code PIX...</p>
                  </div>
                ) : pixData ? (
                  <div className="pix-payment">
                    <div className="pix-instructions">
                      <h3>Como pagar:</h3>
                      <ol>
                        <li>Abra o app do seu banco</li>
                        <li>Escaneie o QR Code abaixo ou copie a chave PIX</li>
                        <li>Confirme o pagamento de {formatPrice(orderData.totalAmount)}</li>
                        <li>Clique em "Finalizar Pedido" após o pagamento</li>
                      </ol>
                    </div>
                    
                    <div className="pix-qr-code">
                      <img src={pixData.qrCode} alt="QR Code PIX" />
                    </div>
                    
                    <div className="pix-key">
                      <label>Chave PIX:</label>
                      <div className="pix-key-value">
                        <span>{pixData.pixKey}</span>
                        <button 
                          className="copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(pixData.pixKey);
                            alert('Chave PIX copiada!');
                          }}
                        >
                          Copiar
                        </button>
                      </div>
                    </div>
                    
                    <div className="payment-actions">
                      <button 
                        className="btn btn-outline"
                        onClick={() => setStep(1)}
                      >
                        Voltar
                      </button>
                      <button 
                        className="btn btn-primary btn-large"
                        onClick={handleFinishOrder}
                      >
                        Finalizar Pedido
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="error-message">
                    <p>Erro ao gerar pagamento PIX. Tente novamente.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={generatePixPayment}
                    >
                      Tentar Novamente
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

