const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tattoo-black border-t border-gold/20 py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gold mb-4">Marcos V Tattoo</h3>
            <p className="text-gray-400 mb-4">
              Arte na pele com dedicação, criatividade e profissionalismo. 
              Cada tatuagem é uma obra única criada especialmente para você.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => window.open("#", "_blank")}
                className="w-10 h-10 bg-tattoo-dark-gray rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
              >
                📷
              </button>
              <button
                onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
                className="w-10 h-10 bg-tattoo-dark-gray rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
              >
                💬
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-400 hover:text-gold transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-400 hover:text-gold transition-colors"
              >
                Galeria
              </button>
              <button
                onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-400 hover:text-gold transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-400 hover:text-gold transition-colors"
              >
                Contato
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-400">
              <p>E bussiness rio verde</p>
              <p>Quadra 97, lote 9</p>
              <p>Avenida Rio Verde</p>
              <a 
                href="tel:+5562983208180" 
                className="block hover:text-gold transition-colors"
              >
                (62) 98320-8180
              </a>
              <a 
                href="mailto:oliveiramachado423@gmail.com" 
                className="block hover:text-gold transition-colors"
              >
                oliveiramachado423@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Marcos V Tattoo. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm">
            Arte na pele com paixão e dedicação ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;