// -------------------
// 🌓 Inicjalizacja trybu ciemnego
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  darkModeToggle?.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode",
      body.classList.contains("dark-mode") ? "enabled" : "disabled");
  });
}

// -------------------
// 👤 Obsługa użytkownika
function handleAuthUI() {
  const navList = document.querySelector("#navMenu ul");

  const loginLi = document.querySelector('a[href*="login"]')?.parentElement;
  const registerLi = document.querySelector('a[href*="register"]')?.parentElement;

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || localStorage.getItem("login");

  if (token && userName) {
    loginLi?.remove();
    registerLi?.remove();

    // Stylizowany wrapper z nickiem + przyciskiem wyloguj
    const userWrapper = document.createElement("li");
    userWrapper.style.display = "flex";
    userWrapper.style.alignItems = "center";
    userWrapper.style.gap = "0.75rem";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = capitalize(userName);
    nameSpan.style.fontWeight = "bold";

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Wyloguj";
    logoutBtn.style.background = "none";
    logoutBtn.style.border = "none";
    logoutBtn.style.color = "var(--accent)";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.style.fontWeight = "bold";
    logoutBtn.style.fontSize = "1rem";

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("login");
      location.reload();
    });

    userWrapper.appendChild(nameSpan);
    userWrapper.appendChild(logoutBtn);

    navList.insertBefore(userWrapper, navList.firstChild);
  }
}

// -------------------
// 🔠 Pomocnicze
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// -------------------
// 🚀 Init
document.addEventListener("DOMContentLoaded", () => {
  // 🍔 Hamburger menu
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navMenu")?.querySelector("ul");

  btn?.addEventListener("click", () => {
    nav?.classList.toggle("active");
  });

  initDarkMode();
});
// Animacja dla przycisku gwiazdy
document.querySelectorAll('.gold-button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.querySelector('.star-icon').style.animation = 'pulse 0.5s infinite';
  });
  
  button.addEventListener('mouseleave', () => {
    button.querySelector('.star-icon').style.animation = 'pulse 2s infinite';
  });
});
handleAuthUI(); 
