// =============================
// Navbar toggle for mobile
// =============================
function toggleMenu() {
  const navList = document.querySelector("header nav ul");
  navList.classList.toggle("active");
}

// =============================
// Typewriter effect for hero title
// =============================
const heroTitle = document.querySelector(".hero h1");
const text = heroTitle.textContent;
heroTitle.textContent = "";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    heroTitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// =============================
// Fade-in sections on scroll
// =============================
const faders = document.querySelectorAll(".fade-section");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  observer
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.style.opacity = "1";
    entry.target.style.transform = "translateY(0)";
    observer.unobserve(entry.target);
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
