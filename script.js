// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPortfolioFilter();
    initVideoModal();
    initScrollAnimations();
    initFormHandling();
    initSmoothScroll();
    initParallaxEffects();
});

// Navigation Functions
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Portfolio Filter Functions
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items with animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show item with delay for stagger effect
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                } else {
                    // Hide item
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-30px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Video Modal Functions
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const closeBtn = document.querySelector('.close');

    // Open modal when clicking on portfolio cards
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            openVideoModal();
        });
    });

    // Open modal when clicking on hero video placeholder
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            openVideoModal();
        });
    }

    // Close modal
    closeBtn.addEventListener('click', closeVideoModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeVideoModal();
        }
    });

    function openVideoModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add opening animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        }, 10);
    }

    function closeVideoModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .portfolio-card, .service-card, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(contactForm);
        });
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success state
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
        }, 2000);
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#ff6b6b'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 3000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Smooth Scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    [...navLinks, ...heroButtons].forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Video Thumbnail Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', () => {
            const playIcon = thumbnail.querySelector('i');
            playIcon.style.transform = 'scale(1.2)';
            playIcon.style.color = '#4ecdc4';
        });
        
        thumbnail.addEventListener('mouseleave', () => {
            const playIcon = thumbnail.querySelector('i');
            playIcon.style.transform = 'scale(1)';
            playIcon.style.color = '#ff6b6b';
        });
    });
});

// Dynamic Counter Animation (for stats if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Loading Screen (optional)
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <h2>Editkaro<span>.in</span></h2>
            <div class="loading-spinner"></div>
            <p>Loading amazing content...</p>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1000);
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const highlightText = heroTitle.querySelector('.highlight').textContent;
    const beforeHighlight = originalText.split(highlightText)[0];
    const afterHighlight = originalText.split(highlightText)[1];
    
    heroTitle.innerHTML = '';
    
    let index = 0;
    const fullText = beforeHighlight + highlightText + afterHighlight;
    
    function typeWriter() {
        if (index < beforeHighlight.length) {
            heroTitle.innerHTML += fullText.charAt(index);
        } else if (index < beforeHighlight.length + highlightText.length) {
            if (index === beforeHighlight.length) {
                heroTitle.innerHTML += '<span class="highlight">';
            }
            heroTitle.innerHTML += fullText.charAt(index);
            if (index === beforeHighlight.length + highlightText.length - 1) {
                heroTitle.innerHTML += '</span>';
            }
        } else {
            heroTitle.innerHTML += fullText.charAt(index);
        }
        
        index++;
        
        if (index <= fullText.length) {
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment if you want these effects
    // initLoadingScreen();
    // initTypingEffect();
    
    // Add some interactive hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showEasterEgg();
        konamiCode = [];
    }
});

function showEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = '🎉 You found the secret! Welcome to the editing masters! 🎬';
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 20px;
        border-radius: 15px;
        font-size: 1.2rem;
        z-index: 4000;
        animation: bounce 0.5s ease-in-out;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
        easterEgg.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(easterEgg);
        }, 500);
    }, 3000);
}