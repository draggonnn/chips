# 🚀 Guia de Instalação - Brasil Apple

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** (geralmente vem com Node.js)
- **MongoDB** (versão 4.4 ou superior)
- **Git** (para clonar o repositório)

## Instalação Passo a Passo

### 1. Preparação do Ambiente

#### Ubuntu/Debian
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js e npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Windows
1. Baixe e instale Node.js do site oficial
2. Baixe e instale MongoDB Community Edition
3. Configure as variáveis de ambiente

#### macOS
```bash
# Usando Homebrew
brew install node
brew install mongodb-community
brew services start mongodb-community
```

### 2. Configuração do Projeto

#### Clonar o Repositório
```bash
git clone <url-do-repositorio>
cd brasil-apple
```

#### Configurar Backend
```bash
cd backend

# Instalar dependências
npm install

# Verificar se MongoDB está rodando
mongosh --eval "db.adminCommand('ismaster')"

# Popular banco de dados com produtos de exemplo
npm run seed
```

#### Configurar Frontend
```bash
cd ../frontend

# Instalar dependências
npm install

# Verificar se tudo está funcionando
npm run build
```

### 3. Executar o Projeto

#### Terminal 1 - Backend
```bash
cd backend
npm start
```
O backend estará disponível em: `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```
O frontend estará disponível em: `http://localhost:3000`

### 4. Verificar Instalação

#### Testar Backend
```bash
curl http://localhost:5000/api/health
# Deve retornar: {"message":"API Brasil Apple funcionando!"}
```

#### Testar Frontend
Abra o navegador em `http://localhost:3000` e verifique:
- ✅ Página inicial carrega
- ✅ Produtos são exibidos
- ✅ Navegação funciona

#### Testar Painel Admin
Acesse `http://localhost:3000/admin` e verifique:
- ✅ Lista de produtos
- ✅ Geração de PIX
- ✅ Interface responsiva

## Configurações Avançadas

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/brasilapple
PIX_KEY=pix@brasilapple.com
```

### Configuração de Produção

#### Backend
```bash
# Instalar PM2 para gerenciamento de processos
npm install -g pm2

# Iniciar aplicação
pm2 start server.js --name "brasil-apple-backend"
```

#### Frontend
```bash
# Build para produção
npm run build

# Servir arquivos estáticos
npm install -g serve
serve -s build -l 3000
```

### Configuração do MongoDB

#### Criar usuário administrativo
```javascript
// Conectar ao MongoDB
mongosh

// Criar banco de dados
use brasilapple

// Criar usuário
db.createUser({
  user: "admin",
  pwd: "senha_segura",
  roles: ["readWrite"]
})
```

## Solução de Problemas

### Erro: "MongoDB connection failed"
```bash
# Verificar se MongoDB está rodando
sudo systemctl status mongod

# Reiniciar se necessário
sudo systemctl restart mongod
```

### Erro: "Port 3000 is already in use"
```bash
# Encontrar processo usando a porta
lsof -ti:3000

# Matar processo
kill -9 <PID>
```

### Erro: "Cannot find module"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "CORS policy"
Verifique se o backend está configurado corretamente com CORS habilitado.

## Scripts Úteis

### Backend
```bash
npm start          # Iniciar servidor
npm run seed       # Popular banco de dados
npm run dev        # Modo desenvolvimento (se configurado)
```

### Frontend
```bash
npm start          # Servidor de desenvolvimento
npm run build      # Build para produção
npm test           # Executar testes
npm run eject      # Ejetar configuração (cuidado!)
```

## Estrutura de Dados

### Produto (MongoDB)
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Pedido (MongoDB)
```javascript
{
  _id: ObjectId,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  items: Array,
  totalAmount: Number,
  status: String,
  pixData: Object,
  createdAt: Date
}
```

## Backup e Restauração

### Backup do MongoDB
```bash
mongodump --db brasilapple --out backup/
```

### Restauração do MongoDB
```bash
mongorestore --db brasilapple backup/brasilapple/
```

## Monitoramento

### Logs do Backend
```bash
# Ver logs em tempo real
tail -f logs/app.log

# Com PM2
pm2 logs brasil-apple-backend
```

### Métricas de Performance
```bash
# Monitorar processos
pm2 monit

# Status dos serviços
pm2 status
```

## Segurança

### Configurações Recomendadas
1. Use HTTPS em produção
2. Configure firewall adequadamente
3. Use senhas fortes para MongoDB
4. Mantenha dependências atualizadas
5. Configure rate limiting

### Atualizações
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências
npm update
```

## Suporte

Se encontrar problemas durante a instalação:

1. Verifique os logs de erro
2. Consulte a documentação oficial das tecnologias
3. Verifique se todas as dependências estão instaladas
4. Entre em contato com o suporte técnico

---

**Boa sorte com sua instalação do Brasil Apple!** 🚀

