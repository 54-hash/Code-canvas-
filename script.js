function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

document.querySelectorAll(".before-fade").forEach(el => observer.observe(el));
