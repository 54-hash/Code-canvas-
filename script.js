// Mobile Menu Toggle
const toggleBtn = document.querySelector('.mobile-toggle');
const navUl = document.querySelector('nav ul');

toggleBtn.addEventListener('click', () => {
  navUl.classList.toggle('active');
});

// Optional: Fade-in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('before-fade');
  observer.observe(section);
});
