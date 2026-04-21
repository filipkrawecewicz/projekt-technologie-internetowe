// WALIDACJA FORMULARZA (3.0 / 3.5)
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const user = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const feedback = document.getElementById('feedback');

    let errors = [];

    // Walidacja długości nazwy
    if (user.length < 3) errors.push("Użytkownik: min. 3 znaki");

    // Walidacja Email (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Niepoprawny format e-mail");

    // Walidacja Hasła (Regex na 3.5: min 8 znaków, litera, cyfra, znak specjalny)
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passRegex.test(pass)) {
        errors.push("Hasło za słabe (wymagana litera, cyfra i znak specjalny)");
    }

    feedback.style.display = "block";
    if (errors.length > 0) {
        feedback.innerHTML = "❌ " + errors.join("<br>❌ ");
        feedback.style.backgroundColor = "#ffebee";
        feedback.style.color = "#c62828";
    } else {
        feedback.innerHTML = "✅ Rejestracja pomyślna!";
        feedback.style.backgroundColor = "#e8f5e9";
        feedback.style.color = "#2e7d32";
    }
});

// OBSŁUGA API (4.0)
async function getAdvice() {
    const adviceDisplay = document.getElementById('advice-text');
    const btn = document.getElementById('api-btn');

    try {
        btn.disabled = true;
        btn.innerText = "Ładowanie...";
        
        // Pobieranie danych z zewnętrznego API
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();

        // Wyświetlenie porady (slip.advice to pole w tym konkretnym API)
        adviceDisplay.innerText = `"${data.slip.advice}"`;
    } catch (error) {
        adviceDisplay.innerText = "Błąd połączenia z API.";
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.innerText = "Pobierz kolejną";
    }
}