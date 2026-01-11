function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.12}s`;
        entry.target.classList.add("fade-in");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".before-fade").forEach(el => observer.observe(el));

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
