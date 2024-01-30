function validateAndSubmit() {
    document.getElementById("errorMessages").textContent = "";

    validateName("firstName");
    validateName("lastName");
    validateEmail("email");
    

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