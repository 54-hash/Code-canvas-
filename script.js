// Mobile menu
function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}

// Page transitions
const transition = document.querySelector(".page-transition");
document.querySelectorAll(".link").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) {
      e.preventDefault();
      transition.classList.add("active");
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    }
  });
});
