function toggleMenu() {
    const navList = document.querySelector("nav ul");
    navList.classList.toggle("active");
  }
  
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thanks for reaching out! I'll get back to you soon.");
    this.reset();
  });
  