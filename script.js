// ===== PERFORMANCE: Defer non-critical operations =====

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Smooth scrolling for navigation links + active state tracking
const navAnchors = document.querySelectorAll('nav a[href^="#"]');

navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            navAnchors.forEach(link => link.removeAttribute('aria-current'));
            this.setAttribute('aria-current', 'page');
        }

        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Active section highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navAnchors.forEach(link => {
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === '#' + id) {
                    link.setAttribute('aria-current', 'page');
                }
            });
        }
    });
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveNav);
}, { passive: true });

// Intersection Observer for scroll-triggered fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('fade-in');
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.before-fade');
fadeElements.forEach(el => observer.observe(el));

// PERFORMANCE: Parallax effect
let ticking = false;

function updateParallax() {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImg.style.transform = `translateY(${rate}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// PERFORMANCE: Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
}

// Preload critical resources
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'image';
preloadLink.href = 'profile.jpg';
preloadLink.type = 'image/jpeg';
document.head.appendChild(preloadLink);

// Accessibility: Handle Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});

// PERFORMANCE: Debounce resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }, 250);
});

// Console greeting
console.log('%c Code Canvas ', 'background: #00ff9c; color: #000; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 8px;');
console.log('%c Welcome to my portfolio! Feel free to explore the code. ', 'color: #00ff9c; font-size: 14px;');
            
