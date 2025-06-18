document.addEventListener("DOMContentLoaded", () => {
  // Inicjalizacja trybu ciemnego
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

  initDarkMode();

  // Menu hamburger
  document.getElementById("hamburgerBtn")?.addEventListener("click", () => {
    document.querySelector("#navMenu ul")?.classList.toggle("active");
  });

  // Główne elementy
  const addBtn = document.getElementById("confirmAddExercise");
  const cancelBtn = document.getElementById("cancelAddExercise");
  const exerciseSelect = document.getElementById("exerciseSelect");
  const dayTabs = document.querySelectorAll(".day-tab");
  const form = document.getElementById("addExerciseForm");
  
  // Zmienne stanu
  let currentDay = "poniedzialek";
  const API_BASE_URL = "http://localhost:5223/api";
  const EXERCISES_URL = `${API_BASE_URL}/Exercise/GetAllExercises/none/none`;
  const EXERCISE_IN_PLAN_URL = `${API_BASE_URL}/ExerciseInPlan`;

  // Sprawdzenie autentykacji
  function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "../login/login.html";
      return false;
    }
    return true;
  }

  // Zmiana dnia
  dayTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      dayTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentDay = tab.dataset.day;
    });
  });

  // Anulowanie
  cancelBtn.addEventListener("click", () => {
    form.reset();
    clearMessages();
  });

  // Ładowanie ćwiczeń
  async function loadExercises() {
    if (!checkAuth()) return;
    
    try {
      showLoadingState(true);
      const token = localStorage.getItem("token");
      const response = await fetch(EXERCISES_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error("Nie udało się załadować ćwiczeń");
      }

      const exercises = await response.json();
      populateExerciseSelect(exercises);
    } catch (error) {
      console.error("Error loading exercises:", error);
      showErrorMessage(error.message);
    } finally {
      showLoadingState(false);
    }
  }

  // Wypełnianie selecta
  function populateExerciseSelect(exercises) {
    exerciseSelect.innerHTML = "";
    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Wybierz ćwiczenie";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    exerciseSelect.appendChild(defaultOption);
    
    exercises.forEach(exercise => {
      const option = document.createElement("option");
      option.value = exercise.id;
      option.textContent = exercise.name;
      exerciseSelect.appendChild(option);
    });
  }

  // Dodawanie ćwiczenia
  async function addExerciseToPlan() {
    if (!validateForm()) return;
    
    try {
      showLoadingState(true);
      const token = localStorage.getItem("token");
      const payload = {
        exerciseId: exerciseSelect.value,
        seriesCount: parseInt(document.getElementById("seriesCount").value),
        repetitionsCount: parseInt(document.getElementById("repetitionCount").value),
        weight: parseFloat(document.getElementById("weight").value),
        day: currentDay
      };

      const response = await fetch(EXERCISE_IN_PLAN_URL, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Błąd serwera");
      }

      showSuccessMessage("Ćwiczenie zostało dodane do planu!");
      form.reset();
    } catch (error) {
      console.error("Error adding exercise:", error);
      showErrorMessage(error.message || "Nie udało się dodać ćwiczenia");
    } finally {
      showLoadingState(false);
    }
  }

  // Walidacja formularza
  function validateForm() {
  clearMessages();
  
  if (!exerciseSelect.value) {
    showErrorMessage("Wybierz ćwiczenie z listy");
    return false;
  }

  const seriesCount = document.getElementById("seriesCount").value;
  if (!seriesCount || isNaN(seriesCount)) {
    showErrorMessage("Podaj poprawną liczbę serii");
    return false;
  }

  const repetitionCount = document.getElementById("repetitionCount").value;
  if (!repetitionCount || isNaN(repetitionCount)) {
    showErrorMessage("Podaj poprawną liczbę powtórzeń");
    return false;
  }

  const weight = document.getElementById("weight").value;
  if (!weight || isNaN(weight)) {
    showErrorMessage("Podaj poprawne obciążenie");
    return false;
  }

  return true;
}

  // Komunikaty
  function showSuccessMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "success-message";
    messageElement.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    `;
    form.prepend(messageElement);
    setTimeout(() => messageElement.classList.add("fade-out"), 3000);
    setTimeout(() => messageElement.remove(), 3500);
  }

  function showErrorMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "error-message";
    messageElement.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span>${message}</span>
    `;
    form.prepend(messageElement);
    setTimeout(() => messageElement.classList.add("fade-out"), 3000);
    setTimeout(() => messageElement.remove(), 3500);
  }

  function clearMessages() {
    const existingMessages = document.querySelectorAll(".success-message, .error-message");
    existingMessages.forEach(msg => msg.remove());
  }

  // Stan ładowania
  function showLoadingState(isLoading) {
    addBtn.disabled = isLoading;
    addBtn.innerHTML = isLoading 
      ? '<span class="spinner"></span> Trwa zapisywanie...' 
      : 'Dodaj ćwiczenie';
  }

  // Obsługa braku autoryzacji
  function handleUnauthorized() {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  }

  // Event listeners
  addBtn.addEventListener("click", addExerciseToPlan);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addExerciseToPlan();
  });

  // Start aplikacji
  loadExercises();
});