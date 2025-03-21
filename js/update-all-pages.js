// This script updates the head section of all HTML files with new CSS and JS references
// It's meant to be run using a Node.js environment

const fs = require('fs');
const path = require('path');

// CSS and JS additions for main pages
const mainCSSAdditions = `
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- CSS Files -->`;

const mainJSAdditions = `
    <!-- JavaScript Files -->`;

const newMainJS = `
    <script src="js/main.js" defer></script>
    <script src="js/animations.js" defer></script>`;

const newSubpageJS = `
    <script src="../js/main.js" defer></script>
    <script src="../js/animations.js" defer></script>`;

// CSS additions for subpages
const subpageCSSAdditions = `
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- CSS Files -->`;

// List of main HTML files
const mainPages = [
    'about.html',
    'contact.html',
    'projects.html'
];

// Directories with subpages
const subpageDirs = [
    'ai-demos',
    'blog'
];

// Function to update main pages
function updateMainPages() {
    mainPages.forEach(page => {
        const filePath = path.join(__dirname, '..', page);
        
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Update CSS references
            content = content.replace(
                '<link rel="stylesheet" href="css/style.css">',
                `${mainCSSAdditions}
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/modern.css">
    <link rel="stylesheet" href="css/animations.css">`
            );
            
            // Update JS references
            content = content.replace(
                '<script src="js/main.js" defer></script>',
                `${mainJSAdditions}${newMainJS}`
            );
            
            // Add scroll to top button
            content = content.replace(
                '</footer>',
                `</footer>
    
    <!-- Scroll to top button -->
    <a href="#" class="scroll-top" id="scroll-top" aria-label="Scroll to top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    </a>`
            );
            
            // Update LinkedIn icon URL
            content = content.replace(
                /src="https:\/\/cdn\.simpleicons\.org\/linkedin"/g,
                'src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"'
            );
            
            // Add section heading to any h2 that's followed by a grid
            content = content.replace(
                /(<h2>.*?<\/h2>)\s*<div class="(.*?-grid)/g,
                '<div class="section-heading">$1</div>\n                <div class="$2'
            );
            
            // Add hover-float class to cards
            content = content.replace(
                /class="card"/g,
                'class="card hover-float"'
            );
            
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${page}`);
        }
    });
}

// Function to update subpages
function updateSubpages() {
    subpageDirs.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            
            files.forEach(file => {
                if (file.endsWith('.html')) {
                    const filePath = path.join(dirPath, file);
                    let content = fs.readFileSync(filePath, 'utf8');
                    
                    // Update CSS references
                    content = content.replace(
                        '<link rel="stylesheet" href="../css/style.css">',
                        `${subpageCSSAdditions}
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <link rel="stylesheet" href="../css/modern.css">
    <link rel="stylesheet" href="../css/animations.css">`
                    );
                    
                    // Update JS references
                    content = content.replace(
                        '<script src="../js/main.js" defer></script>',
                        `${mainJSAdditions}${newSubpageJS}`
                    );
                    
                    // Add scroll to top button
                    content = content.replace(
                        '</footer>',
                        `</footer>
    
    <!-- Scroll to top button -->
    <a href="#" class="scroll-top" id="scroll-top" aria-label="Scroll to top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    </a>`
                    );
                    
                    // Update LinkedIn icon URL
                    content = content.replace(
                        /src="https:\/\/cdn\.simpleicons\.org\/linkedin"/g,
                        'src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"'
                    );
                    
                    // Add section heading to any h2 that's followed by a grid
                    content = content.replace(
                        /(<h2>.*?<\/h2>)\s*<div class="(.*?-grid)/g,
                        '<div class="section-heading">$1</div>\n                <div class="$2'
                    );
                    
                    // Add hover-float class to cards
                    content = content.replace(
                        /class="(blog-card|demo-card|project-card)"/g,
                        'class="$1 hover-float"'
                    );
                    
                    fs.writeFileSync(filePath, content);
                    console.log(`Updated ${dir}/${file}`);
                }
            });
        }
    });
}

// Run the updates
updateMainPages();
updateSubpages();

console.log('All pages updated with new CSS and JS references!');
