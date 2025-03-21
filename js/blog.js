// Blog specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Calculate and display reading time for blog articles
    const calculateReadingTime = () => {
        const articleBody = document.querySelector('.article-body');
        const readingTimeDisplay = document.querySelector('.reading-time');
        
        if (articleBody && readingTimeDisplay) {
            // Get all text from the article body
            const text = articleBody.textContent;
            // Average reading speed: 225 words per minute
            const wordsPerMinute = 225;
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / wordsPerMinute);
            
            readingTimeDisplay.textContent = `${readingTime} min read`;
        }
    };
    
    calculateReadingTime();
    
    // Handle comment form submission
    const commentForm = document.querySelector('.comment-form form');
    const commentsList = document.querySelector('.comments-list');
    
    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('comment-name').value;
            const email = document.getElementById('comment-email').value;
            const commentText = document.getElementById('comment-text').value;
            
            // Simple validation
            if (!name.trim() || !email.trim() || !commentText.trim()) {
                return;
            }
            
            // In a real implementation, this would send the comment data to a server
            // For this demo, we'll just add the comment to the page
            
            // Create new comment element
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            // Get current date
            const now = new Date();
            const formattedDate = `${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()}`;
            
            // Add comment HTML
            commentElement.innerHTML = `
                <div class="comment-header">
                    <h4>${name}</h4>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-body">
                    <p>${commentText}</p>
                </div>
            `;
            
            // Replace "No comments" message if it exists
            if (commentsList.textContent.includes('No comments yet')) {
                commentsList.innerHTML = '';
            }
            
            // Add comment to list
            commentsList.appendChild(commentElement);
            
            // Reset form
            commentForm.reset();
        });
    }
    
    // Handle newsletter subscription form
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                emailInput.classList.add('error');
                return;
            }
            
            // In a real implementation, this would send the subscription data to a server
            // For this demo, we'll just show a success message
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thanks for subscribing!';
            
            subscribeForm.innerHTML = '';
            subscribeForm.appendChild(successMessage);
        });
    }
    
    // Handle social sharing buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    
    if (shareButtons.length) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.textContent.trim().toLowerCase();
                const articleUrl = encodeURIComponent(window.location.href);
                const articleTitle = encodeURIComponent(document.title);
                
                let shareUrl;
                
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${articleTitle}&body=Check out this article: ${articleUrl}`;
                        break;
                    default:
                        return;
                }
                
                // Open share dialog
                window.open(shareUrl, 'share-dialog', 'width=600,height=400');
            });
        });
    }
});
