// plan-grouped.js z przyciskiem usuwania
const container = document.getElementById("plan-container");
const userId = localStorage.getItem("userId");

const daysOfWeek = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela"
];

async function loadPlan() {
  try {
    const response = await fetch(`http://localhost:5223/api/UserCotroller/user/${userId}/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) throw new Error("Nie udało się pobrać danych.");

    const data = await response.json();
    renderPlan(data);
  } catch (err) {
    container.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

async function deleteExerciseInPlan(id) {
  if (!confirm("Czy na pewno chcesz usunąć to ćwiczenie z planu?")) return;
  try {
    const response = await fetch(`http://localhost:5223/api/ExerciseInPlan/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
        <h2>${day}</h2>
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

loadPlan();
