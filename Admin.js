import React, { useState, useEffect } from 'react';
import { productService, orderService, pixService } from '../services/api';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showPixForm, setShowPixForm] = useState(false);
  const [pixData, setPixData] = useState(null);

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'smartphones',
    stock: ''
  });

  const [pixForm, setPixForm] = useState({
    amount: '',
    customerName: ''
  });

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock)
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, productData);
      } else {
        await productService.create(productData);
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'smartphones',
        stock: ''
      });
      fetchProducts();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString()
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await productService.delete(productId);
        fetchProducts();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto');
      }
    }
  };

  const handlePixFormChange = (e) => {
    const { name, value } = e.target;
    setPixForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePixSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await pixService.generateQRCode({
        amount: parseFloat(pixForm.amount),
        customerName: pixForm.customerName
      });
      setPixData(response.data);
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      alert('Erro ao gerar QR Code PIX');
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="page-title">Painel Administrativo - Brasil Apple</h1>
        
        {/* Navegação por abas */}
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Produtos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Pedidos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pix' ? 'active' : ''}`}
            onClick={() => setActiveTab('pix')}
          >
            Gerar PIX
          </button>
        </div>

        {/* Conteúdo das abas */}
        <div className="tab-content">
          {/* Aba de Produtos */}
          {activeTab === 'products' && (
            <div className="products-tab">
              <div className="tab-header">
                <h2>Gerenciar Produtos</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowProductForm(true);
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      description: '',
                      price: '',
                      image: '',
                      category: 'smartphones',
                      stock: ''
                    });
                  }}
                >
                  Adicionar Produto
                </button>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Carregando produtos...</p>
                </div>
              ) : (
                <div className="products-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>
                            <img 
                              src={product.image || '/images/placeholder.jpg'} 
                              alt={product.name}
                              className="product-thumb"
                              onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                              }}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{formatPrice(product.price)}</td>
                          <td>{product.stock}</td>
                          <td>{product.category}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn btn-outline btn-sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                Editar
                              </button>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Aba de Pedidos */}
          {activeTab === 'orders' && (
            <div className="orders-tab">
              <h2>Consultar Pedidos</h2>
              
              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Carregando pedidos...</p>
                </div>
              ) : (
                <div className="orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id.substring(0, 8)}...</td>
                          <td>{order.customerName}</td>
                          <td>{formatPrice(order.totalAmount)}</td>
                          <td>
                            <span className={`status-badge ${order.status}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{formatDate(order.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Aba de PIX */}
          {activeTab === 'pix' && (
            <div className="pix-tab">
              <h2>Gerar QR Code PIX</h2>
              
              <form onSubmit={handlePixSubmit} className="pix-form">
                <div className="form-group">
                  <label htmlFor="amount">Valor (R$)</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={pixForm.amount}
                    onChange={handlePixFormChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="customerName">Nome do Cliente</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={pixForm.customerName}
                    onChange={handlePixFormChange}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Gerando...' : 'Gerar QR Code PIX'}
                </button>
              </form>

              {pixData && (
                <div className="pix-result">
                  <h3>QR Code PIX Gerado</h3>
                  <div className="pix-display">
                    <img src={pixData.qrCode} alt="QR Code PIX" />
                    <div className="pix-info">
                      <p><strong>Valor:</strong> {formatPrice(pixData.amount)}</p>
                      <p><strong>Cliente:</strong> {pixData.customerName}</p>
                      <p><strong>Chave PIX:</strong> {pixData.pixKey}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de formulário de produto */}
      {showProductForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingProduct ? 'Editar Produto' : 'Adicionar Produto'}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowProductForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Nome do Produto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Preço (R$)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="stock">Estoque</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleProductFormChange}
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  name="category"
                  value={productForm.category}
                  onChange={handleProductFormChange}
                  required
                >
                  <option value="smartphones">Smartphones</option>
                  <option value="tablets">Tablets</option>
                  <option value="notebooks">Notebooks</option>
                  <option value="acessorios">Acessórios</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="image">URL da Imagem</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={productForm.image}
                  onChange={handleProductFormChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowProductForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

