const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/brasil-apple', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema do Produto
const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

// Produtos de exemplo
const sampleProducts = [
  {
    id: uuidv4(),
    name: 'iPhone 15 Pro Max 256GB - Brasil Apple',
    description: 'O mais avançado smartphone da linha Brasil Apple. Tela de 6.7 polegadas, câmera tripla de alta qualidade, processador A17 Pro e design premium em titânio.',
    price: 1299.99,
    image: '/images/iphone-15-pro-max.jpg',
    category: 'smartphones',
    stock: 15
  },
  {
    id: uuidv4(),
    name: 'iPhone 14 Pro 128GB - Brasil Apple',
    description: 'Smartphone premium com tela Super Retina XDR de 6.1 polegadas, sistema de câmera Pro e chip A16 Bionic para performance excepcional.',
    price: 999.99,
    image: '/images/iphone-14-pro.jpg',
    category: 'smartphones',
    stock: 20
  },
  {
    id: uuidv4(),
    name: 'iPhone 13 256GB - Brasil Apple',
    description: 'Design elegante com tela de 6.1 polegadas, sistema de câmera dupla avançado e chip A15 Bionic. Disponível em várias cores.',
    price: 799.99,
    image: '/images/iphone-13.jpg',
    category: 'smartphones',
    stock: 25
  },
  {
    id: uuidv4(),
    name: 'iPhone 12 Pro Max 256GB - Brasil Apple',
    description: 'Tela de 6.7 polegadas com tecnologia ProMotion, sistema de câmera Pro com LiDAR e design resistente com Ceramic Shield.',
    price: 899.99,
    image: '/images/iphone-12-pro-max.jpg',
    category: 'smartphones',
    stock: 18
  },
  {
    id: uuidv4(),
    name: 'iPhone SE 128GB - Brasil Apple',
    description: 'Compacto e poderoso, com tela de 4.7 polegadas, chip A15 Bionic e sistema de câmera avançado. Perfeito para quem busca praticidade.',
    price: 429.99,
    image: '/images/iphone-se.jpg',
    category: 'smartphones',
    stock: 30
  },
  {
    id: uuidv4(),
    name: 'iPad Pro 12.9" 256GB - Brasil Apple',
    description: 'Tablet profissional com tela Liquid Retina XDR de 12.9 polegadas, chip M2 e compatibilidade com Apple Pencil e Magic Keyboard.',
    price: 1199.99,
    image: '/images/ipad-pro.jpg',
    category: 'tablets',
    stock: 12
  },
  {
    id: uuidv4(),
    name: 'MacBook Air M2 256GB - Brasil Apple',
    description: 'Notebook ultrafino com chip M2, tela Liquid Retina de 13.6 polegadas e até 18 horas de bateria. Ideal para trabalho e estudos.',
    price: 1399.99,
    image: '/images/macbook-air.jpg',
    category: 'notebooks',
    stock: 8
  },
  {
    id: uuidv4(),
    name: 'AirPods Pro 2ª Geração - Brasil Apple',
    description: 'Fones de ouvido sem fio com cancelamento ativo de ruído, áudio espacial personalizado e até 6 horas de reprodução.',
    price: 249.99,
    image: '/images/airpods-pro.jpg',
    category: 'acessorios',
    stock: 40
  }
];

// Função para popular o banco de dados
async function seedDatabase() {
  try {
    // Limpar produtos existentes
    await Product.deleteMany({});
    console.log('Produtos existentes removidos');

    // Inserir produtos de exemplo
    await Product.insertMany(sampleProducts);
    console.log('Produtos de exemplo inseridos com sucesso!');
    
    console.log(`${sampleProducts.length} produtos adicionados ao banco de dados`);
    
    // Fechar conexão
    mongoose.connection.close();
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    mongoose.connection.close();
  }
}

seedDatabase();

