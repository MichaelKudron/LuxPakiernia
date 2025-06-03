document.getElementById("bmiForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const height = parseFloat(document.getElementById("height").value) / 100; // konwersja na metry
  const weight = parseFloat(document.getElementById("weight").value);
  const resultContainer = document.getElementById("bmiResult");
  
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    resultContainer.innerHTML = "<p class='error'>Wprowadź poprawne wartości!</p>";
    return;
  }
  
  const bmi = weight / (height * height);
  const roundedBmi = bmi.toFixed(2);
  
  let interpretation = "";
  if (bmi < 18.5) {
    interpretation = "Niedowaga";
  } else if (bmi >= 18.5 && bmi < 25) {
    interpretation = "Waga prawidłowa";
  } else if (bmi >= 25 && bmi < 30) {
    interpretation = "Nadwaga";
  } else {
    interpretation = "Otyłość";
  }
  
  resultContainer.innerHTML = `
    <p>Twoje BMI: <strong>${roundedBmi}</strong></p>
    <p>Interpretacja: <strong>${interpretation}</strong></p>
  `;
});