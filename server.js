/**
 * Supernova Browser Server
 * Integrates Express with Ultraviolet proxy using Epoxy transport
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { createServer as createSecureServer } from 'https';
import fs from 'fs';
import ultraviolet from '@titanium/ultraviolet';
import { EpoxyTransport } from '@mercuryworkshop/epoxy-transport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Epoxy Transport
const epoxyTransport = new EpoxyTransport();

// Ultraviolet Configuration
const uvConfig = {
  prefix: '/uv/',
  bare: '/bare/',
  encodeUrl: true,
  encodeIframeUrl: false,
  handler: '/uv/handler.js',
  bundle: '/uv/uv.bundle.js',
  config: '/uv/config.js',
  sw: '/uv/sw.js',
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    proxy: 'ultraviolet',
    transport: 'epoxy',
    timestamp: new Date().toISOString()
  });
});

// Proxy a URL
app.post('/api/proxy', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Encode URL for Ultraviolet
    const encodedUrl = encodeURIComponent(url);
    const proxiedUrl = `${uvConfig.prefix}?url=${encodedUrl}`;

    res.json({
      success: true,
      originalUrl: url,
      proxiedUrl: proxiedUrl,
      fullUrl: `http://${HOST}:${PORT}${proxiedUrl}`
    });
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

// Get proxy info
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Supernova Browser',
    version: '2.0.0',
    proxy: 'Ultraviolet v2',
    transport: 'Epoxy',
    features: [
      'Service Worker based proxy',
      'End-to-end encryption with Epoxy TLS',
      'CORS handling',
      'URL encoding/decoding',
      'Cookie management',
      'Header manipulation'
    ],
    endpoints: {
      health: '/api/health',
      proxy: '/api/proxy (POST)',
      info: '/api/info',
      browser: '/'
    }
  });
});

// Ultraviolet routes
app.use(uvConfig.prefix, (req, res, next) => {
  try {
    ultraviolet(req, res, next);
  } catch (error) {
    console.error('Ultraviolet error:', error);
    res.status(500).send('Proxy error');
  }
});

// Bare server route
app.use(uvConfig.bare, (req, res) => {
  res.status(501).json({ error: 'Bare transport not configured in this version' });
});

// Serve Ultraviolet assets
app.get('/uv/:file', (req, res) => {
  const file = req.params.file;
  const assetPath = path.join(__dirname, 'node_modules/@titanium/ultraviolet', file);
  
  if (fs.existsSync(assetPath)) {
    res.sendFile(assetPath);
  } else {
    res.status(404).send('Asset not found');
  }
});

// Root route - serve browser
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Create and start server
const server = createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`
╔════════════════════════════════════════╗`);
  console.log(`║   ✨ Supernova Browser Server ✨      ║`);
  console.log(`╚════════════════════════════════════════╝`);
  console.log(`
🌐 Server started successfully!`);
  console.log(`📍 URL: http://${HOST}:${PORT}`);
  console.log(`🛡️  Proxy: Ultraviolet v2`);
  console.log(`🔐 Transport: Epoxy (End-to-End Encryption)`);
  console.log(`
📚 API Endpoints:`);
  console.log(`   GET  /api/health  - Check server status`);
  console.log(`   POST /api/proxy   - Proxy a URL`);
  console.log(`   GET  /api/info    - Server information`);
  console.log(`
`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;