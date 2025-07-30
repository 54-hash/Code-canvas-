
function toggleMenu() {
  const navList = document.querySelector("nav ul");
  navList.classList.toggle("active");
}
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thanks for reaching out! I'll get back to you soon.");
    this.reset();
  });
}

const fadeElements = document.querySelectorAll(".before-fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      entry.target.classList.remove("before-fade");
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));
