// index.js
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navMenu")?.querySelector("ul");

  btn?.addEventListener("click", () => {
    nav?.classList.toggle("active");
  });

  // Tryb ciemny - przeniesione na początek
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("dark-mode", 
        body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });
  }
});