import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos. Tente novamente mais tarde.');
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Ops! Algo deu errado</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchProducts}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Bem-vindo à <span className="brand-highlight">Brasil Apple</span>
            </h1>
            <p className="hero-subtitle">
              Descubra a mais completa linha de smartphones premium do Brasil. 
              Qualidade excepcional, design inovador e tecnologia de ponta.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">
                Ver Produtos
              </a>
              <a href="#about" className="btn btn-outline">
                Saiba Mais
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="/images/hero-phone.jpg" 
              alt="Brasil Apple - Smartphones Premium"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section id="products" className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">PRIMEIRA LINHA PREMIUM</h2>
            <p className="section-subtitle">
              Conheça nossa seleção exclusiva de smartphones premium
            </p>
          </div>

          {products.length === 0 ? (
            <div className="no-products">
              <h3>Nenhum produto encontrado</h3>
              <p>Em breve teremos novos produtos disponíveis!</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Por que escolher a Brasil Apple?</h2>
              <div className="features-grid">
                <div className="feature">
                  <div className="feature-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4"></path>
                      <circle cx="12" cy="12" r="9"></circle>
                    </svg>
                  </div>
                  <h3>Qualidade Garantida</h3>
                  <p>Todos os nossos produtos passam por rigorosos testes de qualidade.</p>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  </div>
                  <h3>Entrega Rápida</h3>
                  <p>Entregamos em todo o Brasil com agilidade e segurança.</p>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3>Atendimento Premium</h3>
                  <p>Suporte especializado para garantir sua satisfação total.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para fazer parte da família Brasil Apple?</h2>
            <p>Descubra a diferença que um smartphone premium pode fazer na sua vida.</p>
            <a href="#products" className="btn btn-secondary">
              Explorar Produtos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

