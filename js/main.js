// Main JavaScript file for Ray's Personal Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const setupMobileNav = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
        
        // Only add the mobile button on small screens
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                header.insertBefore(mobileMenuBtn, nav);
                
                // Hide the nav initially on mobile
                nav.classList.add('nav-closed');
                
                // Toggle navigation when the button is clicked
                mobileMenuBtn.addEventListener('click', () => {
                    nav.classList.toggle('nav-closed');
                    mobileMenuBtn.classList.toggle('open');
                });
            }
        } else {
            // Remove mobile elements on larger screens
            const existingBtn = document.querySelector('.mobile-menu-btn');
            if (existingBtn) {
                existingBtn.remove();
                nav.classList.remove('nav-closed');
            }
        }
    };
    
    // Call initially and on window resize
    setupMobileNav();
    window.addEventListener('resize', setupMobileNav);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only process if the href is not just "#"
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        valid = false;
                        input.classList.add('error');
                    }
                }
            });
            
            if (valid) {
                // In a real implementation, this would send the form data to a server
                // For this demo, we'll just show a success message
                const formElements = contactForm.elements;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    // Project filtering on projects.html
    const setupProjectFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        if (filterBtns.length && projects.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const filterValue = btn.getAttribute('data-filter');
                    
                    // Show/hide projects based on filter
                    projects.forEach(project => {
                        if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    });
                });
            });
        }
    };
    
    setupProjectFilters();
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports the loading attribute
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        // This would typically use an Intersection Observer
        // For simplicity, we'll just load all images immediately
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
    
    // Add animation on scroll for elements with .animate-on-scroll class
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Call once on load
});
