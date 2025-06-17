document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  let requestInProgress = false;

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    if (requestInProgress) return;
    requestInProgress = true;
    submitBtn.disabled = true;

    const exerciseData = {
      name: document.querySelector("input[type='text']").value.trim(),
      description: document.querySelector(".fixed-size").value.trim(),
      muscleGroup: document.querySelectorAll("input[type='text']")[1].value.trim()
    };

    // Cicha walidacja (bez komunikatów)
    if (!exerciseData.name || !exerciseData.muscleGroup) {
      requestInProgress = false;
      submitBtn.disabled = false;
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "../login/login.html";
        return;
      }

      const response = await fetch("http://localhost:5223/api/Exercise/CreateExerciseCommand", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exerciseData)
      });

      if (response.ok) {
        document.querySelector(".exercise-form").reset();
        // Cichy sukces - możesz dodać console.log jeśli potrzebujesz logów
      } else {
        console.error("Błąd serwera:", await response.text());
      }
    } catch (error) {
      console.error("Błąd:", error);
    } finally {
      requestInProgress = false;
      submitBtn.disabled = false;
    }
  });
});