document.addEventListener("DOMContentLoaded", () => {
  // Inicjalizacja trybu ciemnego
  function initDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Sprawdź zapisane ustawienia
    if (localStorage.getItem("dark-mode") === "enabled") {
      body.classList.add("dark-mode");
      if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Obsługa zmiany trybu
    darkModeToggle?.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("dark-mode",
        body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });
  }

  // Inicjalizacja
  initDarkMode();

  // Reszta kodu (pobieranie ćwiczeń itd.)
  const muscleGroupSelect = document.getElementById("muscleGroup");
  const sortOrderSelect = document.getElementById("sortOrder");
  const applyBtn = document.getElementById("applyFilters");
  const exercisesList = document.getElementById("exercisesList");
  const API_BASE_URL = "http://localhost:5223/api/Exercise";

  async function fetchExercises(muscleGroup = "none", sortOrder = "none") {
    try {
      let url = `${API_BASE_URL}/GetAllExercises/`;
      url += muscleGroup === "none" ? "none" : encodeURIComponent(muscleGroup);
      url += "/";
      url += sortOrder === "none" ? "none" : sortOrder;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Błąd pobierania ćwiczeń:", error);
      showErrorMessage("Nie udało się pobrać ćwiczeń. Spróbuj ponownie.");
      return [];
    }
  }

  function renderExercises(exercises) {
    exercisesList.innerHTML = "";
    
    if (!exercises || exercises.length === 0) {
      exercisesList.innerHTML = `
        <div class="no-results">
          <p>Brak ćwiczeń spełniających wybrane kryteria</p>
        </div>
      `;
      return;
    }
    
    exercises.forEach(exercise => {
      if (!exercise.id) return;
      
      const exerciseCard = document.createElement("div");
      exerciseCard.className = "exercise-card";
      exerciseCard.innerHTML = `
        <h3 class="exercise-name">${exercise.name || "Brak nazwy"}</h3>
        <span class="exercise-muscle">${exercise.muscleGroup || "Nieokreślona partia"}</span>
        <p class="exercise-description">${exercise.description || "Brak opisu"}</p>
      `;
      exercisesList.appendChild(exerciseCard);
    });
  }

  function showErrorMessage(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    exercisesList.prepend(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
  }

  applyBtn.addEventListener("click", async () => {
    applyBtn.disabled = true;
    applyBtn.textContent = "Ładowanie...";
    
    try {
      const exercises = await fetchExercises(
        muscleGroupSelect.value === "none" ? "none" : muscleGroupSelect.value,
        sortOrderSelect.value === "none" ? "none" : sortOrderSelect.value
      );
      renderExercises(exercises);
    } finally {
      applyBtn.disabled = false;
      applyBtn.textContent = "Zastosuj filtry";
    }
  });

  // Menu hamburger
  document.getElementById("hamburgerBtn")?.addEventListener("click", () => {
    document.querySelector("#navMenu ul")?.classList.toggle("active");
  });

  // Inicjalne ładowanie ćwiczeń
  (async () => {
    applyBtn.disabled = true;
    applyBtn.textContent = "Ładowanie...";
    
    try {
      const initialExercises = await fetchExercises();
      renderExercises(initialExercises);
    } finally {
      applyBtn.disabled = false;
      applyBtn.textContent = "Zastosuj filtry";
    }
  })();
});