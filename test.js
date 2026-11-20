
const questions = [
    {
        question: "HTML nə üçün istifadə olunur?",
        answers: [
            "Şəkil redaktə etmək üçün",
            "Veb səhifənin strukturunu yaratmaq üçün",
            "Kompüteri qorumaq üçün",
            "Video montaj etmək üçün"
        ],
        correct: 1
    },

    {
        question: "HTML-də ən böyük başlıq hansı teqlə yaradılır?",
        answers: [
            "<h6>",
            "<p>",
            "<h1>",
            "<head>"
        ],
        correct: 2
    },

    {
        question: "Mətni qalın göstərmək üçün hansı teqdən istifadə olunur?",
        answers: [
            "<i>",
            "<b>",
            "<u>",
            "<em>"
        ],
        correct: 1
    },

    {
        question: "CSS-də mətnin rəngini dəyişən xüsusiyyət hansıdır?",
        answers: [
            "font-size",
            "text-align",
            "background",
            "color"
        ],
        correct: 3
    },

    {
        question: "HTML-də alt indeks yaratmaq üçün hansı teq istifadə olunur?",
        answers: [
            "<sup>",
            "<sub>",
            "<strong>",
            "<mark>"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let points = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const numberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    numberElement.textContent =
        `Sual ${currentQuestion + 1} / ${questions.length}`;

    scoreElement.textContent = `Xal: ${points}`;

    questionElement.textContent = q.question;

    answersElement.innerHTML = "";

    feedback.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Nəticəni göstər →"
        : "Növbəti sual →";

    progress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);

    });
}

function selectAnswer(index, selectedButton) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const allButtons =
        document.querySelectorAll(".answer-btn");

    allButtons.forEach((button, i) => {

        button.disabled = true;

        if (i === q.correct) {
            button.classList.add("correct");
        }

    });

    if (index === q.correct) {

        points++;

        feedback.textContent = "✓ Əla! Cavabın doğrudur.";

        feedback.className = "feedback success";

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            "✗ Yanlış cavab! Düzgün cavab yaşıl rənglə göstərilib.";

        feedback.className = "feedback error";

    }

    scoreElement.textContent = `Xal: ${points}`;

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});

function showResult() {

    document.getElementById("quiz").hidden = true;

    document.getElementById("result").hidden = false;

    progress.style.width = "100%";

    document.getElementById("final-score").textContent =
        `${points} / ${questions.length}`;

    const percent = points / questions.length * 100;

    document.getElementById("percentage").textContent =
        `Nəticə: ${percent}%`;

    let message = "";

    if (points === 5) {
        message = "Mükəmməl! HTML biliklərin əladır!";
    } else if (points >= 3) {
        message = "Çox yaxşı! Bir az da məşq et.";
    } else {
        message = "Narahat olma! Mövzuları yenidən nəzərdən keçir.";
    }

    document.getElementById("result-message").textContent =
        message;
}

function restartQuiz() {

    currentQuestion = 0;
    points = 0;
    answered = false;

    document.getElementById("result").hidden = true;

    document.getElementById("quiz").hidden = false;

    showQuestion();
}

showQuestion();
