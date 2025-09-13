import { useState } from "react";

const Gallery = () => {
  // Fotos dos trabalhos de tatuagem
  const galleryImages = [
    {
      url: "./lovable-uploads/bc071202-5555-4fa8-a0f4-f48a732d87e3.png",
      alt: "Tatuagem realista de cachorro Shih Tzu com nome Bolinha"
    },
    {
      url: "./lovable-uploads/55176850-3670-4596-a8e5-6e599b93ccd7.png", 
      alt: "Tatuagem oriental com templo japonês e flores de cerejeira"
    },
    {
      url: "./lovable-uploads/10b87435-9feb-4474-8a62-9149e91f6004.png",
      alt: "Tatuagem realista feminina com cartas de baralho e elementos decorativos"
    },
    {
      url: "./lovable-uploads/ece86ca1-1d24-46a8-81ec-212f64a59ce6.png",
      alt: "Tatuagem realista de elefante em braço completo"
    },
    {
      url: "./lovable-uploads/3c2377ea-91a4-4263-ba52-1ff9db3fb1ae.png",
      alt: "Tatuagem cartoon dos personagens Looney Tunes na perna"
    },
    {
      url: "./lovable-uploads/ab26a98a-8493-4e2f-bfd9-479f30c673f2.png",
      alt: "Tatuagem religiosa de Jesus Cristo com coroa"
    },
    {
      url: "./lovable-uploads/photo_1_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem delicada de rosa com folhas na coxa"
    },
    {
      url: "./lovable-uploads/photo_2_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem feminina nas costas com rosas e frase inspiracional"
    },
    {
      url: "./lovable-uploads/photo_3_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem realista de coruja com relógio no antebraço"
    },
    {
      url: "./lovable-uploads/photo_5_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem chicana com rosto feminino e cartas na perna"
    },
    {
      url: "./lovable-uploads/photo_6_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem realista de elefante africano com paisagem no braço"
    },
    {
      url: "./lovable-uploads/photo_7_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem religiosa de Jesus Cristo em prece no braço"
    },
    {
      url: "./lovable-uploads/photo_8_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem musical com retrato e notas musicais na perna"
    },
    {
      url: "./lovable-uploads/photo_9_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem oriental japonesa com templo e flores de cerejeira na perna"
    },
    {
      url: "./lovable-uploads/photo_10_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem religiosa realista de Jesus Cristo com pomba no braço"
    },
    {
      url: "./lovable-uploads/photo_11_2025-09-12_16-09-44.jpg",
      alt: "Tatuagem cartoon dos Looney Tunes Acme na perna"
    }
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="galeria" className="py-20 bg-tattoo-dark-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Galeria de <span className="text-gold">Trabalhos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cada tatuagem é uma obra de arte única, criada com paixão e dedicação aos detalhes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-hover cursor-pointer group relative overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gold text-xl">+</span>
                  </div>
                  <p className="text-sm">Ver Detalhes</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-gray-300 mb-6">
            Gostou do que viu? Entre em contato para criar sua arte personalizada!
          </p>
          <button
            onClick={() => window.open("https://wa.me/5562983208180", "_blank")}
            className="btn-gold text-lg px-8 py-4 font-semibold inline-flex items-center gap-2"
          >
            <span>💬</span>
            Conversar no WhatsApp
          </button>
        </div>
      </div>

      {/* Modal for viewing images */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gold transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;