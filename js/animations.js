// Animations JavaScript for Ray Lin's Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize staggered animations
    initializeStaggeredAnimations();
    
    // Initialize counters
    initializeCounters();
    
    // Initialize parallax effects
    initializeParallax();
    
    // Initialize type animations
    initializeTypeAnimation();
});

// Function to initialize scroll animations
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
    
    const revealOnScroll = function() {
        for (let i = 0; i < revealElements.length; i++) {
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150; // Adjust this value to change when the element becomes visible
            
            if (elementTop < window.innerHeight - elementVisible) {
                revealElements[i].classList.add('active');
            } else {
                // Only reset the animation if the element has the 'reset-animation' class
                if (revealElements[i].classList.contains('reset-animation')) {
                    revealElements[i].classList.remove('active');
                }
            }
        }
    };
    
    // Add the scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Call the function once to check for elements already in view on page load
    revealOnScroll();
}

// Function to initialize staggered animations for lists
function initializeStaggeredAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        const staggerOnScroll = function() {
            const containerTop = container.getBoundingClientRect().top;
            const containerVisible = 150;
            
            if (containerTop < window.innerHeight - containerVisible) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 * index); // 100ms delay between each item
                });
            }
        };
        
        // Add the scroll event listener for this container
        window.addEventListener('scroll', staggerOnScroll);
        
        // Call the function once to check if the container is already in view
        staggerOnScroll();
    });
}

// Function to initialize counters
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration') || 2000); // Default 2 seconds
        const delay = parseInt(counter.getAttribute('data-delay') || 0); // Default no delay
        
        const counterOnScroll = function() {
            const counterTop = counter.getBoundingClientRect().top;
            const counterVisible = 150;
            
            if (counterTop < window.innerHeight - counterVisible) {
                setTimeout(() => {
                    const increment = target / (duration / 16); // 16ms is roughly one frame at 60fps
                    let current = 0;
                    
                    const updateCounter = setInterval(() => {
                        current += increment;
                        
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(updateCounter);
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                    }, 16);
                }, delay);
                
                // Remove the scroll listener once the counter has started
                window.removeEventListener('scroll', counterOnScroll);
            }
        };
        
        // Add the scroll event listener
        window.addEventListener('scroll', counterOnScroll);
        
        // Call the function once to check if the counter is already in view
        counterOnScroll();
    });
}

// Function to initialize parallax effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed') || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Function to initialize type animations
function initializeTypeAnimation() {
    const typeElements = document.querySelectorAll('.type-animation');
    
    typeElements.forEach(element => {
        const text = element.getAttribute('data-text');
        const speed = parseInt(element.getAttribute('data-speed') || 100);
        const delay = parseInt(element.getAttribute('data-delay') || 0);
        
        setTimeout(() => {
            let i = 0;
            element.textContent = '';
            
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Check if the element should have a blinking cursor
                    if (element.classList.contains('with-cursor')) {
                        element.classList.add('typing-cursor');
                    }
                }
            }, speed);
        }, delay);
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    }
});

// Scroll to top functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('#scroll-top')) {
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Text scramble effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize scramble text effect
document.addEventListener('DOMContentLoaded', function() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    
    scrambleElements.forEach(el => {
        const phrases = JSON.parse(el.getAttribute('data-phrases'));
        const fx = new TextScramble(el);
        let counter = 0;
        
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };
        
        next();
    });
});

// Initialize particle backgrounds
document.addEventListener('DOMContentLoaded', function() {
    const particleContainers = document.querySelectorAll('.particles-bg');
    
    particleContainers.forEach(container => {
        const count = parseInt(container.getAttribute('data-particle-count') || 100);
        const color = container.getAttribute('data-particle-color') || '#4a90e2';
        const speed = parseFloat(container.getAttribute('data-particle-speed') || 1);
        const size = parseFloat(container.getAttribute('data-particle-size') || 3);
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.className = 'particles-canvas';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        const particles = [];
        
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                size: Math.random() * size + 1,
                color: color
            });
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Update position
                p.x += p.vx;
                p.y += p.vy;
                
                // Boundary check
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                
                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = 1 - distance / 100;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    });
});
