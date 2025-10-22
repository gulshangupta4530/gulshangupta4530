// API Configuration
const API_URL = 'http://localhost:5000/api';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadGames();
    loadLeaderboard();
    setupEventListeners();
    animateCounters();
});

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const stats = await response.json();

        animateCounter('activePlayersCount', stats.activePlayers);
        animateCounter('gamesCount', stats.totalGames);
        animateCounter('tournamentsCount', stats.tournaments);
    } catch (error) {
        console.error('Error loading stats:', error);
        // Fallback to demo data
        animateCounter('activePlayersCount', 15420);
        animateCounter('gamesCount', 87);
        animateCounter('tournamentsCount', 24);
    }
}

// Animate counter
function animateCounter(id, target) {
    const element = document.getElementById(id);
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target).toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

// Load games
async function loadGames() {
    try {
        const response = await fetch(`${API_URL}/games`);
        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error('Error loading games:', error);
        // Fallback to demo data
        const demoGames = [
            { id: 1, title: 'Cyber Warfare', category: 'action', players: '12.5K', rating: 4.8, icon: '🎮' },
            { id: 2, title: 'Kingdom Builder', category: 'strategy', players: '8.2K', rating: 4.6, icon: '🏰' },
            { id: 3, title: 'Dragon Quest', category: 'rpg', players: '15.1K', rating: 4.9, icon: '🐉' },
            { id: 4, title: 'Space Raiders', category: 'action', players: '10.3K', rating: 4.7, icon: '🚀' },
            { id: 5, title: 'Mystic Legends', category: 'rpg', players: '9.8K', rating: 4.5, icon: '⚔' },
            { id: 6, title: 'Battle Arena', category: 'action', players: '11.7K', rating: 4.8, icon: '⚡' }
        ];
        displayGames(demoGames);
    }
}

// Display games
function displayGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = `
            <div class="game-card" data-category="${game.category}">
                <div class="game-image">${game.icon}</div>
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <div class="game-category">${game.category.toUpperCase()}</div>
                    <div class="game-stats">
                        <span>👥 ${game.players}</span>
                        <span>⭐ ${game.rating}</span>
                    </div>
                    <div class="game-action">
                        <button class="btn-play" onclick="playGame(${game.id})">Play Now</button>
                    </div>
                </div>
            </div>
        `;
        gamesGrid.innerHTML += gameCard;
    });
}

// Load leaderboard
async function loadLeaderboard() {
    try {
        const response = await fetch(`${API_URL}/leaderboard`);
        const players = await response.json();
        displayLeaderboard(players);
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        // Fallback to demo data
        const demoPlayers = [
            { rank: 1, username: 'GULSHAN4530', score: 15420, wins: 234, level: 87, avatar: '👑' },
            { rank: 2, username: 'TUSHARBHONDU', score: 14890, wins: 221, level: 85, avatar: '🐲' },
            { rank: 3, username: 'JASSADON', score: 13750, wins: 198, level: 82, avatar: '🥷' },
            { rank: 4, username: 'VINEETKADOST', score: 12540, wins: 187, level: 79, avatar: '🔥' },
            { rank: 5, username: 'CHOCO', score: 11320, wins: 165, level: 76, avatar: '❄' }
           
        ];
        displayLeaderboard(demoPlayers);
    }
}

// Display leaderboard
function displayLeaderboard(players) {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';
    
    players.forEach(player => {
        let rankClass = '';
        if (player.rank === 1) rankClass = 'gold';
        else if (player.rank === 2) rankClass = 'silver';
        else if (player.rank === 3) rankClass = 'bronze';
        
        const row = `
            <tr>
                <td><span class="rank-badge ${rankClass}">${player.rank}</span></td>
                <td>
                    <div class="player-info">
                        <div class="player-avatar">${player.avatar}</div>
                        <span>${player.username}</span>
                    </div>
                </td>
                <td><strong>${player.score.toLocaleString()}</strong></td>
                <td>${player.wins}</td>
                <td>${player.level}</td>
            </tr>
        `;
        leaderboardBody.innerHTML += row;
    });
}

// Setup event listeners
function setupEventListeners() {
    // Category filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGames(btn.dataset.category);
        });
    });
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const target = link.getAttribute('href');
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

// Filter games by category
function filterGames(category) {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
}

function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            alert(data.message);
            closeLoginModal();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed due to network error');
    }
}

// Handle signup
async function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('signup.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            closeSignupModal();
            openLoginModal();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed due to network error');
    }
}

// Play game
function playGame(gameId) {
    alert(`Launching game ${gameId}! (This would redirect to the game)`);
}

// Scroll to games
function scrollToGames() {
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
}