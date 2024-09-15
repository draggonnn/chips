document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const value = card.getAttribute('data-value');
            const price = card.querySelector('p').innerText;

            alert(`Você escolheu comprar ${value} seguidores por ${price}.`);
        });
    });
});
