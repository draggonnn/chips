import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Phone, Mail, MapPin, Instagram, MessageCircle, Star } from 'lucide-react'
import './App.css'

// Importar imagem hero do Marcos V
import heroImage from './assets/pasted_file_aHwRGS_hero_image_marcos.png'

// Importar imagens reais das tatuagens
import tattoo1 from './assets/pasted_file_Awny2M_pasted_file_Ccya0U_photo_2025-09-07_10-49-09.jpg'
import tattoo2 from './assets/pasted_file_xEwmpH_pasted_file_cGoI42_photo_2025-09-07_10-49-27.jpg'
import tattoo3 from './assets/pasted_file_zqhteD_pasted_file_EZVvjl_photo_2025-09-07_10-48-40.jpg'
import tattoo4 from './assets/pasted_file_hKD24H_pasted_file_gXLrq1_photo_2025-09-07_10-49-14.jpg'
import tattoo5 from './assets/pasted_file_Bv0bCW_pasted_file_UdZXuk_photo_2025-09-07_10-49-19.jpg'
import tattoo6 from './assets/pasted_file_YikmNF_pasted_file_xmGx3u_photo_2025-09-07_10-49-23.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const portfolioImages = [
    tattoo1, tattoo2, tattoo3, tattoo4, tattoo5, tattoo6
  ]

  const whatsappNumber = "5562983208180"
  const whatsappMessage = "Olá! Gostaria de agendar um horário para tatuagem."

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-yellow-400">
            Marcos V Tattoo
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="hover:text-yellow-400 transition-colors">Início</a>
            <a href="#portfolio" className="hover:text-yellow-400 transition-colors">Portfólio</a>
            <a href="#sobre" className="hover:text-yellow-400 transition-colors">Sobre</a>
            <a href="#contato" className="hover:text-yellow-400 transition-colors">Contato</a>
          </nav>

          <Button 
            className="hidden md:flex bg-green-600 hover:bg-green-700 text-white"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#inicio" className="hover:text-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a href="#portfolio" className="hover:text-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Portfólio</a>
              <a href="#sobre" className="hover:text-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href="#contato" className="hover:text-yellow-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Contato</a>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-fit"
                onClick={() => {
                  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
                  setIsMenuOpen(false)
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            ARTE NA PELE COM{' '}
            <span className="text-yellow-400">MARCOS V TATTOO</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Tatuagens únicas, personalizadas e feitas com dedicação.
          </p>
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Agende seu horário no WhatsApp
          </Button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              PORTFÓLIO
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Confira alguns dos nossos trabalhos mais recentes e se inspire para sua próxima tatuagem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioImages.map((image, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-800"
              >
                <img 
                  src={image} 
                  alt={`Tatuagem ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold">Ver detalhes</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">
              Gostou do que viu? Entre em contato para criar sua arte personalizada!
            </p>
            <Button 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
              onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
            >
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              SOBRE <span className="text-yellow-400">MIM</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
            
            <div className="text-lg text-gray-300 leading-relaxed space-y-6">
              <p>
                Sou Marcos Vinícius, tenho 22 anos, e sou uma pessoa organizada, criativa e comprometida 
                com o desenvolvimento contínuo. Valorizo disciplina e foco, sempre buscando entregar 
                resultados consistentes em tudo que faço.
              </p>
              
              <p>
                Tenho experiência e interesse em desenho e leitura, habilidades que fortalecem minha 
                criatividade, análise crítica e capacidade de resolver problemas de forma inovadora. 
                Além disso, aprecio ambientes tranquilos e harmoniosos, que favoreçam produtividade 
                e clareza no trabalho.
              </p>
              
              <p>
                No meu estúdio, cada tatuagem é uma obra de arte única que conta uma história pessoal. 
                Sou dedicado a transformar suas ideias em arte permanente na pele, sempre priorizando 
                a qualidade, segurança e exclusividade em cada trabalho.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Criatividade</h3>
                <p className="text-gray-400">Desenhos únicos e personalizados com atenção aos detalhes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Organização</h3>
                <p className="text-gray-400">Ambiente limpo, organizado e protocolos rigorosos de higiene</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprometimento</h3>
                <p className="text-gray-400">Dedicação total para entregar resultados excepcionais</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              CONTATO
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">
              Entre em contato conosco e agende sua sessão
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Endereço</h3>
                  <p className="text-gray-300">
                    E bussiness rio verde<br />
                    Quadra 97, lote 9<br />
                    Avenida Rio Verde
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                  <p className="text-gray-300">(62) 98320-8180</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-300">oliveiramachado423@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Instagram className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instagram</h3>
                  <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    Clique aqui
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Pronto para sua nova tatuagem?</h3>
              <p className="text-gray-300 mb-6">
                Entre em contato conosco pelo WhatsApp e agende sua consulta. 
                Vamos transformar suas ideias em arte!
              </p>
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white w-full"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Agendar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Marcos V Tattoo</h3>
              <p className="text-gray-400">
                Arte na pele com criatividade, organização e comprometimento.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>(62) 98320-8180</p>
                <p>oliveiramachado423@gmail.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Marcos V Tattoo - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg"
          onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

export default App

