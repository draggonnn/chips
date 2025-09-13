import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl lg:text-2xl font-bold text-gold">
              Marcos V Tattoo
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover-gold transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("galeria")}
              className="text-foreground hover-gold transition-colors"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-foreground hover-gold transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-foreground hover-gold transition-colors"
            >
              Contato
            </button>
            <Button
              onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
              className="btn-gold font-medium"
            >
              WhatsApp
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1"
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "top-2.5"
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-4"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-effect rounded-lg mt-2 py-4">
            <nav className="flex flex-col space-y-4 px-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-foreground hover-gold transition-colors text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("galeria")}
                className="text-foreground hover-gold transition-colors text-left"
              >
                Galeria
              </button>
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-foreground hover-gold transition-colors text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-foreground hover-gold transition-colors text-left"
              >
                Contato
              </button>
              <Button
                onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
                className="btn-gold font-medium w-full"
              >
                WhatsApp
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;