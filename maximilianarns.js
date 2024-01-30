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

    calculateScore();
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

function calculateScore() {
    const totalQuestions = 5;
    
    const correctAnswers = [
        checkRadio("q1", "paris"),
        checkCheckbox("q2", ["stockholm", "sundsvall"]),
        checkText("q3", "swedish"),
        checkRadio("q4", "18"),
        checkCheckbox("q5", ["python", "java", "javascript"])
    ].reduce((sum, value) => sum + value, 0);

    const userScore = correctAnswers;

    document.getElementById("userScore").textContent = userScore;
    document.getElementById("totalQuestions").textContent = totalQuestions;

    document.getElementById("quizResult").style.display = "block";

     displayCorrectAnswer("q1", "Paris");
     displayCorrectAnswer("q2", ["Stockholm ", "Sundsvall"]);
     displayCorrectAnswer("q3", "swedish/Swedish");
     displayCorrectAnswer("q4", "18");
     displayCorrectAnswer("q5", ["Python ", "Java " , "JavaScript"]);
}

function checkRadio(questionName, correctValue) {
    const selectedValue = document.querySelector(`input[type="radio"][name="${questionName}"]:checked`);
    return selectedValue && selectedValue.value === correctValue ? 1 : 0;
}

function checkCheckbox(questionName, correctValues) {
    const selectedValues = Array.from(document.querySelectorAll(`input[type="checkbox"][name="${questionName}"]:checked`)).map(input => input.value);
    return arraysEqual(selectedValues.sort(), correctValues.sort()) ? 1 : 0;
}

function checkText(questionName, correctValue) {
    const userInput = document.querySelector(`input[type="text"][name="${questionName}"]`);
    return userInput && userInput.value.trim().toLowerCase() === correctValue.toLowerCase() ? 1 : 0;
}

function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

function displayCorrectAnswer(questionName, correctValues) {
    const correctAnswerElement = document.getElementById(`correctAnswer-${questionName}`);
    if (correctAnswerElement) {
        correctAnswerElement.textContent = `Correct Answer: ${correctValues}`;
    }
}