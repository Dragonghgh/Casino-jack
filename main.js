// Initialize the casino experience
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the welcome page
    if (document.body.classList.contains('welcome-page')) {
        initWelcomePage();
    }
    
    // Check if this is the lobby page
    if (document.body.classList.contains('lobby-page')) {
        initLobbyPage();
    }
});

function initWelcomePage() {
    // Background music control
    const bgMusic = document.getElementById('backgroundMusic');
    bgMusic.volume = 0.3;
    
    // Start music after first interaction
    document.body.addEventListener('click', function() {
        bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
    }, { once: true });
    
    // Enter button functionality
    const enterBtn = document.querySelector('.enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            // Add transition effect before navigating
            document.querySelector('.welcome-container').classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'lobby.html';
            }, 500);
        });
    }
}

function initLobbyPage() {
    // Initialize wallet
    if (typeof Wallet !== 'undefined') {
        Wallet.init();
    }
    
    // Game card interactions
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const game = this.getAttribute('data-game');
            navigateToGame(game);
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function navigateToGame(game) {
    // Add transition effect
    document.querySelector('.lobby-main').classList.add('fade-out');
    
    // Play sound effect
    const clickSound = new Audio('assets/sounds/click.wav');
    clickSound.volume = 0.3;
    clickSound.play();
    
    setTimeout(() => {
        window.location.href = `games/${game}.html`;
    }, 300);
}

// Wallet management
class Wallet {
    static init() {
        if (!localStorage.getItem('casinoBalance')) {
            localStorage.setItem('casinoBalance', '10000');
        }
        
        this.updateBalanceDisplay();
    }
    
    static getBalance() {
        return parseInt(localStorage.getItem('casinoBalance'));
    }
    
    static updateBalanceDisplay() {
        const balanceElement = document.getElementById('userBalance');
        if (balanceElement) {
            const balance = this.getBalance();
            balanceElement.textContent = balance.toLocaleString();
            
            // Add animation if balance changed
            balanceElement.classList.add('balance-update');
            setTimeout(() => {
                balanceElement.classList.remove('balance-update');
            }, 500);
        }
    }
    
    static addFunds(amount) {
        const current = this.getBalance();
        localStorage.setItem('casinoBalance', (current + amount).toString());
        this.updateBalanceDisplay();
    }
    
    static deductFunds(amount) {
        const current = this.getBalance();
        localStorage.setItem('casinoBalance', (current - amount).toString());
        this.updateBalanceDisplay();
    }
}
