const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB (usando uma instância local para desenvolvimento)
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

// Schema do Pedido
const orderSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  products: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  pixQRCode: { type: String },
  pixKey: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// Rotas da API

// Produtos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const productData = {
      ...req.body,
      id: uuidv4()
    };
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pedidos
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderId = uuidv4();
    const pixKey = 'pix@brasilapple.com'; // Chave PIX fictícia
    
    // Gerar QR Code PIX
    const pixData = `00020126580014BR.GOV.BCB.PIX0136${pixKey}5204000053039865802BR5913Brasil Apple6009SAO PAULO62070503***6304`;
    const qrCodeDataURL = await QRCode.toDataURL(pixData);
    
    const orderData = {
      ...req.body,
      id: orderId,
      pixQRCode: qrCodeDataURL,
      pixKey: pixKey
    };
    
    const order = new Order(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Gerar QR Code PIX
app.post('/api/generate-pix', async (req, res) => {
  try {
    const { amount, customerName } = req.body;
    const pixKey = 'pix@brasilapple.com'; // Chave PIX fictícia
    
    // Formato simplificado do PIX QR Code
    const pixData = `00020126580014BR.GOV.BCB.PIX0136${pixKey}5204000053039865802BR5913Brasil Apple6009SAO PAULO62070503***6304`;
    const qrCodeDataURL = await QRCode.toDataURL(pixData);
    
    res.json({
      qrCode: qrCodeDataURL,
      pixKey: pixKey,
      amount: amount,
      customerName: customerName
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ message: 'API Brasil Apple funcionando!' });
});

// Inicializar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

