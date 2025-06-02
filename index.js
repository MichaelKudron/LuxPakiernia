document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navMenu").querySelector("ul");

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});
  // 🌙 Tryb ciemny toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Sprawdź zapis w localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
  }

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  });

