// Game Tab Switching
function openGame(gameId) {
    // Hide all game content
    const gameContents = document.querySelectorAll('.game-content');
    gameContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const gameTabs = document.querySelectorAll('.game-tab');
    gameTabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected game content and activate tab
    document.getElementById(gameId).classList.add('active');
    document.querySelector(`[onclick="openGame('${gameId}')"]`).classList.add('active');
}

// Breathing Exercise Game
let isBreathing = false;
let breathingInterval;
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');

function toggleBreathing() {
    isBreathing = !isBreathing;
    if (isBreathing) {
        startBreathing();
    } else {
        stopBreathing();
    }
}

function startBreathing() {
    let phase = 'inhale';
    updateBreathingText(phase);
    breathingInterval = setInterval(() => {
        phase = phase === 'inhale' ? 'hold' : phase === 'hold' ? 'exhale' : 'inhale';
        updateBreathingText(phase);
    }, 4000); // Change phase every 4 seconds
}

function stopBreathing() {
    clearInterval(breathingInterval);
    breathText.textContent = 'Breathe...';
}

function updateBreathingText(phase) {
    breathText.textContent = phase === 'inhale' ? 'Inhale...' : phase === 'hold' ? 'Hold...' : 'Exhale...';
}

function changeBreathingSpeed(direction) {
    const circle = document.querySelector('.breathing-circle');
    const currentDuration = parseFloat(getComputedStyle(circle).animationDuration);
    const newDuration = direction === 'slower' ? currentDuration + 2 : Math.max(4, currentDuration - 2);
    circle.style.animationDuration = `${newDuration}s`;
}

// Memory Game
const symbols = ['🧘', '😌', '💚', '🎮', '🌟', '🍃', '🌸', '☮️'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    matchedPairs = 0;
    document.getElementById('memory-score').textContent = 'Matches: 0/8';
    
    // Create card deck
    cards = [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map((symbol, index) => ({
            id: index,
            symbol: symbol,
            isFlipped: false,
            isMatched: false
        }));
    
    // Generate board
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.id = card.id;
        cardElement.onclick = () => flipCard(card.id);
        board.appendChild(cardElement);
    });
}

function flipCard(cardId) {
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;
    
    // Flip card
    card.isFlipped = true;
    const cardElement = document.querySelector(`[data-id="${cardId}"]`);
    cardElement.textContent = card.symbol;
    cardElement.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        // Check for match
        if (flippedCards[0].symbol === flippedCards[1].symbol) {
            flippedCards.forEach(c => c.isMatched = true);
            matchedPairs++;
            document.getElementById('memory-score').textContent = `Matches: ${matchedPairs}/8`;
            
            if (matchedPairs === 8) {
                setTimeout(() => alert('Congratulations! You completed the memory game!'), 500);
            }
        } else {
            // Flip cards back
            setTimeout(() => {
                flippedCards.forEach(c => {
                    c.isFlipped = false;
                    const el = document.querySelector(`[data-id="${c.id}"]`);
                    el.textContent = '';
                    el.classList.remove('flipped');
                });
            }, 1000);
        }
        flippedCards = [];
    }
}

// Relaxation Scene
const relaxationMessages = [
    "Breathe in peace, exhale tension...",
    "Feel your body becoming lighter...",
    "Let go of any worries or stress...",
    "You are safe and supported...",
    "Each breath brings more calm...",
    "Notice the peaceful sensations..."
];

let relaxationInterval;

function startRelaxation() {
    let messageIndex = 0;
    const messageElement = document.getElementById('relaxation-message');
    
    clearInterval(relaxationInterval);
    relaxationInterval = setInterval(() => {
        messageElement.textContent = relaxationMessages[messageIndex];
        messageIndex = (messageIndex + 1) % relaxationMessages.length;
    }, 5000);
}

function changeMood(scene) {
    const sceneElement = document.querySelector('.peaceful-scene');
    sceneElement.className = `peaceful-scene ${scene}`;
    
    // You would need to add appropriate background images and sounds
    // for each scene in your CSS and audio files
}

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Blog Functionality
function filterBlogPosts(category) {
    const blogCards = document.querySelectorAll('.blog-card');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Update active category button
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category)) {
            btn.classList.add('active');
        }
    });
    
    // Filter blog posts
    blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            // Add animation
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
}

// Blog Pagination
let currentPage = 1;
const postsPerPage = 4;
const totalPages = 3;

function changePage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    // Update active page number
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(num => {
        num.classList.remove('active');
        if (parseInt(num.textContent) === currentPage) {
            num.classList.add('active');
        }
    });
    
    // In a real application, you would fetch posts for the current page here
    // For now, we'll just simulate the page change
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        const shouldShow = Math.floor(index / postsPerPage) + 1 === currentPage;
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// Newsletter Subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // In a real application, you would send this to your server
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    this.reset();
});

// Blog Post Click Handler
document.querySelectorAll('.blog-read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const blogTitle = this.closest('.blog-card').querySelector('.blog-title').textContent;
        
        // In a real application, you would navigate to the full blog post
        alert(`Opening full article: ${blogTitle}`);
    });
});

// Initialize blog functionality when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing game functionality
    startMemoryGame();
    openGame('breathing-game');
    
    // Initialize blog
    filterBlogPosts('all');
    changePage(1);
});
