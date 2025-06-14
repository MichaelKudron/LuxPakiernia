document.getElementById("registerForm").addEventListener("submit", async function (e) {
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

  try {
    const response = await fetch("http://localhost:5223/api/Auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: email,
        password: password,
        passwordConfirm: confirmPassword
      })
    });

    if (response.ok) {
      const data = await response.json();

      // Zakładamy, że API zwraca UserDTO:
      // { token: "...", userId: "...", login: "..." }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("login", data.login);

      window.location.href = "../index.html"; // przekierowanie na stronę główną
    } else {
      const errorData = await response.text();
      errorBox.textContent = `Rejestracja nie powiodła się: ${errorData}`;
    }
  } catch (error) {
    console.error("Błąd sieci:", error);
    errorBox.textContent = "Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.";
  }
});