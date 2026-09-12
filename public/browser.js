/**
 * Supernova Browser - Main Logic
 * Handles navigation, history, and URL management
 */

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
const logo = document.querySelector('.supernova-logo');

// Navigation Functions
function navigateTo(url) {
    try {
        // Validate and format URL
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (!url.includes('.')) {
                url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
            } else {
                url = 'https://' + url;
            }
        }

        // Use proxy endpoint
        proxyUrl(url);
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

function proxyUrl(url) {
    // This will be handled by proxy.js
    sendProxyRequest(url);
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
    browserHistory.history = [];
    browserHistory.currentIndex = -1;
}

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

// Logo click - Go home
logo.addEventListener('click', goHome);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
    }
    if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refresh();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateNavigationButtons();
    console.log('Supernova Browser initialized');
});