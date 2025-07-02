# Brasil Apple - E-commerce de Smartphones Premium

## 📱 Sobre o Projeto

O **Brasil Apple** é um site de e-commerce completo inspirado no design moderno e elegante, focado na venda de smartphones premium no Brasil. O projeto foi desenvolvido com tecnologias modernas e inclui sistema de pagamento via PIX e painel administrativo completo.

## ✨ Características Principais

- **Design Inspirado**: Layout moderno e responsivo inspirado em sites de tecnologia premium
- **Marca Própria**: Identidade visual única com o nome "Brasil Apple"
- **Pagamento PIX**: Sistema exclusivo de pagamento via PIX com geração de QR Code
- **Painel Admin**: Interface completa para gerenciamento de produtos e pedidos
- **API REST**: Backend robusto para gerenciamento de dados
- **Responsivo**: Compatível com desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React.js** - Biblioteca para interface do usuário
- **React Router** - Navegação entre páginas
- **CSS3** - Estilização responsiva
- **Axios** - Comunicação com API

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **QRCode** - Geração de QR Codes PIX
- **CORS** - Configuração de CORS

## 📁 Estrutura do Projeto

```
brasil-apple/
├── backend/                 # Servidor Node.js
│   ├── server.js           # Arquivo principal do servidor
│   ├── seed.js             # Script para popular o banco
│   └── package.json        # Dependências do backend
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Serviços de API
│   │   └── App.js          # Componente principal
│   └── package.json        # Dependências do frontend
└── README.md              # Documentação do projeto
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd brasil-apple
   ```

2. **Configure o Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure o Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Inicie o MongoDB**
   ```bash
   sudo systemctl start mongod
   ```

5. **Popule o banco de dados**
   ```bash
   cd ../backend
   npm run seed
   ```

6. **Execute o Backend**
   ```bash
   npm start
   # Servidor rodando em http://localhost:5000
   ```

7. **Execute o Frontend**
   ```bash
   cd ../frontend
   npm start
   # Aplicação rodando em http://localhost:3000
   ```

## 📋 Funcionalidades

### Site Principal (Frontend)
- ✅ Página inicial com produtos em destaque
- ✅ Listagem completa de produtos
- ✅ Página de detalhes do produto
- ✅ Carrinho de compras
- ✅ Checkout com dados do cliente
- ✅ Pagamento via PIX com QR Code
- ✅ Design responsivo

### API REST (Backend)
- ✅ CRUD completo de produtos
- ✅ Geração de QR Code PIX
- ✅ Gerenciamento de pedidos
- ✅ Validação de dados
- ✅ Configuração de CORS

### Painel Administrativo
- ✅ Gerenciamento de produtos (criar, editar, excluir)
- ✅ Consulta de pedidos
- ✅ Geração de PIX personalizado
- ✅ Interface intuitiva com abas

## 🎨 Design e UX

O design foi cuidadosamente desenvolvido para proporcionar:
- **Experiência Premium**: Visual elegante e moderno
- **Navegação Intuitiva**: Menu claro e organizado
- **Responsividade**: Adaptação perfeita a todos os dispositivos
- **Performance**: Carregamento rápido e otimizado
- **Acessibilidade**: Interface amigável para todos os usuários

## 💳 Sistema de Pagamento PIX

- Geração automática de QR Code
- Chave PIX personalizada
- Instruções claras para o usuário
- Integração com o checkout
- Painel admin para PIX avulso

## 🔧 API Endpoints

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Buscar produto por ID
- `POST /api/products` - Criar novo produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Excluir produto

### PIX
- `POST /api/pix/generate` - Gerar QR Code PIX

### Pedidos
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar novo pedido

### Health Check
- `GET /api/health` - Verificar status da API

## 📱 Responsividade

O site foi desenvolvido com design responsivo, garantindo:
- **Desktop**: Layout completo com sidebar e grid de produtos
- **Tablet**: Adaptação do layout para telas médias
- **Mobile**: Interface otimizada para dispositivos móveis
- **Touch**: Suporte completo a interações touch

## 🔒 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Configuração adequada de CORS
- Estrutura de projeto organizada

## 📈 Performance

- Componentes React otimizados
- Carregamento assíncrono de dados
- Imagens otimizadas
- CSS minificado
- Bundle otimizado

## 🎯 Diferenciais

1. **Design Único**: Inspirado mas totalmente original
2. **PIX Nativo**: Sistema de pagamento 100% brasileiro
3. **Admin Completo**: Painel robusto para gestão
4. **Código Limpo**: Estrutura organizada e documentada
5. **Escalável**: Arquitetura preparada para crescimento

## 📞 Suporte

Para dúvidas ou suporte técnico:
- Email: suporte@brasilapple.com
- WhatsApp: Botão disponível no site
- Documentação: Este README.md

## 📄 Licença

Este projeto é uma demonstração e não possui relação com a Apple Inc. É um projeto educacional/comercial independente.

---

**Brasil Apple** - A melhor experiência em smartphones premium do Brasil! 🇧🇷📱

