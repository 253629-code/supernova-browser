// Browser History Management
class BrowserHistory {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
    }

    push(url) {
        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push(url);
        this.currentIndex++;
    }

    back() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    forward() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }

    canGoBack() {
        return this.currentIndex > 0;
    }

    canGoForward() {
        return this.currentIndex < this.history.length - 1;
    }
}

// Initialize browser history
const browserHistory = new BrowserHistory();

// DOM Elements
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const refreshBtn = document.getElementById('refreshBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const heroSearchInput = document.getElementById('heroSearchInput');
const heroSearchBtn = document.getElementById('heroSearchBtn');
const homePage = document.querySelector('.home-page');
const contentFrame = document.getElementById('contentFrame');
const iframeContainer = document.querySelector('.iframe-container');
const quickLinks = document.querySelectorAll('.quick-link');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateNavigationButtons();
});

// Navigation Functions
function navigateTo(url) {
    try {
        // Add protocol if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        // Check if it's a search query (no domain)
        if (!url.includes('.')) {
            url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
        }

        // Update UI
        homePage.style.display = 'none';
        iframeContainer.style.display = 'flex';
        contentFrame.src = url;
        searchInput.value = url;

        // Add to history
        browserHistory.push(url);
        updateNavigationButtons();
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

function goBack() {
    const url = browserHistory.back();
    if (url) {
        contentFrame.src = url;
        searchInput.value = url;
        updateNavigationButtons();
    }
}

function goForward() {
    const url = browserHistory.forward();
    if (url) {
        contentFrame.src = url;
        searchInput.value = url;
        updateNavigationButtons();
    }
}

function refresh() {
    contentFrame.src = contentFrame.src;
}

function goHome() {
    homePage.style.display = 'flex';
    iframeContainer.style.display = 'none';
    searchInput.value = '';
    updateNavigationButtons();
}

// Update Navigation Buttons State
function updateNavigationButtons() {
    backBtn.disabled = !browserHistory.canGoBack();
    forwardBtn.disabled = !browserHistory.canGoForward();
}

// Event Listeners - Navigation Buttons
backBtn.addEventListener('click', goBack);
forwardBtn.addEventListener('click', goForward);
refreshBtn.addEventListener('click', refresh);

// Event Listeners - Search Bar
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        navigateTo(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            navigateTo(query);
        }
    }
});

// Event Listeners - Hero Search
heroSearchBtn.addEventListener('click', () => {
    const query = heroSearchInput.value.trim();
    if (query) {
        navigateTo(query);
    }
});

heroSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = heroSearchInput.value.trim();
        if (query) {
            navigateTo(query);
        }
    }
});

// Event Listeners - Quick Links
quickLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('data-url');
        if (url) {
            navigateTo(url);
        }
    });
});

// Handle Supernova Logo Click (Go Home)
document.querySelector('.supernova-logo').addEventListener('click', () => {
    goHome();
    browserHistory.currentIndex = -1;
    browserHistory.history = [];
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + Left Arrow: Back
    if (e.altKey && e.key === 'ArrowLeft') {
        goBack();
    }
    // Alt + Right Arrow: Forward
    if (e.altKey && e.key === 'ArrowRight') {
        goForward();
    }
    // Ctrl/Cmd + R or F5: Refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refresh();
    }
    // Ctrl/Cmd + L: Focus Search Bar
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
});

// Log for debugging
console.log('Supernova Browser initialized successfully!');