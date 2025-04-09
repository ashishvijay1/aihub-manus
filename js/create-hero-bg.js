// Create a hero background image placeholder
function createHeroBackground() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#0f2027;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#203a43;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2c5364;stop-opacity:1" />
            </linearGradient>
            <pattern id="pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1" fill="rgba(255, 255, 255, 0.2)" />
            </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#grad)" />
        <rect width="1920" height="1080" fill="url(#pattern)" />
        
        <!-- Abstract shapes -->
        <circle cx="200" cy="200" r="100" fill="rgba(255, 255, 255, 0.05)" />
        <circle cx="1720" cy="880" r="150" fill="rgba(255, 255, 255, 0.05)" />
        <path d="M0,300 Q960,100 1920,300 V1080 H0 Z" fill="rgba(255, 255, 255, 0.02)" />
        <path d="M0,600 Q960,800 1920,600 V1080 H0 Z" fill="rgba(255, 255, 255, 0.03)" />
    </svg>`;
    
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(__dirname, '../images', 'hero-bg.svg');
    fs.writeFileSync(filePath, svg);
    
    console.log('Hero background created successfully');
}

// Execute the function
createHeroBackground();
