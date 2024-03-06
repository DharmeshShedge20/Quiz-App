const questions = [
    {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        answers: [
            { text: "String", correct: false },
            { text: "Object", correct: true },
            { text: "Boolean", correct: false },
            { text: "Number", correct: false },
        ]
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "--", correct: false },
            { text: "/**/", correct: false },
        ]
    },
    {
        question: "What does the 'console.log()' function do in JavaScript?",
        answers: [
            { text: "Prompts the user for input", correct: false },
            { text: " Logs a message to the browser's console", correct: true },
            { text: "Displays an alert message", correct: false },
            { text: "Prints output to the printer", correct: false },
        ]
    },
    {
        question: "How do you declare a function in JavaScript?",
        answers: [
            { text: " func myFunction() {}", correct: false },
            { text: " function:myFunction() {}", correct: false },
            { text: " function myFunction() {}", correct: true },
            { text: "def myFunction() {}", correct: false },
        ]
    },
    {
        question: "What does the typeof operator return in JavaScript?",
        answers: [
            { text: "The type of a variable or expression.", correct: true },
            { text: "The value of a variable or expression.", correct: false },
            { text: "The size of a variable or expression.", correct: false },
            { text: "The name of a variable or expression.", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `you scored  ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

startQuiz();