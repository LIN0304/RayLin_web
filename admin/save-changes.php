<?php
/**
 * Admin Save Changes Handler
 * 
 * This script receives data from the admin forms and saves it to the appropriate files.
 * IMPORTANT: This script requires proper server-side security measures in a production environment.
 */

// Basic security check - this is NOT sufficient for production
// You should implement proper authentication and CSRF protection
session_start();
if (!isset($_SESSION['isLoggedIn']) || $_SESSION['isLoggedIn'] !== true) {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit;
}

// Get the request data
$requestData = json_decode(file_get_contents('php://input'), true);

if (!$requestData || !isset($requestData['formId']) || !isset($requestData['formData'])) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['success' => false, 'message' => 'Invalid request data']);
    exit;
}

$formId = $requestData['formId'];
$formData = $requestData['formData'];
$targetPath = isset($requestData['targetPath']) ? $requestData['targetPath'] : null;

// Define mapping of forms to files
$formToFileMap = [
    // Settings page forms
    'site-info-form' => '../js/site-config.js',
    'social-form' => '../js/social-links.js',
    'colors-form' => '../css/custom-colors.css',
    'typography-form' => '../css/typography.css',
    'seo-form' => '../js/seo-config.js',
    'social-sharing-form' => '../js/social-sharing.js',
    'homepage-form' => '../js/homepage-config.js',
    
    // Profile page form
    'profile-form' => '../js/profile-data.js',
    
    // Other content forms
    'blog-form' => '../blog/index.html',
    'projects-form' => '../projects.html',
    'gpts-form' => '../gpts.html',
    'demos-form' => '../ai-demos/index.html'
];

// If a specific target path is provided, use it instead of the mapping
$filePath = $targetPath ?? ($formToFileMap[$formId] ?? null);

if (!$filePath) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['success' => false, 'message' => "No target file defined for form: $formId"]);
    exit;
}

// Make sure the target directory exists
$directory = dirname($filePath);
if (!file_exists($directory)) {
    mkdir($directory, 0755, true);
}

// Generate file content based on file type
$fileContent = '';
$fileExtension = pathinfo($filePath, PATHINFO_EXTENSION);

switch ($fileExtension) {
    case 'js':
        // Create JS config object
        $jsonData = json_encode($formData, JSON_PRETTY_PRINT);
        $configVarName = str_replace('-form', 'Config', $formId);
        $fileContent = "// Auto-generated from admin panel\nconst $configVarName = $jsonData;\n\n// Export for use in other scripts\nif (typeof module !== 'undefined') {\n  module.exports = $configVarName;\n}";
        break;
        
    case 'css':
        // Create CSS variables
        $fileContent = "/* Auto-generated from admin panel */\n:root {\n";
        foreach ($formData as $key => $value) {
            $fileContent .= "  --$key: $value;\n";
        }
        $fileContent .= "}\n";
        break;
        
    case 'html':
        // For HTML files, we need to handle more carefully
        // This is a simple approach that replaces specific sections
        if (file_exists($filePath)) {
            $currentContent = file_get_contents($filePath);
            
            // Identify and replace content sections
            // This assumes HTML files have specially marked sections for dynamic content
            foreach ($formData as $sectionId => $newContent) {
                $pattern = "/<!-- BEGIN $sectionId -->.*?<!-- END $sectionId -->/s";
                $replacement = "<!-- BEGIN $sectionId -->$newContent<!-- END $sectionId -->";
                $currentContent = preg_replace($pattern, $replacement, $currentContent);
            }
            
            $fileContent = $currentContent;
        } else {
            // If file doesn't exist yet, create a basic HTML structure
            $fileContent = "<!DOCTYPE html>\n<html>\n<head>\n  <title>{$formData['title'] ?? 'Page Title'}</title>\n</head>\n<body>\n";
            
            foreach ($formData as $sectionId => $content) {
                $fileContent .= "<!-- BEGIN $sectionId -->$content<!-- END $sectionId -->\n";
            }
            
            $fileContent .= "</body>\n</html>";
        }
        break;
        
    case 'json':
        // Create JSON file
        $fileContent = json_encode($formData, JSON_PRETTY_PRINT);
        break;
        
    default:
        // For other file types, just save the raw content if provided
        $fileContent = $formData['content'] ?? json_encode($formData);
}

// Write to file
if (file_put_contents($filePath, $fileContent)) {
    echo json_encode(['success' => true, 'message' => 'Changes saved successfully']);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'message' => "Failed to write to file: $filePath"]);
}
