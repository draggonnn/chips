# Site Marcos Vinícius Tattoo

Uma cópia fiel do site de referência (filipeamorimtattoo.com) adaptada para Marcos Vinícius Tattoo.

## 🎨 Características

- **Design idêntico** ao site de referência
- **Cores**: Preto, branco e dourado
- **Layout**: One page com navegação suave
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Integração WhatsApp**: Botões funcionais para contato
- **Efeitos visuais**: Transições suaves e hover effects

## 📱 Seções

1. **Header fixo** - Logo e menu de navegação
2. **Hero** - Título principal com CTA
3. **Portfólio** - Grid masonry para fotos (12 espaços prontos)
4. **Estatísticas** - Números em destaque
5. **Sobre** - Informações sobre Marcos Vinícius
6. **Contato** - Informações completas de contato
7. **Footer** - Rodapé com links e direitos

## 🚀 Como usar

### Instalação
```bash
cd marcos-vinicius-tattoo
npm install
```

### Desenvolvimento
```bash
npm run dev
```
O site estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
```

## 📸 Adicionando suas fotos

1. Coloque suas fotos na pasta `src/assets/`
2. Edite o arquivo `src/App.jsx`
3. Substitua os placeholders na seção "Portfolio" pelas suas imagens

Exemplo:
```jsx
// Substitua esta linha:
const placeholderImages = Array(12).fill(null).map((_, i) => 
  `https://images.unsplash.com/photo-${1580000000000 + i}?w=400&h=600&fit=crop&auto=format`
)

// Por suas imagens:
const portfolioImages = [
  '/src/assets/tatuagem1.jpg',
  '/src/assets/tatuagem2.jpg',
  // ... suas fotos
]
```

## 🎯 Personalizações

### Alterando informações de contato
Edite as variáveis no arquivo `src/App.jsx`:
- `whatsappNumber`: Número do WhatsApp
- `whatsappMessage`: Mensagem padrão
- Seção de contato: Endereço, telefone, email

### Alterando cores
As cores estão definidas no `src/App.css` e seguem o padrão:
- Preto: `#000000`
- Branco: `#ffffff`
- Dourado: `#fbbf24` (yellow-400)
- Verde WhatsApp: `#22c55e` (green-600)

### Adicionando logo
1. Coloque seu logo na pasta `src/assets/`
2. Substitua o texto "Marcos Vinícius Tattoo" no header por uma tag `<img>`

## 📞 Contato configurado

- **Telefone**: (62) 98320-8180
- **Email**: oliveiramachado423@gmail.com
- **Endereço**: E bussiness rio verde, Quadra 97, lote 9, Avenida Rio Verde
- **WhatsApp**: Configurado com mensagem automática

## 🛠️ Tecnologias

- React 18
- Vite
- Tailwind CSS
- Shadcn/ui
- Lucide Icons
- Framer Motion

## 📝 Notas

- O site é uma cópia fiel do design original
- Todos os links do WhatsApp estão funcionais
- Layout totalmente responsivo
- Otimizado para performance
- Pronto para adicionar suas fotos reais

---

**Desenvolvido para Marcos Vinícius Tattoo**  
*Arte na pele com profissionalismo, segurança e exclusividade.*

