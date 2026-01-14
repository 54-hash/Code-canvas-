// Mobile menu toggle
const toggle = document.querySelector(".mobile-toggle");
const nav = document.querySelector("nav ul");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Scroll fade animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".before-fade").forEach(el => {
  observer.observe(el);
});
