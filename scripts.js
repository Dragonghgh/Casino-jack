// Initialize balance if not set
if (!localStorage.getItem('casinoBalance')) {
    localStorage.setItem('casinoBalance', '1000');
}

// Update balance display on lobby page
if (document.getElementById('balance')) {
    document.getElementById('balance').textContent = localStorage.getItem('casinoBalance');
}

// Welcome page button
if (document.getElementById('enterBtn')) {
    document.getElementById('enterBtn').addEventListener('click', function() {
        window.location.href = 'casino.html';
    });
}
