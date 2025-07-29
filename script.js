
function toggleMenu() {
  const navList = document.querySelector("nav ul");
  navList.classList.toggle("active");
}

const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    alert("Thanks for reaching out! I'll get back to you soon.");
    this.reset();
  });
}

const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const backToTop = document.createElement('button');
backToTop.textContent = "↑ Top";
backToTop.style.position = "fixed";
backToTop.style.bottom = "20px";
backToTop.style.right = "20px";
backToTop.style.padding = "10px 15px";
backToTop.style.border = "none";
backToTop.style.borderRadius = "5px";
backToTop.style.backgroundColor = "#00bcd4";
backToTop.style.color = "#000";
backToTop.style.cursor = "pointer";
backToTop.style.display = "none";
backToTop.style.zIndex = "1001";
backToTop.style.fontWeight = "bold";
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

const animatedSections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

animatedSections.forEach(section => {
  section.classList.add('before-fade');
  observer.observe(section);
});
