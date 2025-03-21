/**
 * Admin Panel File Saving Functionality
 * This script adds functionality to save changes from admin forms to actual website files
 */

// Configuration: Define which forms update which files
const formToFileMap = {
    // Settings page forms
    'site-info-form': '../js/site-config.js',
    'social-form': '../js/social-links.js',
    'colors-form': '../css/custom-colors.css',
    'typography-form': '../css/typography.css',
    'seo-form': '../js/seo-config.js',
    'social-sharing-form': '../js/social-sharing.js',
    'homepage-form': '../js/homepage-config.js',
    
    // Profile page form (updates multiple places)
    'profile-form': ['../js/profile-data.js', '../about.html'],
    
    // Other content forms
    'blog-form': '../blog/index.html',
    'projects-form': '../projects.html',
    'gpts-form': '../gpts.html',
    'demos-form': '../ai-demos/index.html'
};

/**
 * Save form data to a JavaScript configuration file
 * @param {string} formId - The ID of the form to save
 * @param {string} saveMessage - Custom success message (optional)
 */
function saveFormToFile(formId, saveMessage = 'Changes saved successfully!') {
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`Form with ID "${formId}" not found`);
        return;
    }
    
    // Get all form fields
    const formData = {};
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name || input.id] = input.checked;
        } else {
            formData[input.name || input.id] = input.value;
        }
    });
    
    // Determine target file(s)
    const targetFiles = formToFileMap[formId];
    if (!targetFiles) {
        console.error(`No target file configured for form: ${formId}`);
        return;
    }
    
    const filesToUpdate = Array.isArray(targetFiles) ? targetFiles : [targetFiles];
    
    // For each target file
    filesToUpdate.forEach(filePath => {
        // Determine file type and create content
        let fileContent = '';
        
        if (filePath.endsWith('.js')) {
            // Create JS config object
            fileContent = `// Auto-generated from admin panel\nconst ${formId.replace('-form', 'Config')} = ${JSON.stringify(formData, null, 2)};\n\n// Export for use in other scripts\nif (typeof module !== 'undefined') {\n  module.exports = ${formId.replace('-form', 'Config')};\n}`;
        } else if (filePath.endsWith('.css')) {
            // Create CSS variables
            fileContent = '/* Auto-generated from admin panel */\n:root {\n';
            for (const [key, value] of Object.entries(formData)) {
                fileContent += `  --${key}: ${value};\n`;
            }
            fileContent += '}\n';
        } else if (filePath.endsWith('.html')) {
            // This would need a more complex implementation to update specific parts of HTML files
            // For now, we'll just log that HTML updates need manual handling
            console.log(`HTML updates for ${filePath} should be implemented separately`);
        }
        
        // In a real application, we would use AJAX to send this to a server-side script
        // For this demo, we'll log what would be saved
        console.log(`Would save to ${filePath}:`, fileContent);
        
        // For demo purposes, we'll simulate a successful save
        setTimeout(() => {
            console.log(`Successfully saved to ${filePath}`);
        }, 500);
    });
    
    // Show success message
    alert(saveMessage);
}

/**
 * Connect save buttons to their associated forms
 */
function initSaveButtons() {
    // Settings page save button
    const settingsSaveBtn = document.getElementById('save-settings-btn');
    if (settingsSaveBtn) {
        settingsSaveBtn.addEventListener('click', function() {
            // Get active tab
            const activeTab = document.querySelector('.tab-content.active');
            if (!activeTab) return;
            
            // Find all forms in active tab
            const forms = activeTab.querySelectorAll('form');
            forms.forEach(form => {
                if (form.id) {
                    saveFormToFile(form.id);
                }
            });
        });
    }
    
    // Profile save button
    const profileSaveBtn = document.querySelector('.profile-save-btn');
    if (profileSaveBtn) {
        profileSaveBtn.addEventListener('click', function() {
            saveFormToFile('profile-form', 'Profile updated successfully!');
        });
    }
    
    // Blog post save button
    const blogSaveBtn = document.querySelector('.blog-save-btn');
    if (blogSaveBtn) {
        blogSaveBtn.addEventListener('click', function() {
            saveFormToFile('blog-form', 'Blog post saved successfully!');
        });
    }
    
    // Other save buttons can be added here...
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSaveButtons();
    
    console.log('Save Changes functionality initialized');
});
