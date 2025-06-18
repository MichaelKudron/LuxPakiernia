document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicjalizacja trybu ciemnego z emoji
  const initDarkMode = () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const slider = document.querySelector('.slider');
    
    // Funkcja aktualizująca stan i emoji
    const updateMode = (isDark) => {
      body.classList.toggle("dark-mode", isDark);
      if (slider) {
        slider.textContent = isDark ? "🌙" : "🌞";
        slider.style.paddingLeft = isDark ? "30px" : "5px";
      }
      if (darkModeToggle) darkModeToggle.checked = isDark;
      localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
    };
    
    // Sprawdzamy zapisane ustawienia
    const isDark = localStorage.getItem("dark-mode") === "enabled";
    updateMode(isDark);
    
    // Nasłuchujemy zmiany - działa od pierwszego kliknięcia
    darkModeToggle?.addEventListener("change", (e) => {
      updateMode(e.target.checked);
    });
  };

  initDarkMode();

  // 2. Menu hamburger
  document.getElementById("hamburgerBtn")?.addEventListener("click", () => {
    document.querySelector("#navMenu ul")?.classList.toggle("active");
  });

  // 3. Reszta funkcjonalności
  const container = document.getElementById("plan-container");
  const userId = localStorage.getItem("userId");

  const daysOfWeek = [
    "poniedzialek",
    "wtorek",
    "sroda",
    "czwartek",
    "piatek",
    "sobota",
    "niedziela"
  ];

  async function loadPlan() {
    try {
      const token = localStorage.getItem("token");
      if (!token || !userId) {
        window.location.href = "../login/login.html";
        return;
      }

      const response = await fetch(`http://localhost:5223/api/UserCotroller/user/${userId}/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "../login/login.html";
        return;
      }

      if (!response.ok) throw new Error("Nie udało się pobrać danych.");

      const data = await response.json();
      renderPlan(data);
    } catch (err) {
      container.innerHTML = `
        <div class="error">
          <p>${err.message}</p>
          <button onclick="location.reload()" class="retry-btn">Spróbuj ponownie</button>
        </div>
      `;
    }
  }

  async function deleteExerciseInPlan(id) {
    if (!confirm("Czy na pewno chcesz usunąć to ćwiczenie z planu?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5223/api/ExerciseInPlan/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "../login/login.html";
        return;
      }

      if (!response.ok) throw new Error("Usuwanie nie powiodło się");
      loadPlan(); // odśwież listę po usunięciu
    } catch (err) {
      alert(err.message);
    }
  }

  function renderPlan(data) {
    if (!data.length) {
      container.innerHTML = "<p>Brak ćwiczeń w planie.</p>";
      return;
    }

    const grouped = daysOfWeek.reduce((acc, day) => {
      acc[day] = data.filter(e => e.day === day);
      return acc;
    }, {});

    container.innerHTML = daysOfWeek.map(day => {
      const exercises = grouped[day];
      if (!exercises.length) return "";
      return `
        <section class="day-section">
          <h2>${day.charAt(0).toUpperCase() + day.slice(1)}</h2>
          <div class="exercise-list">
            ${exercises.map(e => `
              <div class="exercise-card">
                <h3>${e.exercise.name}</h3>
                <p><strong>Grupa mięśniowa:</strong> ${e.exercise.muscleGroup}</p>
                <p><strong>Opis:</strong> ${e.exercise.description ?? "Brak opisu"}</p>
                <p><strong>Serie:</strong> ${e.seriesCount} &nbsp; 
                   <strong>Powtórzenia:</strong> ${e.repetitionsCount} &nbsp; 
                   <strong>Ciężar:</strong> ${e.weight} kg</p>
                <button onclick="deleteExerciseInPlan('${e.id}')" class="delete-btn">Usuń</button>
              </div>
            `).join("")}
          </div>
        </section>
      `;
    }).join("");
  }

  window.deleteExerciseInPlan = deleteExerciseInPlan;
  loadPlan();
});