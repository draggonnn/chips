document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const selectedPackage = document.getElementById('selected-package');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const value = card.getAttribute('data-value');
            const price = card.querySelector('p').innerText;

            localStorage.setItem('selectedPackage', `${value} seguidores por ${price}`);
            window.location.href = 'checkout.html';
        });
    });

    if (checkoutForm) {
        const packageInfo = localStorage.getItem('selectedPackage');
        if (packageInfo) {
            selectedPackage.innerText = `Você escolheu: ${packageInfo}`;
            localStorage.removeItem('selectedPackage');
        }

        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            alert(`Compra finalizada! Nome de usuário: ${username}`);
            // Aqui você pode adicionar a lógica para processar o pagamento
        });
    }
});
