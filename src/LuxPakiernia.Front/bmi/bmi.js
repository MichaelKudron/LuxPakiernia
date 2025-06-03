// Funkcja obliczająca BMI
function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

// Funkcja interpretująca wynik
function interpretBMI(bmi) {
  if (bmi < 18.5) return "Niedowaga";
  if (bmi < 25) return "Waga prawidłowa";
  if (bmi < 30) return "Nadwaga";
  return "Otyłość";
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener("DOMContentLoaded", function() {
  // Obsługa formularza
  const bmiForm = document.getElementById("bmiForm");
  const resultContainer = document.getElementById("bmiResult");

  if (bmiForm) {
    bmiForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const height = parseFloat(document.getElementById("height").value);
      const weight = parseFloat(document.getElementById("weight").value);

      // Walidacja
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultContainer.innerHTML = '<p class="error">Wprowadź poprawne wartości!</p>';
        return;
      }

      // Obliczenia
      const bmi = calculateBMI(height, weight);
      const interpretation = interpretBMI(bmi);

      // Wyświetl wynik
      resultContainer.innerHTML = `
        <p>Twoje BMI: <strong>${bmi}</strong></p>
        <p>Interpretacja: <strong>${interpretation}</strong></p>
      `;
    });
  }

  // Wymuś aktualizację trybu ciemnego
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    const toggle = document.getElementById("darkModeToggle");
    if (toggle) toggle.checked = true;
  }
});