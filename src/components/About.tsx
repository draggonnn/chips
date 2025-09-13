const About = () => {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 lg:mb-6 text-white">
                Sobre <span className="text-gold">Marcos Vinícius</span>
              </h2>
              
              <div className="space-y-4 lg:space-y-6 text-base lg:text-lg text-gray-300 leading-relaxed">
                <p>
                  Sou Marcos Vinícius, tenho 22 anos, e sou uma pessoa organizada, criativa e 
                  comprometida com o desenvolvimento contínuo. Valorizo disciplina e foco, sempre 
                  buscando entregar resultados consistentes em tudo que faço.
                </p>
                
                <p>
                  Tenho experiência e interesse em desenho e leitura, habilidades que fortalecem 
                  minha criatividade, análise crítica e capacidade de resolver problemas de forma 
                  inovadora. Além disso, aprecio ambientes tranquilos e harmoniosos, que favoreçam 
                  produtividade e clareza no trabalho.
                </p>
              </div>

              {/* Key Points */}
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-10">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Profissionalismo</h3>
                    <p className="text-gray-400 text-sm">Compromisso com a excelência em cada trabalho</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Segurança</h3>
                    <p className="text-gray-400 text-sm">Materiais esterilizados e ambiente higienizado</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Exclusividade</h3>
                    <p className="text-gray-400 text-sm">Designs únicos e personalizados</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Criatividade</h3>
                    <p className="text-gray-400 text-sm">Arte inovadora que conta sua história</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
                  className="btn-gold text-lg px-8 py-4 font-semibold"
                >
                  Vamos conversar sobre sua tatuagem
                </button>
              </div>
            </div>

            {/* Image/Visual Element */}
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="aspect-square rounded-lg bg-tattoo-dark-gray border-2 border-gold/20 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center">
                      <span className="text-3xl text-black">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Arte Personalizada</h3>
                    <p className="text-gray-300">
                      Cada tatuagem é criada especialmente para você, respeitando sua história e personalidade.
                    </p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-gold"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-gold"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;