document.addEventListener("DOMContentLoaded", () => {
  const exercisesData = [
    {
      name: "Unoszenie hantli (biceps)",
      category: "Ramiona",
      description: "Klasyczne ćwiczenie na mięśnie dwugłowe ramion",
      howTo: "Stań prosto, hantle trzymaj wzdłuż tułowia. Uginaj łokcie unosząc hantle do barków, kontroluj ruch w dół.",
      images: ["../assets/hantle.jpg"]
    },
    {
      name: "Pompki",
      category: "Klatka piersiowa",
      description: "Podstawowe ćwiczenie na klatkę piersiową i triceps",
      howTo: "Dłonie na szerokość barków, ciało w linii prostej. Opuszczaj klatkę do podłogi, utrzymując napięte mięśnie brzucha.",
      images: ["../assets/pompki.jpg"]
    },
    {
      name: "Przysiady",
      category: "Nogi",
      description: "Ćwiczenie na mięśnie nóg i pośladków",
      howTo: "Stopy na szerokość barków, plecy proste. Schodź w dół jakbyś siadał na krześle, kolana nie powinny wychodzić przed palce.",
      images: ["../assets/przysiady.jpg"]
    },
    {
      name: "Martwy ciąg",
      category: "Plecy",
      description: "Ćwiczenie kompleksowe na plecy i nogi",
      howTo: "Stopy na szerokość bioder, uchwyt na szerokość barków. Podnoś sztangę prowadząc blisko nóg, prostuj się w biodrach i kolanach.",
      images: ["../assets/martwy.jpg"]
    },
    {
      name: "Plank (deska)",
      category: "Brzuch",
      description: "Ćwiczenie wzmacniające core",
      howTo: "Podpór na przedramionach, ciało w linii prostej. Napnij brzuch i pośladki, utrzymaj pozycję 30-60 sekund.",
      images: ["../assets/plank.jpg"]
    }
  ];

  const exercisesList = document.querySelector(".exercises-list");

  function displayExercises(data = exercisesData) {
    exercisesList.innerHTML = "";

    data.forEach((exercise) => {
      const exerciseCard = document.createElement("div");
      exerciseCard.className = "exercise-card";

      let carouselHTML = "";
      if (exercise.images && exercise.images.length > 0) {
        const imagesHTML = exercise.images.map((src, idx) =>
          `<img src="${src}" class="carousel-image ${idx === 0 ? "active" : ""}" alt="Zdjęcie ćwiczenia">`
        ).join("");

        carouselHTML = `
          <div class="carousel">
            ${imagesHTML}
          </div>
        `;
      }

      exerciseCard.innerHTML = `
        <h3>${exercise.name}</h3>
        ${carouselHTML}
        <div class="description">${exercise.description}</div>
        <div class="how-to">
          <strong>Jak wykonać:</strong> ${exercise.howTo}
        </div>
      `;

      exercisesList.appendChild(exerciseCard);
    });
  }

  function getSelectedCategory() {
    const checked = document.querySelector(".filter-checkbox:checked");
    return checked ? checked.value : null;
  }

  function filterAndDisplay() {
    const selected = getSelectedCategory();
    if (!selected) {
      displayExercises(exercisesData);
    } else {
      const selectedFirst = exercisesData.filter(ex => ex.category === selected);
      const rest = exercisesData.filter(ex => ex.category !== selected);
      displayExercises([...selectedFirst, ...rest]);
    }
  }

  // Tylko jeden checkbox może być aktywny
  document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      if (cb.checked) {
        document.querySelectorAll(".filter-checkbox").forEach(other => {
          if (other !== cb) other.checked = false;
        });
      }
      filterAndDisplay();
    });
  });

  displayExercises();
});
