document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorBox = document.getElementById("registerError");

  errorBox.textContent = "";

  if (!email || !password || !confirmPassword) {
    errorBox.textContent = "Wypełnij wszystkie pola.";
    return;
  }

  if (password.length < 6) {
    errorBox.textContent = "Hasło musi mieć co najmniej 6 znaków.";
    return;
  }

  if (password !== confirmPassword) {
    errorBox.textContent = "Hasła nie są takie same.";
    return;
  }

  // Tu możesz podpiąć POST do API
  console.log("Rejestracja zakończona:", email);
  alert("Rejestracja zakończona sukcesem (symulacja).");
});
document.addEventListener("DOMContentLoaded", () => {
  console.log("index.js działa"); // ✅ Test, usuń później

  // Hamburger menu
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navMenu")?.querySelector("ul");

  btn?.addEventListener("click", () => {
    nav?.classList.toggle("active");
  });

  // 🌙 Tryb ciemny toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Sprawdź zapis w localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  darkModeToggle?.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  });
});

