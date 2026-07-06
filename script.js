/**
 * Code Canvas Portfolio - Enhanced JavaScript
 * Handles: loader, navigation, scroll animations, mobile menu,
 * form handling, toast notifications, scroll-to-top, parallax
 */

// ===== LOADER =====
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const body = document.body;
  
  // Simulate loading progress then hide
  setTimeout(() => {
    if (loader) {
      loader.classList.add('hidden');
    }
    body.classList.remove('loading');
    
    // Remove no-js class since JS is working
    document.documentElement.classList.remove('no-js');
  }, 1500);
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('header');

function updateHeader() {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(updateHeader);
}, { passive: true });

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.className = isExpanded ? 'bx bx-x' : 'bx bx-menu';
    }
  });
}

// ===== SMOOTH SCROLL & ACTIVE NAV =====
const navAnchors = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

// Smooth scroll to sections
navAnchors.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update aria-current
      navAnchors.forEach(link => link.removeAttribute('aria-current'));
      this.setAttribute('aria-current', 'page');
    }

    // Close mobile menu
    if (navLinks) {
      navLinks.classList.remove('active');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'bx bx-menu';
    }
  });
});

// Active section highlighting on scroll
function updateActiveNav() {
  const scrollPos = window.scrollY + 120;

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

// ===== INTERSECTION OBSERVER - FADE IN ANIMATIONS =====
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -60px 0px'
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

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
  if (!scrollTopBtn) return;
  
  if (window.scrollY > 600) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(toggleScrollTop);
}, { passive: true });

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== PARALLAX EFFECT (subtle) =====
let ticking = false;

function updateParallax() {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.25;
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

// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = 'toast ' + type;
  
  // Force reflow
  void toast.offsetWidth;
  
  toast.classList.add('show');

  // Auto hide
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// Make showToast globally available
window.showToast = showToast;

// ===== FORM HANDLING =====
function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formStatus = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Get form values
  const name = form.querySelector('#name')?.value.trim();
  const email = form.querySelector('#email')?.value.trim();
  const subject = form.querySelector('#subject')?.value.trim();
  const message = form.querySelector('#message')?.value.trim();
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    if (formStatus) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Please fill in all fields.';
    }
    return false;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (formStatus) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Please enter a valid email address.';
    }
    return false;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
  
  // Simulate sending (replace with actual form submission)
  setTimeout(() => {
    if (formStatus) {
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
    }
    
    showToast('✅ Message sent successfully!', 'success', 4000);
    form.reset();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      if (formStatus) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }
    }, 5000);
  }, 1500);
  
  return false;
}

// Make handleSubmit globally available
window.handleSubmit = handleSubmit;

// ===== EXTERNAL LINK CHECKER =====
function checkLink(link) {
  const href = link.getAttribute('href');
  
  // If it's a placeholder or empty, prevent navigation
  if (!href || href === '#' || href === 'javascript:void(0)') {
    showToast('🔗 Link coming soon!', 'success', 3000);
    return false;
  }
  
  // For external links, just allow normal behavior
  return true;
}

window.checkLink = checkLink;

// ===== ACCESSIBILITY: ESCAPE KEY =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      const icon = menuToggle?.querySelector('i');
      if (icon) icon.className = 'bx bx-menu';
      menuToggle?.focus();
    }
  }
});

// ===== DEBOUNCED RESIZE =====
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768 && navLinks) {
      navLinks.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      const icon = menuToggle?.querySelector('i');
      if (icon) icon.className = 'bx bx-menu';
    }
  }, 250);
});

// ===== PRELOAD CRITICAL IMAGES =====
const preloadImages = ['profile.jpg'];
preloadImages.forEach(src => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
});

// ===== CONSOLE GREETING =====
console.log('%c Code Canvas ', 'background: linear-gradient(135deg, #00ff9c, #8affd4); color: #000; font-size: 20px; font-weight: bold; padding: 12px 20px; border-radius: 8px;');
console.log('%c Welcome to my portfolio! Feel free to explore the code. ', 'color: #00ff9c; font-size: 14px; padding: 8px 0;');
console.log('%c Built with passion by Silver | https://github.com/54-hash ', 'color: rgba(229, 253, 242, 0.6); font-size: 12px;');
      
