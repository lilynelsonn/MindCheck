
const welcomeContent = document.querySelector(".welcome-content");

const questions = [
    {
        question: "How are you feeling right now?",
        options: ["Good", "Okay", "Anxious", "Low", "Frustrated"]
    },
    {
        question: "How would you describe your energy?",
        options: ["High", "Moderate", "Low"]
    },
    {
        question: "How connected do you feel to the people around you?",
        options: [
            "Very connected",
            "Somewhat connected",
            "A little disconnected",
            "Isolated"
        ]
    },
    {
        question: "How much has your mood affected your day?",
        options: [
            "Not at all",
            "A little",
            "Quite a lot",
            "Significantly"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

function startCheckIn() {
    currentQuestion = 0;
    answers = [];
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];

    welcomeContent.innerHTML = `
        <p class="logo">MindCheck</p>
        <p class="eyebrow">
            QUESTION ${currentQuestion + 1} OF ${questions.length}
        </p>

        <div class="progress-track">
            <div class="progress-fill"
                style="width: ${((currentQuestion + 1) / questions.length) * 100}%">
            </div>
        </div>

        <h1>${question.question}</h1>

        <p class="intro">
            Choose the answer that best describes how you feel.
        </p>

        <div class="answer-options">
            ${question.options.map(option => `
                <button class="answer-button"
                    data-answer="${option}">
                    ${option}
                </button>
            `).join("")}
        </div>

        <p class="disclaimer">
            There are no right or wrong answers.
        </p>
    `;

    document.querySelectorAll(".answer-button").forEach(button => {
        button.addEventListener("click", function() {
            answers.push(this.dataset.answer);
            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showReflection();
            }
        });
    });
}

function showReflection() {
    const mood = answers[0];
    let message = "";

    if (mood === "Good") {
        message = "It's lovely that you're feeling good today. Take a moment to appreciate what's going well.";
    } else if (mood === "Okay") {
        message = "It's okay to feel somewhere in the middle. You don't have to feel your best every day.";
    } else if (mood === "Anxious") {
        message = "It sounds like today might feel a little overwhelming. Consider taking a quiet moment and reaching out to someone you trust if you need support.";
    } else if (mood === "Low") {
        message = "It sounds like today may be difficult. Be gentle with yourself, and consider connecting with someone you trust.";
    } else {
        message = "It sounds like you may be feeling frustrated today. A pause or a conversation with someone you trust might help.";
    }

    welcomeContent.innerHTML = `
        <p class="logo">MindCheck</p>
        <p class="eyebrow">YOUR CHECK-IN SUMMARY</p>
        <h1>Thank you for checking in.</h1>
        <p class="intro">${message}</p>

        <h2>Your answers</h2>
        <div class="reflection-answers">
            ${questions.map((question, index) => `
                <p><strong>${question.question}</strong></p>
                <p>${answers[index]}</p>
            `).join("")}
        </div>

        <label for="journalEntry">
            <strong>Would you like to reflect a little more?</strong>
        </label>

        <textarea id="journalEntry"
            placeholder="Write anything that's on your mind..."
            rows="4"></textarea>

        <button id="finishButton">Finish Check-In</button>

        <p class="disclaimer">
            This tool supports self-reflection and is not a diagnostic tool.
        </p>
    `;

    document.getElementById("finishButton").addEventListener("click", function() {
        welcomeContent.innerHTML = `
            <p class="logo">MindCheck</p>
            <p class="eyebrow">CHECK-IN COMPLETE</p>
            <h1>You've made time for yourself.</h1>
            <p class="intro">
                Thank you for checking in. Remember, small moments of
                self-reflection can help you notice how you're feeling.
            </p>
            <button id="restartButton">Start Again</button>
        `;

        document.getElementById("restartButton").addEventListener("click", startCheckIn);
    });
}

document.getElementById("startButton").addEventListener("click", startCheckIn);