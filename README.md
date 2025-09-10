# Marcos V Tattoo - Site Oficial

Site moderno e responsivo para o estúdio de tatuagem Marcos V Tattoo, desenvolvido com React, Tailwind CSS e componentes shadcn/ui.

## 🎨 Características do Site

- **Design Escuro e Moderno**: Inspirado no site de referência, com fundo escuro e detalhes em amarelo/dourado
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Seções Completas**:
  - Header fixo com navegação suave
  - Hero section impactante com call-to-action
  - Galeria de portfólio com 8 imagens de tatuagens
  - Seção "Sobre" destacando qualidade, segurança e exclusividade
  - Informações de contato completas
  - Footer profissional
  - Botão flutuante do WhatsApp

## 📱 Funcionalidades

- **Navegação Suave**: Menu com scroll suave entre seções
- **Integração WhatsApp**: Botões que abrem diretamente o WhatsApp com mensagem pré-definida
- **Efeitos Visuais**: Hover effects, transições suaves e animações
- **SEO Otimizado**: Título e meta tags configurados

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm

### Instalação e Execução
```bash
# Navegar para o diretório do projeto
cd marcos-v-tattoo

# Instalar dependências (se necessário)
npm install

# Executar em modo desenvolvimento
npm run dev

# O site estará disponível em http://localhost:5173
```

### Build para Produção
```bash
# Gerar build de produção
npm run build

# Os arquivos estarão na pasta 'dist'
```

## 📁 Estrutura do Projeto

```
marcos-v-tattoo/
├── public/                 # Arquivos públicos
├── src/
│   ├── assets/            # Imagens de tatuagens (8 imagens incluídas)
│   ├── components/        # Componentes React
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos customizados
│   └── main.jsx          # Ponto de entrada
├── index.html            # HTML principal
├── package.json          # Dependências do projeto
└── README.md            # Este arquivo
```

## 🎯 Informações de Contato Configuradas

- **Endereço**: E bussiness rio verde, Quadra 97, lote 9, Avenida Rio Verde
- **Telefone**: (62) 98320-8180
- **Email**: oliveiramachado423@gmail.com
- **WhatsApp**: Configurado para abrir automaticamente com mensagem pré-definida

## 🖼️ Substituição de Imagens

Para substituir as imagens do portfólio:

1. Adicione suas imagens na pasta `src/assets/`
2. Edite o arquivo `src/App.jsx`
3. Substitua os imports das imagens (linhas 6-13)
4. Atualize o array `portfolioImages` (linha 23)

Exemplo:
```javascript
// Substitua estas linhas
import tattoo1 from './assets/UCZPm3qwtfW0.jpg'
import tattoo2 from './assets/5B7X1oJdbFSM.jpg'

// Por suas próprias imagens
import tattoo1 from './assets/minha-tatuagem-1.jpg'
import tattoo2 from './assets/minha-tatuagem-2.jpg'
```

## 🎨 Personalização

### Cores
As cores principais estão definidas no Tailwind CSS:
- **Fundo**: Preto (`bg-black`)
- **Texto**: Branco (`text-white`)
- **Destaque**: Amarelo (`text-yellow-400`)
- **Botões CTA**: Verde (`bg-green-600`)

### Conteúdo
Para alterar textos, edite diretamente o arquivo `src/App.jsx` nas seções correspondentes.

## 📱 Responsividade

O site é totalmente responsivo e foi testado em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔧 Tecnologias Utilizadas

- **React 18**: Framework JavaScript
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes UI
- **Lucide React**: Ícones
- **Framer Motion**: Animações (disponível)

## 📞 Suporte

Para dúvidas sobre o código ou modificações, consulte a documentação do React e Tailwind CSS.

---

**Desenvolvido com ❤️ para Marcos V Tattoo**

