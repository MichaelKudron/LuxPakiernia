document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navMenu").querySelector("ul");

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});