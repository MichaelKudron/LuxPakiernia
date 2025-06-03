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
