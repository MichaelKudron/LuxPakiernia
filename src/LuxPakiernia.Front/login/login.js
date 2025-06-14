document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("loginError");

  errorBox.textContent = "";

  if (!email || !password) {
    errorBox.textContent = "Wypełnij wszystkie pola.";
    return;
  }

  if (password.length < 6) {
    errorBox.textContent = "Hasło musi mieć co najmniej 6 znaków.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5223/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: email,       // <-- backend oczekuje pola "login", nie "email"
        password: password
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Logowanie nie powiodło się.");
    }

    const data = await response.json();

    // Zakładamy, że zwraca UserDTO: { token, userId, login }
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("login", data.login);

    window.location.href = "../index.html"; // przekierowanie po zalogowaniu
  } catch (err) {
    errorBox.textContent = err.message;
  }
});
