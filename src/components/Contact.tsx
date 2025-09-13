import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-tattoo-dark-gray">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 lg:mb-6 text-white">
            Entre em <span className="text-gold">Contato</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Pronto para transformar sua ideia em arte? Vamos conversar sobre seu projeto!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-8">Informações de Contato</h3>
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-black text-xl">📍</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Endereço</h4>
                  <p className="text-gray-300">
                    E bussiness rio verde<br />
                    Quadra 97, lote 9<br />
                    Avenida Rio Verde
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-black text-xl">📱</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Telefone</h4>
                  <a 
                    href="tel:+5562983208180" 
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    (62) 98320-8180
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-black text-xl">✉️</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <a 
                    href="mailto:oliveiramachado423@gmail.com" 
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    oliveiramachado423@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Redes Sociais</h4>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open("#", "_blank")}
                    className="border-gold text-gold hover:bg-gold hover:text-black"
                  >
                    Instagram
                  </Button>
                  <Button
                    onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
                    className="btn-gold"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="bg-background border border-gold/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Pronto para sua nova tattoo?</h3>
              
              <div className="space-y-6">
                <p className="text-gray-300">
                  O processo é simples: entre em contato, conversamos sobre sua ideia, 
                  criamos o design personalizado e agendamos sua sessão.
                </p>
                
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Consulta gratuita para discutir sua ideia
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Design personalizado criado especialmente para você
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Materiais esterilizados e ambiente seguro
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Acompanhamento pós-tatuagem
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
                    className="btn-gold w-full text-lg py-4 font-semibold"
                  >
                    💬 Iniciar Conversa no WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;