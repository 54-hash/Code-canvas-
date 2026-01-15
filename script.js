// script.js

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
const navAnchors = document.querySelectorAll('nav a[href^="#"]');

navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for scroll-triggered fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger a bit before fully in view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Optional: Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with the 'before-fade' class
const fadeElements = document.querySelectorAll('.before-fade');
fadeElements.forEach(el => observer.observe(el));

// Optional: Add a subtle parallax effect to the hero image on scroll (enhances the cyberpunk feel)
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5; // Adjust rate for desired effect
        heroImg.style.transform = `translateY(${rate}px)`;
    }
});
