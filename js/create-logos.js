// Create placeholder logo SVGs for the integration features

// Function to create SVG placeholder logos
function createPlaceholderLogos() {
    const logos = [
        { name: 'n8n', color: '#FF6B6B' },
        { name: 'copilot', color: '#4ECDC4' },
        { name: 'openai', color: '#556270' },
        { name: 'claude', color: '#7D70BA' },
        { name: 'airtable', color: '#5DA399' },
        { name: 'sheets', color: '#4CAF50' },
        { name: 'telegram', color: '#2196F3' },
        { name: 'zapier', color: '#FF9800' },
        { name: 'supabase', color: '#3ECF8E' },
        { name: 'lovable', color: '#E91E63' },
        { name: 'placeholder', color: '#607D8B' }
    ];
    
    logos.forEach(logo => {
        const svg = createLogoSVG(logo.name, logo.color);
        saveSVG(logo.name + '-logo.svg', svg);
    });
    
    console.log('Placeholder logos created successfully');
}

// Function to create a simple SVG logo
function createLogoSVG(name, color) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="${color}" rx="20" ry="20" />
        <text x="100" y="115" font-family="Arial" font-size="24" fill="white" text-anchor="middle">${name.toUpperCase()}</text>
    </svg>`;
    
    return svg;
}

// Function to save SVG to file
function saveSVG(filename, content) {
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(__dirname, '../images', filename);
    fs.writeFileSync(filePath, content);
}

// Execute the function
createPlaceholderLogos();
