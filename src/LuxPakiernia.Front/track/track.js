document.addEventListener("DOMContentLoaded", () => {
  // Przykładowe dane startowe
  const sampleProgress = [
    {
      id: 1,
      date: "2023-05-15",
      weight: 75.5,
      muscleMass: 35.2
    },
    {
      id: 2,
      date: "2023-05-22",
      weight: 74.8,
      muscleMass: 35.5
    }
  ];

  // Inicjalizacja danych
  if (!localStorage.getItem('progress') || JSON.parse(localStorage.getItem('progress')).length === 0) {
    localStorage.setItem('progress', JSON.stringify(sampleProgress));
  }

  // Obsługa formularza
  const progressForm = document.getElementById("progressForm");
  const progressContainer = document.getElementById("progressContainer");

  progressForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const measurement = {
      id: Date.now(),
      date: document.getElementById("measurementDate").value,
      weight: parseFloat(document.getElementById("weight").value),
      muscleMass: parseFloat(document.getElementById("muscleMass").value) || null
    };

    const progressData = JSON.parse(localStorage.getItem("progress")) || [];
    progressData.push(measurement);
    localStorage.setItem("progress", JSON.stringify(progressData));

    progressForm.reset();
    loadProgressData();
  });

  // Ładowanie danych
  function loadProgressData() {
    const progressData = JSON.parse(localStorage.getItem("progress")) || [];
    progressContainer.innerHTML = "";
    
    // Sortowanie od najnowszych
    progressData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    progressData.forEach(measurement => {
      const progressCard = document.createElement("div");
      progressCard.className = "progress-card";
      progressCard.innerHTML = `
        <h4>${formatDate(measurement.date)}</h4>
        <div class="progress-stats">
          <div class="stat-item">
            <span>Waga:</span>
            <strong>${measurement.weight} kg</strong>
          </div>
          ${measurement.muscleMass ? `
          <div class="stat-item">
            <span>Masa mięśniowa:</span>
            <strong>${measurement.muscleMass} kg</strong>
          </div>
          ` : ''}
        </div>
        <button class="delete-progress" data-id="${measurement.id}">USUŃ</button>
      `;
      progressContainer.appendChild(progressCard);
    });

    // Obsługa przycisków usuwania
    document.querySelectorAll(".delete-progress").forEach(btn => {
      btn.addEventListener("click", deleteProgress);
    });
  }

  // Usuwanie pomiaru
  function deleteProgress(e) {
    const id = parseInt(e.target.getAttribute("data-id"));
    let progressData = JSON.parse(localStorage.getItem("progress")) || [];
    
    progressData = progressData.filter(item => item.id !== id);
    localStorage.setItem("progress", JSON.stringify(progressData));
    
    loadProgressData();
  }

  // Formatowanie daty
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
  }

  // Ustawienie domyślnej daty na dzisiaj
  document.getElementById("measurementDate").valueAsDate = new Date();

  // Inicjalizacja
  loadProgressData();
});