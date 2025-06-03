// Funkcja inicjalizacji trybu ciemnego
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Sprawdź zapisany stan
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  // Nasłuchuj zmian przełącznika
  darkModeToggle?.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", 
      body.classList.contains("dark-mode") ? "enabled" : "disabled");
  });
}

// Główna inicjalizacja po załadowaniu DOM
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navMenu")?.querySelector("ul");

  btn?.addEventListener("click", () => {
    nav?.classList.toggle("active");
  });

  // Inicjalizuj tryb ciemny
  initDarkMode();
});