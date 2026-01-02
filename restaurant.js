// Toggle mobile nav menu
function toggleMenu() {
  const navList = document.querySelector("nav ul");
  navList.classList.toggle("active");
}

// Optional: Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
