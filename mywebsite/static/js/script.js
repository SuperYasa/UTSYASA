// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== SMOOTH SCROLL & ACTIVE LINK ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            updateActiveLink();
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// ========== FORM SUBMISSION ==========
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                input.style.animation = 'shake 0.3s ease';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (isValid) {
            // Success animation
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '✓ Pesan Terkirim!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                this.reset();
                btn.textContent = originalText;
                btn.style.background = '';
                inputs.forEach(input => input.style.borderColor = '#ddd');
            }, 2000);
        } else {
            alert('Silakan lengkapi semua field!');
        }
    });
}

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, .contact-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    // Subtle parallax on hero background
    document.querySelectorAll('.hero')[0].style.backgroundPosition = `0 ${scrolled * 0.5}px`;
});

// ========== TYPING ANIMATION ==========
function typeText(element, text, speed = 50) {
    element.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========== SHAKE ANIMATION KEYFRAMES ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.3); }
        50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.6); }
    }
`;
document.head.appendChild(style);

// ========== CURSOR FOLLOW EFFECT (Optional) ==========
const cursorFollow = document.querySelectorAll('.btn, .skill-card, .project-card');
cursorFollow.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========== LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('🚀 Portfolio website loaded with enhanced animations!');
});

// Initial body opacity
document.body.style.opacity = '0.95';

// ========== AOS-LIKE LIBRARY (Alternative to external library) ==========
function addScrollAnimation() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(el => {
        const animation = el.getAttribute('data-aos');
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `${animation} 0.6s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
        observer.observe(el);
    });
}

addScrollAnimation();

// ========== SMOOTH PAGE TRANSITIONS ==========
document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) return;
        
        if (href) {
            e.preventDefault();
            document.body.style.opacity = '0.5';
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});