document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("confirmAddExercise");
  const cancelBtn = document.getElementById("cancelAddExercise");
  const select = document.getElementById("exerciseSelect");
  const dayTabs = document.querySelectorAll(".day-tab");

  let currentDay = "poniedzialek";
  const API = "http://localhost:5223/api";
  const EXERCISES_URL = `${API}/Exercise/GetAllExercises/none/none`;
  const ADD_URL = `${API}/ExerciseInPlan`;

  // zmiana aktywnego dnia
  dayTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      dayTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentDay = tab.dataset.day;
    });
  });

  // anulowanie formularza
  cancelBtn.addEventListener("click", () => {
    document.getElementById("addExerciseForm").reset();
  });

  // pobranie ćwiczeń do selecta
  async function loadExercises() {
    const token = localStorage.getItem("token");
    if (!token) return location.href = "../login/login.html";

    const res = await fetch(EXERCISES_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    data.forEach(ex => {
      const opt = document.createElement("option");
      opt.value = ex.id;
      opt.textContent = ex.name;
      select.appendChild(opt);
    });
  }

  // dodawanie ćwiczenia
  addBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return location.href = "../login/login.html";

    const payload = {
      exerciseId: select.value,
      seriesCount: parseInt(document.getElementById("seriesCount").value),
      repetitionCount: parseInt(document.getElementById("repetitionCount").value),
      weight: parseFloat(document.getElementById("weight").value),
      day: currentDay
    };

    const res = await fetch(ADD_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Dodano ćwiczenie do planu!");
      document.getElementById("addExerciseForm").reset();
    } else {
      alert("Błąd podczas dodawania ćwiczenia");
    }
  });

  loadExercises();
});
