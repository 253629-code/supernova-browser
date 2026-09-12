# ⭐ Supernova Browser v2.0

A modern web browser with **Ultraviolet proxy** backend and **Epoxy transport** for secure, encrypted web browsing.

## 🌟 Features

### 🛡️ Security
- **Ultraviolet Proxy** - Service Worker-based web proxy
- **Epoxy Transport** - End-to-end encryption with TLS
- **Epoxy TLS** - Encrypted tunnel for all traffic
- CORS handling and header manipulation
- Cookie management through proxy

### 🎨 User Interface
- **Sleek Design** - Grey background with animated white particles
- **Navigation Controls** - Back, Forward, and Refresh buttons
- **Smart Search** - URL bar with query support
- **Quick Links** - Fast access to popular websites
- **Proxy Status** - Real-time proxy health indicator

### ⌨️ Keyboard Shortcuts
- `Alt + ←` - Back
- `Alt + →` - Forward
- `Ctrl/Cmd + R` or `F5` - Refresh
- `Ctrl/Cmd + L` - Focus search bar
- `Enter` - Search/Navigate

## 📦 Technology Stack

### Backend
- **Node.js + Express** - Web server
- **Ultraviolet v2** - Proxy engine
- **Epoxy Transport** - Encrypted transport layer
- **Epoxy TLS** - End-to-end encryption

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with animations
- **Vanilla JavaScript** - No dependencies
- **Particle System** - Animated background effects

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/253629-code/supernova-browser.git
cd supernova-browser

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm start
```

The browser will be available at `http://localhost:3000`

### Development Mode

```bash
npm run dev
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns proxy status and server information.

### Proxy URL
```
POST /api/proxy
Content-Type: application/json

{
  "url": "https://example.com"
}
```

Returns proxied URL that can be used in iframe.

### Server Info
```
GET /api/info
```
Returns server configuration and available endpoints.

## 🔧 Configuration

Edit `.env` file to customize:

```env
PORT=3000              # Server port
HOST=localhost         # Server host
NODE_ENV=development   # Environment
ULTRAVIOLET_PREFIX=/uv/ # Proxy prefix
EPOXY_ENABLED=true     # Enable Epoxy transport
```

## 📁 File Structure

```
supernova-browser/
├── server.js           # Express server with Ultraviolet
├── package.json        # Dependencies
├── .env.example        # Environment template
├── public/
│   ├── index.html      # Main browser UI
│   ├── styles.css      # UI styling
│   ├── browser.js      # Navigation logic
│   ├── proxy.js        # Proxy integration
│   ├── particles.js    # Particle effects
│   └── 404.html        # 404 page
└── README.md           # This file
```

## 🌐 How It Works

1. **User Input** - User enters URL in search bar
2. **Proxy Request** - Browser sends URL to `/api/proxy` endpoint
3. **Ultraviolet Processing** - Ultraviolet proxy encodes the URL
4. **Epoxy Encryption** - Request is encrypted with Epoxy TLS
5. **Content Delivery** - Proxied content loads in iframe
6. **Response Handling** - Response is decrypted and displayed

## 🔒 Security Features

- **End-to-End Encryption** - All traffic encrypted with Epoxy TLS
- **Service Worker Proxy** - Request interception at service worker level
- **Header Manipulation** - CORS and security headers handled
- **Cookie Management** - Secure cookie handling through proxy
- **Sandboxed Iframe** - Content runs in isolated sandbox

## 📊 Proxy Architecture

```
┌─────────────────────┐
│  Browser (Client)   │
└──────────┬──────────┘
           │
     [User Input]
           │
           ↓
┌─────────────────────┐
│  Supernova UI       │
└──────────┬──────────┘
           │
     [/api/proxy]
           │
           ↓
┌─────────────────────┐
│  Express Server     │
└──────────┬──────────┘
           │
     [Ultraviolet]
           │
           ↓
┌─────────────────────┐
│  Epoxy Transport    │
│  (Encrypted Tunnel) │
└──────────┬──────────┘
           │
     [Epoxy TLS]
           │
           ↓
┌─────────────────────┐
│  Target Website     │
└─────────────────────┘
```

## ⚙️ Customization

### Change Particle Count
Edit `public/particles.js`:
```javascript
this.particleCount = 50; // Adjust this value
```

### Add Quick Links
Edit `public/index.html`:
```html
<a href="#" class="quick-link" data-url="https://example.com">Example</a>
```

### Modify Colors
Edit `public/styles.css`:
```css
body {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

## 🐛 Troubleshooting

### Proxy Shows Offline
1. Check if server is running (`npm start`)
2. Verify port 3000 is available
3. Check browser console for errors
4. Try refreshing the page

### URLs Not Loading
1. Ensure URL is valid and accessible
2. Check proxy health endpoint
3. Verify Ultraviolet is initialized
4. Check network tab for blocked requests

### CORS Issues
1. CORS is enabled by default
2. Check `server.js` for CORS configuration
3. Verify origin is allowed

## 📝 License

MIT License - Free to use and modify

## 🙏 Credits

- **Ultraviolet** - [titaniumnetwork-dev/Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet)
- **Epoxy Transport** - [MercuryWorkshop/epoxy-transport](https://github.com/MercuryWorkshop/epoxy-transport)
- **Epoxy TLS** - [MercuryWorkshop/epoxy-tls](https://github.com/MercuryWorkshop/epoxy-tls)

## 🚀 Future Enhancements

- [ ] Tab support
- [ ] Bookmarks functionality
- [ ] History panel
- [ ] Extensions support
- [ ] Dark/Light theme toggle
- [ ] Developer tools integration
- [ ] Cache management
- [ ] Session persistence
- [ ] Custom DNS over HTTPS

---

**Made with ⭐ by @253629-code**

*Your gateway to uncensored, secure web browsing.*