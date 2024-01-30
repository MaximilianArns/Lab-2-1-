function validateAndSubmit() {
    document.getElementById("errorMessages").textContent = "";
    document.getElementById("successMessage").textContent = "";

    validateName("firstName");
    validateName("lastName");
    validateEmail("email");
    
    validateRequiredQuestion("q1", "1: What is the capital of France?");
    validateRequiredQuestion("q2", "2: Which cities are Swedish cities?");
    
    if (document.getElementById("errorMessages").textContent.trim() !== "") {
            
        return;
    }

    document.getElementById("successMessage").textContent = "Quiz submitted successfully!";

}

function validateRequiredQuestion(questionName, questionText) {
    const questionInputs = document.querySelectorAll(`input[name="${questionName}"]:checked`);
    
    if (questionInputs.length === 0) {
        document.getElementById("errorMessages").textContent += `Please answer question ${questionText}\n`;
    }
}

function validateName(nameField) {
    const name = document.getElementById(nameField).value.trim();
    if (!isValidName(name)) {
        document.getElementById("errorMessages").textContent += `Please enter a valid ${nameField === "firstName" ? "first" : "last"} name (letters only).\n`;
    }
}

function validateEmail(emailField) {
    const email = document.getElementById(emailField).value.trim();
    if (!isValidEmail(email)) {
        document.getElementById("errorMessages").textContent += "Please enter a valid email address.\n";
    }
}

function isValidName(name) {
    return /^[a-zA-Z]+$/.test(name);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}