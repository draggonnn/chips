// Quiz Data
const quizData = [
    {
        question: "Há quanto tempo você enfrenta problemas de ejaculação precoce?",
        options: [
            { text: "Menos de 6 meses", score: 1 },
            { text: "6 meses a 1 ano", score: 2 },
            { text: "1 a 3 anos", score: 3 },
            { text: "Mais de 3 anos", score: 4 }
        ]
    },
    {
        question: "Em média, quanto tempo você consegue durar durante a relação?",
        options: [
            { text: "Menos de 1 minuto", score: 4 },
            { text: "1 a 2 minutos", score: 3 },
            { text: "2 a 5 minutos", score: 2 },
            { text: "Mais de 5 minutos", score: 1 }
        ]
    },
    {
        question: "Com que frequência isso acontece?",
        options: [
            { text: "Sempre (100% das vezes)", score: 4 },
            { text: "Quase sempre (80-90%)", score: 3 },
            { text: "Frequentemente (50-70%)", score: 2 },
            { text: "Às vezes (menos de 50%)", score: 1 }
        ]
    },
    {
        question: "Como isso afeta sua autoestima e relacionamento?",
        options: [
            { text: "Afeta muito, evito intimidade", score: 4 },
            { text: "Afeta bastante, me sinto inseguro", score: 3 },
            { text: "Afeta um pouco, mas consigo lidar", score: 2 },
            { text: "Não afeta muito", score: 1 }
        ]
    },
    {
        question: "Você já tentou algum tratamento antes?",
        options: [
            { text: "Não, nunca tentei nada", score: 3 },
            { text: "Sim, mas não funcionou", score: 4 },
            { text: "Sim, funcionou parcialmente", score: 2 },
            { text: "Sim, mas parei de usar", score: 3 }
        ]
    }
];

// Quiz Results
const quizResults = {
    low: {
        title: "NÍVEL BAIXO DE URGÊNCIA",
        description: "Você tem alguns episódios ocasionais, mas ainda está no início do problema. É o momento ideal para agir antes que se torne mais sério.",
        urgency: "Recomendação: Tratamento preventivo para evitar agravamento",
        color: "#f59e0b"
    },
    medium: {
        title: "NÍVEL MÉDIO DE URGÊNCIA",
        description: "O problema já está afetando sua vida íntima de forma significativa. É importante buscar uma solução eficaz rapidamente.",
        urgency: "Recomendação: Tratamento imediato para recuperar sua confiança",
        color: "#f97316"
    },
    high: {
        title: "NÍVEL ALTO DE URGÊNCIA",
        description: "A situação está crítica e provavelmente está causando muito sofrimento. Você precisa de uma solução eficaz AGORA!",
        urgency: "Recomendação: Tratamento urgente - Não perca mais tempo!",
        color: "#dc2626"
    }
};

// Quiz State
let currentQuestion = 0;
let userAnswers = [];
let totalScore = 0;

// DOM Elements
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const quizResult = document.getElementById('quiz-result');

// Initialize Quiz
function initQuiz() {
    showQuestion(currentQuestion);
    updateProgress();
}

// Show Question
function showQuestion(questionIndex) {
    const question = quizData[questionIndex];
    
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" data-score="${option.score}" onclick="selectOption(this, ${index})">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Restore previous answer if exists
    if (userAnswers[questionIndex] !== undefined) {
        const options = questionContainer.querySelectorAll('.option');
        options[userAnswers[questionIndex]].classList.add('selected');
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }
    
    // Update navigation buttons
    prevBtn.style.display = questionIndex > 0 ? 'block' : 'none';
    nextBtn.textContent = questionIndex === quizData.length - 1 ? 'Ver Resultado' : 'Próxima';
}

// Select Option
function selectOption(element, optionIndex) {
    // Remove previous selection
    const options = questionContainer.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selection to clicked option
    element.classList.add('selected');
    
    // Store answer
    userAnswers[currentQuestion] = optionIndex;
    
    // Show next button
    nextBtn.style.display = 'block';
    
    // Auto advance after 1 second
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            nextQuestion();
        } else {
            showResult();
        }
    }, 800);
}

// Next Question
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgress();
    } else {
        showResult();
    }
}

// Previous Question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateProgress();
    }
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = progress + '%';
}

// Calculate Score and Show Result
function showResult() {
    // Calculate total score
    totalScore = 0;
    userAnswers.forEach((answerIndex, questionIndex) => {
        totalScore += quizData[questionIndex].options[answerIndex].score;
    });
    
    // Determine result level
    let resultLevel;
    if (totalScore <= 8) {
        resultLevel = quizResults.low;
    } else if (totalScore <= 14) {
        resultLevel = quizResults.medium;
    } else {
        resultLevel = quizResults.high;
    }
    
    // Hide quiz container
    document.querySelector('.quiz-container').style.display = 'none';
    
    // Show result
    quizResult.style.display = 'block';
    quizResult.style.background = `linear-gradient(135deg, ${resultLevel.color}, ${resultLevel.color}dd)`;
    
    document.getElementById('result-title').textContent = resultLevel.title;
    document.getElementById('result-description').textContent = resultLevel.description;
    document.getElementById('urgency-level').textContent = resultLevel.urgency;
    
    // Scroll to result
    quizResult.scrollIntoView({ behavior: 'smooth' });
    
    // Show CTA buttons after result
    setTimeout(() => {
        showCTAButtons();
    }, 2000);
}

// Show CTA Buttons
function showCTAButtons() {
    const ctaHTML = `
        <div class="result-cta" style="margin-top: 30px;">
            <a href="https://app.pushinpay.com.br/service/pay/9f65e7fd-be65-426e-b0b1-fbd1958f332d" 
               class="btn-cta" target="_blank" style="margin-bottom: 15px; display: block;">
                QUERO RESOLVER AGORA
            </a>
            <p style="font-size: 0.9rem; opacity: 0.9;">
                ✅ Frete Grátis | 💳 Parcelamento sem juros | 🔒 Compra Segura
            </p>
        </div>
    `;
    
    quizResult.querySelector('.result-content').insertAdjacentHTML('beforeend', ctaHTML);
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);

// Stock Counter Animation
function animateStockCounter() {
    const stockElement = document.getElementById('stock-count');
    let currentStock = 23;
    
    setInterval(() => {
        if (Math.random() < 0.3 && currentStock > 5) { // 30% chance to decrease
            currentStock--;
            stockElement.textContent = currentStock;
            
            // Add flash effect
            stockElement.style.color = '#dc2626';
            stockElement.style.fontWeight = '900';
            setTimeout(() => {
                stockElement.style.color = '';
                stockElement.style.fontWeight = '';
            }, 1000);
        }
    }, 15000); // Check every 15 seconds
}

// Smooth Scroll for CTA buttons
function smoothScrollToCTA() {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                e.preventDefault();
                const target = document.querySelector(href.split('#')[1]);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    animateStockCounter();
    smoothScrollToCTA();
    
    // Add click tracking for CTA buttons
    document.querySelectorAll('.btn-cta').forEach(button => {
        button.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('CTA clicked:', this.href);
        });
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.product-section, .testimonials-section, .cta-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

