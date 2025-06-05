// Tablica do przechowywania posiłków
let meals = [];

// Funkcje do obsługi modala
function openModal() {
    document.getElementById('mealModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Zapobiega scrollowaniu w tle
}

function closeModal() {
    document.getElementById('mealModal').style.display = 'none';
    document.getElementById('mealForm').reset();
    document.body.style.overflow = 'auto'; // Przywraca scrollowanie
}

// Funkcja do usuwania posiłku
function deleteMeal(index) {
    if (confirm('Czy na pewno chcesz usunąć ten posiłek?')) {
        meals.splice(index, 1);
        saveMealsToStorage();
        renderMeals();
        showNotification('Posiłek został usunięty!', 'error');
    }
}

// Funkcja do wyświetlania powiadomień
function showNotification(message, type = 'success') {
    // Usuń poprzednie powiadomienie jeśli istnieje
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Dodaj style dla powiadomienia
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(145deg, #4CAF50, #45a049)' : 'linear-gradient(145deg, #f44336, #da190b)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-weight: bold;
    `;
    
    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Automatycznie usuń powiadomienie po 4 sekundach
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Dodaj animacje CSS dla powiadomień
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Funkcja do renderowania posiłków
function renderMeals() {
    const grid = document.getElementById('mealGrid');
    
    // Wyczyść istniejące posiłki (zachowaj przycisk dodawania)
    grid.innerHTML = `
        <div class="meal-card add-card" onclick="openModal()">
            <div class="add-icon">+</div>
            <div class="meal-name">Dodaj Posiłek</div>
        </div>
    `;

    // Dodaj każdy posiłek jako nowy kafelek
    meals.forEach((meal, index) => {
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        
        // Animacja pojawiania się nowego kafelka
        mealCard.style.opacity = '0';
        mealCard.style.transform = 'translateY(20px)';
        
        mealCard.innerHTML = `
            <button class="delete-btn" onclick="deleteMeal(${index})">&times;</button>
            <div class="meal-name">${meal.name}</div>
            <div class="ingredients">
                <strong>Składniki:</strong>
                ${meal.ingredients}
            </div>
            <div class="nutrition-info">
                <div class="nutrition-item">
                    <span class="nutrition-value">${meal.protein}g</span>
                    <span class="nutrition-label">Białko</span>
                </div>
                <div class="nutrition-item">
                    <span class="nutrition-value">${meal.carbs}g</span>
                    <span class="nutrition-label">Węglowodany</span>
                </div>
                <div class="nutrition-item">
                    <span class="nutrition-value">${meal.fat}g</span>
                    <span class="nutrition-label">Tłuszcze</span>
                </div>
            </div>
        `;
        
        grid.appendChild(mealCard);
        
        // Animacja pojawiania się z opóźnieniem
        setTimeout(() => {
            mealCard.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            mealCard.style.opacity = '1';
            mealCard.style.transform = 'translateY(0)';
        }, index * 100 + 100);
    });
}

// Funkcje do zapisywania i wczytywania z localStorage
function saveMealsToStorage() {
    try {
        localStorage.setItem('dietMeals', JSON.stringify(meals));
    } catch (error) {
        console.warn('Nie można zapisać danych do localStorage:', error);
    }
}

function loadMealsFromStorage() {
    try {
        const savedMeals = localStorage.getItem('dietMeals');
        if (savedMeals) {
            meals = JSON.parse(savedMeals);
        }
    } catch (error) {
        console.warn('Nie można wczytać danych z localStorage:', error);
        meals = [];
    }
}

// Obsługa formularza
document.addEventListener('DOMContentLoaded', function() {
    // Wczytaj zapisane posiłki
    loadMealsFromStorage();
    
    // Renderuj posiłki
    renderMeals();
    
    // Obsługa formularza dodawania posiłku
    document.getElementById('mealForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        
        // Walidacja danych
        const name = formData.get('mealName').trim();
        const ingredients = formData.get('ingredients').trim();
        const protein = parseFloat(formData.get('protein'));
        const carbs = parseFloat(formData.get('carbs'));
        const fat = parseFloat(formData.get('fat'));
        
        if (!name || !ingredients) {
            showNotification('Proszę wypełnić wszystkie pola!', 'error');
            return;
        }
        
        if (isNaN(protein) || isNaN(carbs) || isNaN(fat) || protein < 0 || carbs < 0 || fat < 0) {
            showNotification('Wartości odżywcze muszą być liczbami nieujemnymi!', 'error');
            return;
        }
        
        const meal = {
            name: name,
            ingredients: ingredients,
            protein: protein,
            carbs: carbs,
            fat: fat,
            dateAdded: new Date().toISOString()
        };
        
        meals.push(meal);
        saveMealsToStorage();
        renderMeals();
        closeModal();
        showNotification(`Posiłek "${name}" został dodany!`, 'success');
    });
    
    // Zamykanie modala po kliknięciu na tło
    window.onclick = function(event) {
        const modal = document.getElementById('mealModal');
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Obsługa klawiatury
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('mealModal');
            if (modal.style.display === 'block') {
                closeModal();
            }
        }
    });
});

// Funkcja do eksportu danych (bonus)
function exportMeals() {
    if (meals.length === 0) {
        showNotification('Brak danych do eksportu!', 'error');
        return;
    }
    
    const dataStr = JSON.stringify(meals, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `posilki_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Dane zostały wyeksportowane!', 'success');
}

// Funkcja do importu danych (bonus)
function importMeals(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedMeals = JSON.parse(e.target.result);
            if (Array.isArray(importedMeals)) {
                meals = importedMeals;
                saveMealsToStorage();
                renderMeals();
                showNotification('Dane zostały zaimportowane!', 'success');
            } else {
                showNotification('Nieprawidłowy format pliku!', 'error');
            }
        } catch (error) {
            showNotification('Błąd podczas importu danych!', 'error');
        }
    };
    reader.readAsText(file);
}

// Funkcja do wyszukiwania posiłków
function searchMeals(query) {
    const filteredMeals = meals.filter(meal => 
        meal.name.toLowerCase().includes(query.toLowerCase()) ||
        meal.ingredients.toLowerCase().includes(query.toLowerCase())
    );
    
    // Tymczasowo zapisz oryginalne posiłki
    const originalMeals = [...meals];
    meals = filteredMeals;
    renderMeals();
    
    // Przywróć oryginalne posiłki po renderowaniu
    setTimeout(() => {
        meals = originalMeals;
    }, 100);
}