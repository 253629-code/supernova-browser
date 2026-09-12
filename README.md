# ✦ Supernova Browser

A custom, modern web browser with sleek design featuring animated particle effects and full navigation capabilities.

## Features

✨ **Modern Design**
- Grey background with gradient
- White animated particles in the background
- Clean, minimalist interface
- Smooth animations and transitions

🧭 **Navigation Controls**
- Back button (Alt + Left Arrow)
- Forward button (Alt + Right Arrow)
- Refresh button (Ctrl/Cmd + R or F5)
- Search bar with URL/search query support

🔍 **Search Functionality**
- Search any website or query
- Auto-complete protocol (http/https)
- Quick links to popular websites
- Home page with large search box

⌨️ **Keyboard Shortcuts**
- `Alt + ←` : Back
- `Alt + →` : Forward
- `Ctrl/Cmd + R` or `F5` : Refresh
- `Ctrl/Cmd + L` : Focus search bar
- `Enter` : Search

🎨 **Customizable**
- Easily modify colors in `styles.css`
- Adjust particle count in `particles.js`
- Extend browser functionality in `browser.js`

## File Structure

```
.
├── index.html        # Main HTML structure
├── styles.css        # Styling and animations
├── browser.js        # Browser logic and navigation
├── particles.js      # Particle system and effects
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with gradients, animations, and backdrop filters
- **Vanilla JavaScript** - No dependencies, pure ES6+ implementation
- **Canvas/DOM** - Particle rendering using DOM elements

## Getting Started

### Option 1: Direct Browser
1. Clone the repository
2. Open `index.html` in your web browser
3. Start browsing!

### Option 2: Local Server
```bash
npm install
npm start
```

### Option 3: Live Development
```bash
npm run dev
```

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Particle system uses requestAnimationFrame for smooth 60fps animation
- Efficiently manages DOM elements
- Responsive design adapts to all screen sizes
- Lightweight with no external dependencies

## Customization

### Change Particle Count
Edit `particles.js`, line 15:
```javascript
this.particleCount = 50; // Adjust this value
```

### Modify Colors
Edit `styles.css`:
- Background: Lines 24-26
- Particle color: Line 35
- Text color: Adjust throughout

### Add Quick Links
Edit `index.html`, section with `quick-links`:
```html
<a href="#" class="quick-link" data-url="https://example.com">Example</a>
```

## Future Enhancements

- [ ] Tab support
- [ ] Bookmark functionality
- [ ] History panel
- [ ] Extensions support
- [ ] Dark/Light theme toggle
- [ ] Developer tools
- [ ] Cache management

## License

MIT License - Feel free to use and modify!

## Author

Created by @253629-code

---

**Made with ✦ Supernova**