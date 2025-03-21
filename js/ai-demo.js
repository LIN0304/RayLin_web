// AI Demo specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Handle the chat interface for the AI Assistant demo
    const setupChatInterface = () => {
        const chatForm = document.getElementById('chat-form');
        const userInput = document.getElementById('user-input');
        const chatMessages = document.getElementById('chat-messages');
        
        if (chatForm && userInput && chatMessages) {
            // Sample responses for the demo
            const sampleResponses = [
                "I'm an AI assistant simulation. In a real implementation, I would be powered by a sophisticated language model.",
                "That's an interesting question! If this were a real AI, I would provide a detailed answer based on my training data.",
                "I can simulate responding to your questions, but in a fully implemented version, I would have more capabilities.",
                "A complete AI assistant could help with tasks like answering questions, generating content, and providing recommendations.",
                "This is just a demonstration of what the interface might look like. A real AI would process and understand your query.",
                "Great question! In a complete implementation, I would analyze your input and generate a relevant response."
            ];
            
            // Handle form submission (sending a message)
            chatForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const messageText = userInput.value.trim();
                
                // Don't do anything if the input is empty
                if (!messageText) {
                    return;
                }
                
                // Add user message to the chat
                addMessage('user', messageText);
                
                // Clear input field
                userInput.value = '';
                
                // Simulate AI thinking with a typing indicator
                addTypingIndicator();
                
                // Simulate AI response after a short delay
                setTimeout(() => {
                    // Remove typing indicator
                    const typingIndicator = document.querySelector('.typing-indicator');
                    if (typingIndicator) {
                        typingIndicator.remove();
                    }
                    
                    // Select a random response from the sample responses
                    const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
                    
                    // Add AI response to the chat
                    addMessage('bot', randomResponse);
                    
                    // Scroll to the bottom of the chat
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1500);
                
                // Scroll to the bottom of the chat
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
            
            // Function to add a message to the chat
            function addMessage(sender, text) {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${sender}`;
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                
                const messageParagraph = document.createElement('p');
                messageParagraph.textContent = text;
                
                messageContent.appendChild(messageParagraph);
                messageElement.appendChild(messageContent);
                chatMessages.appendChild(messageElement);
            }
            
            // Function to add a typing indicator
            function addTypingIndicator() {
                const typingElement = document.createElement('div');
                typingElement.className = 'message bot typing-indicator';
                
                const typingContent = document.createElement('div');
                typingContent.className = 'message-content';
                
                typingContent.innerHTML = '<div class="dots"><span></span><span></span><span></span></div>';
                
                typingElement.appendChild(typingContent);
                chatMessages.appendChild(typingElement);
            }
        }
    };
    
    setupChatInterface();
    
    // Add CSS for typing indicator
    const addTypingIndicatorStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .typing-indicator .dots {
                display: flex;
                gap: 4px;
            }
            
            .typing-indicator .dots span {
                width: 8px;
                height: 8px;
                background-color: var(--medium-gray);
                border-radius: 50%;
                opacity: 0.6;
                animation: typingAnimation 1.4s infinite ease-in-out;
            }
            
            .typing-indicator .dots span:nth-child(1) {
                animation-delay: 0s;
            }
            
            .typing-indicator .dots span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-indicator .dots span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes typingAnimation {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-5px);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addTypingIndicatorStyles();
});
