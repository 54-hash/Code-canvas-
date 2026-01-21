// Navbar toggle for mobile
function toggleMenu() {
  const navList = document.querySelector("header nav ul");
  navList.classList.toggle("active");
}

// Typewriter effect for hero title
const heroTitle = document.querySelector('.hero h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let i = 0;
function typeWriter() {
  if (i < text.length) {
    heroTitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Fade in sections on scroll with stagger
const faders = document.querySelectorAll(".fade-section");
const appearOptions = {
