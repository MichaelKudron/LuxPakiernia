document.addEventListener("DOMContentLoaded", () => {
  // Przykładowe dane startowe
  const sampleTrainings = [
    {
      id: 1,
      name: "Trening FBW",
      exercises: "Przysiady, Wyciskanie sztangi, Wiosłowanie, Martwy ciąg"
    },
    {
      id: 2,
      name: "Trening cardio",
      exercises: "Bieżnia, Rower, Skakanka, Burpees"
    }
  ];

  // Inicjalizacja danych
  if (!localStorage.getItem('trainings') || JSON.parse(localStorage.getItem('trainings')).length === 0) {
    localStorage.setItem('trainings', JSON.stringify(sampleTrainings));
  }

  // Obsługa formularza
  const trainingForm = document.getElementById("trainingForm");
  const trainingsContainer = document.getElementById("trainingsContainer");

  trainingForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const training = {
      id: Date.now(),
      name: document.getElementById("trainingName").value,
      exercises: document.getElementById("trainingExercises").value
    };

    const trainings = JSON.parse(localStorage.getItem("trainings")) || [];
    trainings.push(training);
    localStorage.setItem("trainings", JSON.stringify(trainings));

    trainingForm.reset();
    loadTrainings();
  });

  // Ładowanie treningów
  function loadTrainings() {
    const trainings = JSON.parse(localStorage.getItem("trainings")) || [];
    trainingsContainer.innerHTML = "";
    
    trainings.forEach(training => {
      const trainingCard = document.createElement("div");
      trainingCard.className = "training-card";
      trainingCard.innerHTML = `
        <h4>${training.name}</h4>
        <p>${training.exercises.replace(/,/g, ", ")}</p>
        <button class="delete-training" data-id="${training.id}">USUŃ</button>
      `;
      trainingsContainer.appendChild(trainingCard);
    });

    // Obsługa przycisków usuwania
    document.querySelectorAll(".delete-training").forEach(btn => {
      btn.addEventListener("click", deleteTraining);
    });
  }

  // Usuwanie treningu
  function deleteTraining(e) {
    const id = parseInt(e.target.getAttribute("data-id"));
    let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
    
    trainings = trainings.filter(training => training.id !== id);
    localStorage.setItem("trainings", JSON.stringify(trainings));
    
    loadTrainings();
  }

  // Inicjalizacja
  loadTrainings();
});