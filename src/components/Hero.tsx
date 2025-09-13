import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('./lovable-uploads/a2380dbf-5163-4454-ae77-52c11fa0cb74.png')`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Hero pattern overlay */}
      <div className="absolute inset-0 hero-pattern opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 lg:px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 lg:mb-6 text-white leading-tight">
            Arte na Pele com{" "}
            <span className="text-gold">Marcos V Tattoo</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 lg:mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Tatuagens únicas, personalizadas e feitas com dedicação.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center">
            <Button
              onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
              className="btn-gold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 h-auto font-semibold animate-glow"
            >
              Agende seu horário pelo WhatsApp
            </Button>
            
            <Button
              variant="outline"
              onClick={() => document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" })}
              className="border-gold text-gold hover:bg-gold hover:text-black text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 h-auto font-semibold"
            >
              Ver Galeria
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;