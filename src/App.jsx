import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Phone, Mail, MapPin, Instagram, MessageCircle, Star, Award, Users, Calendar } from 'lucide-react'
import './App.css'

// Importar as imagens reais
import heroImage from './assets/hero_image_marcos.jpg'
import tattoo1 from './assets/pasted_file_ws85yJ_photo_1_2025-09-10_15-34-53.jpg'
import tattoo2 from './assets/pasted_file_vunS88_photo_2_2025-09-10_15-34-53.jpg'
import tattoo3 from './assets/pasted_file_JGzTen_photo_3_2025-09-10_15-34-53.jpg'
import tattoo4 from './assets/pasted_file_lUTf32_photo_4_2025-09-10_15-34-53.jpg'
import tattoo5 from './assets/pasted_file_YwLTqv_photo_5_2025-09-10_15-34-53.jpg'
import tattoo6 from './assets/pasted_file_vDIxse_photo_6_2025-09-10_15-34-53.jpg'

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

  const whatsappNumber = "5562983208180"
  const whatsappMessage = "Olá! Gostaria de agendar um horário para tatuagem."

  const portfolioImages = [
    tattoo1,
    tattoo2,
    tattoo3,
    tattoo4,
    tattoo5,
    tattoo6,
    // Adicione mais imagens aqui se tiver mais de 6
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-yellow-500/20' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-yellow-400">
            Marcos Vinícius Tattoo
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="hover:text-yellow-400 transition-colors duration-300">Início</a>
            <a href="#portfolio" className="hover:text-yellow-400 transition-colors duration-300">Portfólio</a>
            <a href="#sobre" className="hover:text-yellow-400 transition-colors duration-300">Sobre</a>
            <a href="#contato" className="hover:text-yellow-400 transition-colors duration-300">Contato</a>
          </nav>

          <Button 
            className="hidden md:flex bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-yellow-500/20">
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
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            ARTE NA PELE COM{' '}
            <span className="text-yellow-400 block md:inline">MARCOS VINÍCIUS</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Tatuagens únicas, personalizadas e feitas com dedicação.
          </p>
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Agende seu horário pelo WhatsApp
          </Button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Portfolio Grid - Estilo masonry como no site original */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioImages.map((image, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-lg bg-gray-800 transition-all duration-500 hover:scale-105 hover:z-10 ${
                  index % 3 === 0 ? 'row-span-2' : 'row-span-1'
                }`}
                style={{ aspectRatio: index % 3 === 0 ? '3/4' : '4/3' }}
              >
                <img 
                  src={image} 
                  alt={`Tatuagem ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Star className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Ver detalhes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - Como no site original */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center text-black">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">+500</div>
              <div className="text-sm md:text-base font-medium">Clientes atendidos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
              <div className="text-sm md:text-base font-medium">Anos de experiência</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">+1K</div>
              <div className="text-sm md:text-base font-medium">Seguidores</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">+20</div>
              <div className="text-sm md:text-base font-medium">Cursos realizados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base font-medium">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Conheça <span className="text-yellow-400">Marcos Vinícius</span>
            </h2>
            
            <div className="text-lg text-gray-300 leading-relaxed space-y-6 mb-12">
              <p>
                Sou Marcos Vinícius, tenho 22 anos, e sou uma pessoa organizada, criativa e comprometida com o desenvolvimento contínuo. Valorizo disciplina e foco, sempre buscando entregar resultados consistentes em tudo que faço.
              </p>
              
              <p>
                Tenho experiência e interesse em desenho e leitura, habilidades que fortalecem minha criatividade, análise crítica e capacidade de resolver problemas de forma inovadora. Além disso, aprecio ambientes tranquilos e harmoniosos, que favoreçam produtividade e clareza no trabalho.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-black rounded-lg">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Profissionalismo</h3>
                <p className="text-gray-400">Trabalhos executados com máxima qualidade e atenção aos detalhes</p>
              </div>
              
              <div className="text-center p-6 bg-black rounded-lg">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Segurança</h3>
                <p className="text-gray-400">Protocolos rigorosos de higiene e equipamentos esterilizados</p>
              </div>
              
              <div className="text-center p-6 bg-black rounded-lg">
                <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Exclusividade</h3>
                <p className="text-gray-400">Designs únicos e personalizados para cada cliente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              CONTATO
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">
              Entre em contato e agende sua sessão
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4 p-6 bg-gray-900 rounded-lg">
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

              <div className="flex items-start space-x-4 p-6 bg-gray-900 rounded-lg">
                <Phone className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                  <p className="text-gray-300">(62) 98320-8180</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-900 rounded-lg">
                <Mail className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-300">oliveiramachado423@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-900 rounded-lg">
                <Instagram className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instagram</h3>
                  <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    Clique aqui
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-lg p-8 text-center text-black">
              <h3 className="text-2xl font-bold mb-4">Pronto para sua nova tatuagem?</h3>
              <p className="mb-6 text-black/80">
                Entre em contato pelo WhatsApp e agende sua consulta. 
                Vamos transformar suas ideias em arte!
              </p>
              <Button 
                size="lg"
                className="bg-black hover:bg-gray-800 text-white w-full transition-all duration-300"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Agendar pelo WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-yellow-500/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Marcos Vinícius Tattoo</h3>
              <p className="text-gray-400">
                Arte na pele com profissionalismo, segurança e exclusividade.
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
            <p>&copy; 2024 Marcos Vinícius Tattoo - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110"
          onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

export default App

