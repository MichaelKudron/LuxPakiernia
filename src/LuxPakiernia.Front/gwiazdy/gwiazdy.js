document.addEventListener("DOMContentLoaded", () => {
  const starsData = [
    {
      name: "Arnold Schwarzenegger",
      image: "../assets/arnold.jpg",
      description: "7-krotny Mr. Olympia, aktor, polityk. Ikona kulturystyki.",
      category: "Kulturystyka"
    },
    {
      name: "Ronnie Coleman",
      image: "../assets/ronnie.jpg",
      description: "8-krotny Mr. Olympia, znany z niesamowitej masy mięśniowej.",
      category: "Kulturystyka"
    },
    {
      name: "Sam Sulek",
      image: "../assets/sulek.jpg",
      description: "Wielki nastolatek na grubym towarze",
      category: "Influencer"
    },
    {
      name: "Dwayne Johnson",
      image: "../assets/rock.jpg",
      description: "The Rock - gwiazda WWE, aktor, ikona fitnessu.",
      category: "Fitness"
    },
    {
      name: "Tren Twins",
      image: "../assets/tren.jpg",
      description: "Dwaj bliźniacy wstrzukujący sobie doping dla koni wyścigowych",
      category: "Influencerzy"
    },
    {
      name: "Kevin Levrone",
      image: "../assets/kevin.jpg",
      description: "Drugie miejsce na Mr. OLympia, wielu ekspertów twierdzi że okradziony z tytułu",
      category: "Kulturystyka"
    }
  ];

  const carousel = document.getElementById("starsCarousel");
  const dotsContainer = document.getElementById("starsDots");
  let currentIndex = 0;

  // Tworzenie slajdów
  starsData.forEach((star, index) => {
    const slide = document.createElement("div");
    slide.className = "star-slide";
    slide.innerHTML = `
      <img src="${star.image}" alt="${star.name}">
      <div class="star-info">
        <span class="star-category">${star.category}</span>
        <h3>${star.name}</h3>
        <p>${star.description}</p>
      </div>
    `;
    carousel.appendChild(slide);

    // Tworzenie kropek nawigacyjnych
    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Przyciski nawigacyjne
  document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : starsData.length - 1;
    updateCarousel();
  });

  document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex < starsData.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Automatyczne przewijanie
  let autoScroll = setInterval(() => {
    currentIndex = (currentIndex < starsData.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  }, 5000);

  // Funkcja aktualizująca karuzelę
  function updateCarousel() {
    const slides = document.querySelectorAll(".star-slide");
    const dots = document.querySelectorAll(".dot");
    
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
    
    // Reset autoscroll
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
      currentIndex = (currentIndex < starsData.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    }, 5000);
  }

  // Przejdź do konkretnego slajdu
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Obsługa gestów na urządzeniach dotykowych
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Przesunięcie w lewo - następny slajd
      currentIndex = (currentIndex < starsData.length - 1) ? currentIndex + 1 : 0;
    } else if (touchEndX > touchStartX + 50) {
      // Przesunięcie w prawo - poprzedni slajd
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : starsData.length - 1;
    }
    updateCarousel();
  }
});