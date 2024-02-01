// Function to validate input from user
function validateAndSubmit() {

    // Clear previous messages
    document.getElementById("errorMessages").textContent = "";
    document.getElementById("successMessage").textContent = "";

    // Validate names and email
    validateName("firstName");
    validateName("lastName");
    validateEmail("email");
    
     // Validate required questions
    validateRequiredQuestion("q1", "1: What is the capital of France?");
    validateRequiredQuestion("q2", "2: Which cities are Swedish cities?");
    validateRequiredQuestion("q4", "4. How old do you need to be to be considered an adult?");
    
    // Display error messages
    if (document.getElementById("errorMessages").textContent.trim() !== "") {
            
        return;
    }

    // Display success message
    document.getElementById("successMessage").textContent = "Quiz submitted successfully!";

    calculateScore();
}

// Checks if the required questions got answered
function validateRequiredQuestion(questionName, questionText) {
    const questionInputs = document.querySelectorAll(`input[name="${questionName}"]:checked`);
    
    if (questionInputs.length === 0) {
        document.getElementById("errorMessages").textContent += `Please answer question ${questionText}\n`;
    }
}

// Function to validate names (letters only)
function validateName(nameField) {
    const name = document.getElementById(nameField).value.trim();
    if (!isValidName(name)) {
        document.getElementById("errorMessages").textContent += `Please enter a valid ${nameField === "firstName" ? "first" : "last"} name (letters only). `;
    }
}

// Function to validate email format
function validateEmail(emailField) {
    const email = document.getElementById(emailField).value.trim();
    if (!isValidEmail(email)) {
        document.getElementById("errorMessages").textContent += "Please enter a valid email address. ";
    }
}

// Sets the requirements for the last name and first name inputs
function isValidName(name) {
    return /^[a-zA-Z]+$/.test(name);
}

// Sets the requirements for a valid email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to calculate the users score
function calculateScore() {

    //Sets the total question score thats available to 5
    const totalQuestions = 5;
    
    // These are the correct answers
    const correctAnswers = [
        checkRadio("q1", "paris"),
        checkCheckbox("q2", ["stockholm", "sundsvall"]),
        checkText("q3", "swedish"),
        checkRadio("q4", "18"),
        checkCheckbox("q5", ["python", "java", "javascript"])
    ].reduce((sum, value) => sum + value, 0);

    // Creates the users score
    const userScore = correctAnswers;

    // Sends the users score and the total score to the html file
    document.getElementById("userScore").textContent = userScore;
    document.getElementById("totalQuestions").textContent = totalQuestions;


    // Display correct answers for each question
     displayCorrectAnswer("q1", "Paris");
     displayCorrectAnswer("q2", ["Stockholm ", "Sundsvall"]);
     displayCorrectAnswer("q3", "Swedish");
     displayCorrectAnswer("q4", "18");
     displayCorrectAnswer("q5", ["Python ", "Java " , "JavaScript"]);
}

// Checks if the user put in the right answer for the questions with radio buttons
function checkRadio(questionName, correctValue) {
    const selectedValue = document.querySelector(`[name="${questionName}"]:checked`);
    return selectedValue.value === correctValue ? 1 : 0;
}

// Checks if the user put in the right answer for the questions with checkboxes
function checkCheckbox(questionName, correctValues) {
    const selectedValues = Array.from(document.querySelectorAll(`[name="${questionName}"]:checked`)).map(input => input.value);
    return arraysEqual(selectedValues.sort(), correctValues.sort()) ? 1 : 0;
}

// Checks if the user put in the right answer for the question with open-ended text entry
function checkText(questionName, correctValue) {
    const userInput = document.querySelector(`[name="${questionName}"]`);
    return userInput.value.trim().toLowerCase() === correctValue ? 1 : 0;
}

// Function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

// Display the correct answer for a specific question
function displayCorrectAnswer(questionName, correctValues) {
    const correctAnswerElement = document.getElementById(`correctAnswer-${questionName}`);
    if (correctAnswerElement) {
        correctAnswerElement.textContent = `Correct Answer: ${correctValues}`;
    }
}

//Code for Grade 5, that I didn't finish
let questionCount = 1;

function addQuestion() {
    const questionsContainer = document.getElementById('questionsContainer');

    const newQuestionContainer = document.createElement('div');
    newQuestionContainer.classList.add('question-container');

    const questionTextInput = document.createElement('input');
    questionTextInput.type = 'text';
    questionTextInput.placeholder = 'Enter your question here...';

    const possibleAnswersInput = document.createElement('input');
    possibleAnswersInput.type = 'text'
    possibleAnswersInput.placeholder = 'Enter possible answers, separated by commas...';

    const correctAnswerInput = document.createElement('input');
    correctAnswerInput.type = 'text';
    correctAnswerInput.placeholder = 'Enter correct answer(s), separated by commas...';

    const answerTypeRadios = document.createElement('div');
    const textInputRadio = createRadioButton('answerType-' + questionCount, 'text', 'Text Input');
    const multipleChoiceRadio = createRadioButton('answerType-' + questionCount, 'multipleChoice', 'Multiple Choice');
    const radioButtonsRadio = createRadioButton('answerType-' + questionCount, 'radioButtons', 'Radio Buttons');

    newQuestionContainer.appendChild(questionTextInput);
    newQuestionContainer.appendChild(possibleAnswersInput);
    newQuestionContainer.appendChild(correctAnswerInput);
    newQuestionContainer.appendChild(answerTypeRadios);
    answerTypeRadios.appendChild(textInputRadio);
    answerTypeRadios.appendChild(multipleChoiceRadio);
    answerTypeRadios.appendChild(radioButtonsRadio);

    questionsContainer.appendChild(newQuestionContainer);

    questionCount++;
}

function createRadioButton(name, value, labelText) {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.value = value;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(labelText));

    return label;
}