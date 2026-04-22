    document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const user = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const feedback = document.getElementById('feedback');

    let errors = [];

    // Sprawdzanie długości nazwy
    if (user.length < 3) errors.push("Nazwa użytkownika powinna mieć co najmniej 3 znaki");

    // Sprawdzanie formatu e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Niepoprawny format e-mail");

    // Sprawdzanie hasła
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/;
    if (!passRegex.test(pass)) {
        errors.push("Hasło za słabe (wymagana litera, cyfra i znak specjalny)");
    }

    feedback.style.display = "block";
    if (errors.length > 0) {
        feedback.innerHTML = "❌ " + errors.join("<br>❌ ");
        feedback.style.backgroundColor = "#ffebee";
        feedback.style.color = "#c62828";
    } else {
        feedback.innerHTML = "✅ Rejestracja pomyślna! Witaj w WiseGate.";
        feedback.style.backgroundColor = "#e8f5e9";
        feedback.style.color = "#2e7d32";

        document.querySelector('.api-container').style.display = 'block';
    }
});

    async function getAdvice() {
    const adviceDisplay = document.getElementById('advice-text');
    const btn = document.getElementById('api-btn');

    try {
        btn.disabled = true;
        btn.innerText = "Ładowanie...";
        
        // Pobieranie danych z API
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();

        adviceDisplay.innerText = `"${data.slip.advice}"`;
    } catch (error) {
        adviceDisplay.innerText = "Błąd połączenia z API.";
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.innerText = "Pobierz kolejną";
    }
}