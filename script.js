// ===== PERFORMANCE: Defer non-critical operations =====
// Use requestAnimationFrame for smooth animations without blocking main thread

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Smooth scrolling for navigation links
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

            // Update aria-current for accessibility
            navAnchors.forEach(link => link.removeAttribute('aria-current'));
            this.setAttribute('aria-current', 'page');
        }

        // Close mobile menu after clicking a link
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Intersection Observer for scroll-triggered fade-in animations
// PERFORMANCE: Use rootMargin to start loading slightly before visible
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use requestAnimationFrame for smooth rendering
            requestAnimationFrame(() => {
                entry.target.classList.add('fade-in');
            });
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with the 'before-fade' class
const fadeElements = document.querySelectorAll('.before-fade');
fadeElements.forEach(el => observer.observe(el));

// PERFORMANCE: Parallax effect using passive event listener
// and requestAnimationFrame to avoid jank
let ticking = false;

function updateParallax() {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced rate for better performance
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

// PERFORMANCE: Lazy load images that are below the fold
// (profile.jpg is eager-loaded since it's in hero, but this is good practice for future images)
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
}

// PERFORMANCE: Preload critical resources hint
// Add preload for profile.jpg if it's critical
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'image';
preloadLink.href = 'profile.jpg';
preloadLink.type = 'image/jpeg';
document.head.appendChild(preloadLink);

// Accessibility: Handle Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});

// PERFORMANCE: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }, 250);
});

// Console greeting for developers
console.log('%c Code Canvas ', 'background: #00ff9c; color: #000; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 8px;');
console.log('%c Welcome to my portfolio! Feel free to explore the code. ', 'color: #00ff9c; font-size: 14px;');
