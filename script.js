let currentSlide = 0; // Slide inicial
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

// Adiciona indicadores dinâmicos
const indicatorsContainer = document.querySelector('.indicators');
for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.dataset.index = i;
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
}
updateIndicators();

// Função para trocar de slide
function changeSlide(direction) {
    currentSlide += direction;

    // Voltar ao início ou ao último slide
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;

    updateSlider();
}

// Atualiza o slider e os indicadores
function updateSlider() {
    const offset = -currentSlide * 100; // Deslocamento horizontal
    slides.style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicators div');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Vai diretamente para um slide específico
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Autoplay (troca automática de slides a cada 5 segundos)
setInterval(() => {
    changeSlide(1);
}, 5000);
