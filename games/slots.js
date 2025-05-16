// Symbols for the slots
const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '💰', '7️⃣'];

document.addEventListener('DOMContentLoaded', function() {
    const balanceElement = document.getElementById('balance');
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    const spinBtn = document.getElementById('spinBtn');
    const betAmount = document.getElementById('betAmount');
    const resultMessage = document.getElementById('resultMessage');
    
    // Set initial balance
    balanceElement.textContent = localStorage.getItem('casinoBalance');
    
    spinBtn.addEventListener('click', function() {
        const currentBalance = parseInt(localStorage.getItem('casinoBalance'));
        const bet = parseInt(betAmount.value);
        
        if (bet > currentBalance) {
            resultMessage.textContent = "You don't have enough money for that bet!";
            return;
        }
        
        // Deduct bet amount
        localStorage.setItem('casinoBalance', (currentBalance - bet).toString());
        balanceElement.textContent = localStorage.getItem('casinoBalance');
        
        // Disable button during spin
        spinBtn.disabled = true;
        resultMessage.textContent = "Spinning...";
        
        // Animate slots
        let spins = 0;
        const totalSpins = 10;
        const spinInterval = setInterval(() => {
            slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            spins++;
            if (spins >= totalSpins) {
                clearInterval(spinInterval);
                evaluateResult();
                spinBtn.disabled = false;
            }
        }, 100);
    });
    
    function evaluateResult() {
        const currentBalance = parseInt(localStorage.getItem('casinoBalance'));
        const bet = parseInt(betAmount.value);
        
        if (slot1.textContent === slot2.textContent && slot2.textContent === slot3.textContent) {
            // All three match - jackpot!
            const winAmount = bet * 10;
            localStorage.setItem('casinoBalance', (currentBalance + winAmount).toString());
            balanceElement.textContent = localStorage.getItem('casinoBalance');
            resultMessage.textContent = `JACKPOT! You won $${winAmount}!`;
        } else if (slot1.textContent === slot2.textContent || 
                  slot2.textContent === slot3.textContent || 
                  slot1.textContent === slot3.textContent) {
            // Two match
            const winAmount = bet * 2;
            localStorage.setItem('casinoBalance', (currentBalance + winAmount).toString());
            balanceElement.textContent = localStorage.getItem('casinoBalance');
            resultMessage.textContent = `You won $${winAmount}!`;
        } else {
            resultMessage.textContent = "No win this time. Try again!";
        }
    }
});
