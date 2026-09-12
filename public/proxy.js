/**
 * Supernova Proxy Handler
 * Manages Ultraviolet proxy requests with Epoxy transport
 */

const PROXY_CONFIG = {
    API_ENDPOINT: '/api/proxy',
    HEALTH_CHECK: '/api/health',
    PREFIX: '/uv/',
    TIMEOUT: 10000
};

// Check proxy health
async function checkProxyHealth() {
    try {
        const response = await fetch(PROXY_CONFIG.HEALTH_CHECK);
        const data = await response.json();
        updateProxyStatus(data.status === 'online');
        return data.status === 'online';
    } catch (error) {
        console.error('Health check failed:', error);
        updateProxyStatus(false);
        return false;
    }
}

// Update proxy status UI
function updateProxyStatus(online) {
    const indicator = document.getElementById('statusIndicator');
    const text = document.getElementById('statusText');
    
    if (online) {
        indicator.classList.add('online');
        text.textContent = 'Proxy: Online';
    } else {
        indicator.classList.remove('online');
        text.textContent = 'Proxy: Offline';
    }
}

// Send URL to proxy API
async function sendProxyRequest(url) {
    try {
        // Show loading state
        const homePage = document.querySelector('.home-page');
        const iframeContainer = document.querySelector('.iframe-container');
        const contentFrame = document.getElementById('contentFrame');
        const searchInput = document.getElementById('searchInput');

        // Make request to proxy endpoint
        const response = await fetch(PROXY_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        if (!response.ok) {
            throw new Error(`Proxy error: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            // Navigate through Ultraviolet proxy
            const proxiedUrl = data.proxiedUrl;
            
            homePage.style.display = 'none';
            iframeContainer.style.display = 'flex';
            contentFrame.src = proxiedUrl;
            searchInput.value = url;

            // Add to history
            browserHistory.push(proxiedUrl);
            updateNavigationButtons();
        } else {
            alert('Proxy error: ' + data.error);
        }
    } catch (error) {
        console.error('Proxy request failed:', error);
        alert('Failed to load URL. Proxy may be unavailable.');
    }
}

// Initialize proxy on page load
document.addEventListener('DOMContentLoaded', () => {
    checkProxyHealth();
    // Check health every 30 seconds
    setInterval(checkProxyHealth, 30000);
    console.log('Proxy handler initialized');
});

// Export for use in other scripts
window.proxyApi = {
    sendRequest: sendProxyRequest,
    checkHealth: checkProxyHealth
};