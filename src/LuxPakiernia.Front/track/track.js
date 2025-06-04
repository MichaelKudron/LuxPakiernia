document.addEventListener("DOMContentLoaded", () => {
  // Przykładowe dane startowe
  const sampleProgress = [
    {
      id: 1,
      date: "2023-05-15",
      weight: 75.5,
      workout: "FBW"
    },
    {
      id: 2,
      date: "2023-05-22",
      weight: 74.8,
      workout: "Cardio"
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
  
  // Walidacja danych
  const weightInput = document.getElementById("weight");
  if (!weightInput.value || isNaN(weightInput.value)) {
    alert("Podaj poprawną wagę!");
    return;
  }

  const measurement = {
    id: Date.now(),
    date: document.getElementById("measurementDate").value || new Date().toISOString().split('T')[0],
    weight: parseFloat(weightInput.value),
    workout: document.getElementById("workoutName").value.trim() || "Brak treningu"
  };

  let progressData = JSON.parse(localStorage.getItem("progress")) || [];
  progressData.push(measurement);
  localStorage.setItem("progress", JSON.stringify(progressData));

  loadProgressData();
  progressForm.reset();
});

  // Ładowanie danych
function loadProgressData() {
  // 1. Pobierz dane z LocalStorage z obsługą błędów
  let progressData;
  try {
    const storedData = localStorage.getItem('progress');
    progressData = storedData ? JSON.parse(storedData) : [];
    
    // Jeśli brak danych, zainicjuj przykładowymi
    if (!progressData || progressData.length === 0) {
      progressData = [...sampleProgress]; // Kopiujemy przykładowe dane
      localStorage.setItem('progress', JSON.stringify(progressData));
    }
  } catch (error) {
    console.error('Błąd ładowania danych:', error);
    progressData = [...sampleProgress]; // Użyj przykładowych danych jeśli parsowanie się nie uda
    localStorage.setItem('progress', JSON.stringify(progressData));
  }

  // 2. Wyczyść kontener przed załadowaniem nowych danych
  progressContainer.innerHTML = '';

  // 3. Sortuj od najnowszych do najstarszych
  progressData.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 4. Generuj kartę dla każdego pomiaru
  progressData.forEach(measurement => {
    // Walidacja danych pomiaru
    const safeDate = measurement.date || 'Nieznana data';
    const safeWeight = typeof measurement.weight === 'number' ? 
                      measurement.weight.toFixed(1) + ' kg' : 
                      'Brak danych';
    const safeWorkout = measurement.workout || 'Brak treningu';

    const progressCard = document.createElement('div');
    progressCard.className = 'progress-card';
    progressCard.innerHTML = `
      <div class="progress-header">
        <span class="progress-date">${formatDate(safeDate)}</span>
        <button class="delete-progress" data-id="${measurement.id}">USUŃ</button>
      </div>
      <div class="progress-stats">
        <div class="stat-item">
          <span class="stat-label">Waga:</span>
          <span class="stat-value">${safeWeight}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Trening:</span>
          <span class="stat-value">${safeWorkout}</span>
        </div>
      </div>
    `;
    progressContainer.appendChild(progressCard);
  });

  // 5. Dodaj obsługę przycisków usuwania
  document.querySelectorAll('.delete-progress').forEach(btn => {
    btn.addEventListener('click', deleteProgress);
  });

  // 6. Funkcja pomocnicza do formatowania daty
  function formatDate(dateString) {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('pl-PL', options);
    } catch (e) {
      return dateString; // Zwróć oryginalny string jeśli data jest nieprawidłowa
    }
  }
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