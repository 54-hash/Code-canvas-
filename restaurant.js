/* NAVBAR TOGGLE */
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* WHATSAPP */
document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    window.open("https://wa.me/2348063555721", "_blank");
  });
});

/* SLIDER (if images are added later) */
let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach(slide => slide.style.display = "none");
  index++;
  if (index > slides.length) index = 1;
  slides[index - 1].style.display = "block";
}

if (slides.length) {
  showSlides();
  setInterval(showSlides, 4000);
}

/* MENU SWITCH */
const foodBtn = document.getElementById("food-btn");
const drinksBtn = document.getElementById("drinks-btn");
const foodMenu = document.getElementById("food-menu");
const drinksMenu = document.getElementById("drinks-menu");

foodBtn.onclick = () => {
  foodMenu.style.display = "grid";
  drinksMenu.style.display = "none";
  foodBtn.classList.add("active");
  drinksBtn.classList.remove("active");
};

drinksBtn.onclick = () => {
  drinksMenu.style.display = "grid";
  foodMenu.style.display = "none";
  drinksBtn.classList.add("active");
  foodBtn.classList.remove("active");
};

/* SCROLL ANIMATION with Stagger */
const faders = document.querySelectorAll(".fade-in");
let delay = 0;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, delay);
      delay += 200; // Stagger delay
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));
