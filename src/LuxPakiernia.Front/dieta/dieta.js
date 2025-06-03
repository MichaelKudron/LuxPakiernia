// Przykładowe dane startowe
const sampleMeals = [
  {
    id: 1,
    name: "Pasta kanapkowa z jajek i tuńczyka",
    ingredients: "jajka, tuńczyk w sosie własnym, jogurt grecki",
    macros: { carbs: "5g", protein: "25g", fat: "12g" },
    calories: "230"
  },
  {
    id: 2,
    name: "Placuszki ze Skyru waniliowego z borówkami",
    ingredients: "skyr, jajka, mąka, proszek do pieczenia, borówki",
    macros: { carbs: "40g", protein: "17g", fat: "3g" },
    calories: "259"
  },
  {
    id: 3,
    name: "Paluszki rybne z frytkami i surówką z czerwonej kapusty",
    ingredients: "kapusta czerwona,marchew,majonez,frytki, paluszki rybne",
    macros: { carbs: "89g", protein: "28g", fat: "40g" },
    calories: "825"
  },
  {
    id: 4,
    name: "Sałatka meksykańska",
    ingredients: "kukurydza,fasola,ananas,por,ser,papryka,majonez",
    macros: { carbs: "46g", protein: "23g", fat: "46g" },
    calories: "697"
  },
  {
    id: 5,
    name: "kruche ciasteczka z drażami",
    ingredients: "mąka,proszek do pieczenia,masło,jajko,kulki m&m's,sól",
    macros: { carbs: "17g", protein: "2g", fat: "7g" },
    calories: "138"
  },
  {
    id: 6,
    name: "Naleśniki z dżemem truskawkowym",
    ingredients: "jajko,mąka,cukier wanilinowy,mleko 2%, zimna woda, dżem",
    macros: { carbs: "46g", protein: "8g", fat: "3g" },
    calories: "240"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const mealForm = document.getElementById("mealForm");
  const mealsContainer = document.getElementById("mealsContainer");

  // Sprawdzenie i załadowanie przykładowych danych przy pierwszym uruchomieniu
  if (!localStorage.getItem("meals")) {
    localStorage.setItem("meals", JSON.stringify(sampleMeals));
  }

  // Funkcja ładowania posiłków
  function loadMeals() {
    let meals = [];
    try {
      meals = JSON.parse(localStorage.getItem("meals")) || [];
    } catch (e) {
      console.error("Błąd parsowania danych:", e);
      meals = sampleMeals;
    }
    mealsContainer.innerHTML = "";
    meals.forEach(meal => {
      const mealCard = document.createElement("div");
      mealCard.className = "meal-card";
      mealCard.innerHTML = `
        <div class="meal-front">
          <h4>${meal.name}</h4>
          <p>${meal.ingredients}</p>
        </div>
        <div class="meal-back">
          <div class="macros-grid">
            <div class="macro-item">
              <span class="macro-value">${meal.macros?.carbs || "0g"}</span>
              <span class="macro-label">węglowodany</span>
            </div>
            <div class="macro-item">
              <span class="macro-value">${meal.macros?.protein || "0g"}</span>
              <span class="macro-label">białko</span>
            </div>
            <div class="macro-item">
              <span class="macro-value">${meal.macros?.fat || "0g"}</span>
              <span class="macro-label">tłuszcze</span>
            </div>
          </div>
          <button class="delete-meal" data-id="${meal.id}">USUŃ</button>
        </div>
      `;
      mealsContainer.appendChild(mealCard);
    });

    // Obsługa przycisku USUŃ
    document.querySelectorAll(".delete-meal").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        const id = parseInt(this.getAttribute("data-id"));
        deleteMeal(id);
      });
    });
  }

  // Funkcja usuwania posiłku
  function deleteMeal(id) {
    let meals = JSON.parse(localStorage.getItem("meals")) || [];
    meals = meals.filter(meal => meal.id !== id);
    localStorage.setItem("meals", JSON.stringify(meals));
    loadMeals();
  }

  // Obsługa dodawania nowego posiłku
  mealForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const meal = {
      id: Date.now(),
      name: document.getElementById("mealName").value,
      ingredients: document.getElementById("mealIngredients").value,
      macros: {
        carbs: document.getElementById("mealCarbs")?.value || "0g",
        protein: document.getElementById("mealProtein")?.value || "0g",
        fat: document.getElementById("mealFat")?.value || "0g"
      },
      calories: document.getElementById("mealCalories")?.value || "0",
      category: document.getElementById("mealCategory")?.value || "inne"
    };

    const meals = JSON.parse(localStorage.getItem("meals")) || [];
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));

    mealForm.reset();
    loadMeals();
  });

  // Inicjalizacja
  loadMeals();
});
