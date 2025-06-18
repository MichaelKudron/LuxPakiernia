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

  // Główne elementy DOM
  const addExerciseBtn = document.getElementById("addExerciseToPlan");
  const addExerciseForm = document.getElementById("addExerciseForm");
  const cancelAddExerciseBtn = document.getElementById("cancelAddExercise");
  const confirmAddExerciseBtn = document.getElementById("confirmAddExercise");
  const exercisesContainer = document.getElementById("exercisesContainer");
  const exerciseSelect = document.getElementById("exerciseSelect");
  const dayTabs = document.querySelectorAll(".day-tab");
  
  // Zmienne stanu
  let currentDay = "poniedzialek";
  let exercises = [];
  let allExercises = [];

  // API endpoints
  const API_BASE_URL = "http://localhost:5223/api";
  const EXERCISE_IN_PLAN_URL = `${API_BASE_URL}/ExerciseInPlan`;
  const EXERCISES_URL = `${API_BASE_URL}/Exercise/GetAllExercises/none/none`;

  // Inicjalizacja strony
  async function initPage() {
    await loadAllExercises();
    await loadExercisesForDay(currentDay);
    setupEventListeners();
  }

  // Ładowanie wszystkich dostępnych ćwiczeń
  async function loadAllExercises() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "../login/login.html";
        return;
      }

      const response = await fetch(EXERCISES_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Failed to load exercises");

      allExercises = await response.json();
      populateExerciseSelect();
    } catch (error) {
      console.error("Error loading exercises:", error);
      showErrorMessage("Nie udało się załadować ćwiczeń");
    }
  }

  // Ładowanie ćwiczeń dla danego dnia
  async function loadExercisesForDay(day) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "../login/login.html";
        return;
      }

      const response = await fetch(`${EXERCISE_IN_PLAN_URL}/GetByDay/${day}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Failed to load exercises for day");

      exercises = await response.json();
      renderExercises();
    } catch (error) {
      console.error(`Error loading exercises for ${day}:`, error);
      exercises = [];
      renderExercises();
    }
  }

  // Renderowanie ćwiczeń
  function renderExercises() {
    exercisesContainer.innerHTML = "";

    if (!exercises || exercises.length === 0) {
      exercisesContainer.innerHTML = `
        <div class="no-exercises">
          <p>Brak ćwiczeń w planie na ten dzień</p>
        </div>
      `;
      return;
    }

    exercises.forEach(exercise => {
      const exerciseItem = document.createElement("div");
      exerciseItem.className = "exercise-item";
      exerciseItem.innerHTML = `
        <h3 class="exercise-name">${exercise.name || "Brak nazwy"}</h3>
        <div class="exercise-details">
          <div class="exercise-detail"><span>Partia:</span> ${exercise.muscleGroup || "Nieokreślona"}</div>
          <div class="exercise-detail"><span>Serie:</span> ${exercise.seriesCount || "-"}</div>
          <div class="exercise-detail"><span>Powtórzenia:</span> ${exercise.repetitionCount || "-"}</div>
          <div class="exercise-detail"><span>Obciążenie:</span> ${exercise.weight || "0"} kg</div>
        </div>
        <button class="delete-exercise" data-id="${exercise.id}">×</button>
      `;
      exercisesContainer.appendChild(exerciseItem);
    });

    // Dodanie obsługi usuwania ćwiczeń
    document.querySelectorAll(".delete-exercise").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const exerciseId = e.target.getAttribute("data-id");
        await deleteExerciseFromPlan(exerciseId);
      });
    });
  }

  // Usuwanie ćwiczenia z planu
  async function deleteExerciseFromPlan(exerciseId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "../login/login.html";
        return;
      }

      const response = await fetch(`${EXERCISE_IN_PLAN_URL}/${exerciseId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Failed to delete exercise");

      await loadExercisesForDay(currentDay);
    } catch (error) {
      console.error("Error deleting exercise:", error);
      showErrorMessage("Nie udało się usunąć ćwiczenia");
    }
  }

  // Dodawanie ćwiczenia do planu
  async function addExerciseToPlan() {
    const exerciseId = exerciseSelect.value;
    const seriesCount = document.getElementById("seriesCount").value;
    const repetitionCount = document.getElementById("repetitionCount").value;
    const weight = document.getElementById("weight").value;

    if (!exerciseId) {
      showErrorMessage("Wybierz ćwiczenie");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "../login/login.html";
        return;
      }

      const exerciseData = {
        exerciseId,
        seriesCount: parseInt(seriesCount),
        repetitionCount: parseInt(repetitionCount),
        weight: parseFloat(weight),
        day: currentDay
      };

      const response = await fetch(EXERCISE_IN_PLAN_URL, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseData)
      });

      if (!response.ok) throw new Error("Failed to add exercise");

      hideAddExerciseForm();
      await loadExercisesForDay(currentDay);
    } catch (error) {
      console.error("Error adding exercise:", error);
      showErrorMessage("Nie udało się dodać ćwiczenia");
    }
  }

  // Wypełnianie selecta ćwiczeniami
  function populateExerciseSelect() {
    exerciseSelect.innerHTML = "";
    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Wybierz ćwiczenie";
    exerciseSelect.appendChild(defaultOption);
    
    allExercises.forEach(exercise => {
      const option = document.createElement("option");
      option.value = exercise.id;
      option.textContent = exercise.name;
      exerciseSelect.appendChild(option);
    });
  }

  // Pokazywanie formularza dodawania ćwiczenia
  function showAddExerciseForm() {
    addExerciseForm.style.display = "block";
    exercisesContainer.style.display = "none";
  }

  // Ukrywanie formularza dodawania ćwiczenia
  function hideAddExerciseForm() {
    addExerciseForm.style.display = "none";
    exercisesContainer.style.display = "grid";
  }

  // Zmiana dnia
  function changeDay(day) {
    currentDay = day;
    dayTabs.forEach(tab => {
      if (tab.getAttribute("data-day") === day) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
    loadExercisesForDay(day);
  }

  // Wyświetlanie komunikatów o błędach
  function showErrorMessage(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    exercisesContainer.prepend(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
  }

  // Ustawienie nasłuchiwania zdarzeń
  function setupEventListeners() {
    addExerciseBtn.addEventListener("click", showAddExerciseForm);
    cancelAddExerciseBtn.addEventListener("click", hideAddExerciseForm);
    confirmAddExerciseBtn.addEventListener("click", addExerciseToPlan);
    
    dayTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        changeDay(tab.getAttribute("data-day"));
      });
    });
  }

  // Start aplikacji
  initPage();
});