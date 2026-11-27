const TIME_PER_QUESTION = 15;

// Questions array: stores questions, possible options, and the correct answer
const questions = [
  {
    question: "Which HTML tag is semantic and typically used for introductory content?",
    options: ["<div>", "<header>", "<span>", "<hr>"],
    answer: "<header>"
  },
  {
    question: "Which CSS property controls the space inside an element's border?",
    options: ["margin", "padding", "gap", "border-spacing"],
    answer: "padding"
  },
  {
    question: "Which method schedules a function to run repeatedly at a set interval in JavaScript?",
    options: ["setTimeout()", "requestAnimationFrame()", "setInterval()", "setImmediate()"],
    answer: "setInterval()"
  },
  {
    question: "Which array method creates a new array by transforming each element?",
    options: ["forEach()", "map()", "splice()", "reduceRight()"],
    answer: "map()"
  },
  {
    question: "How do you select an element with the ID 'quiz-box' in JavaScript?",
    options: [
      "document.querySelectorAll('.quiz-box')",
      "document.getElementById('quiz-box')",
      "document.getElementsByClassName('quiz-box')",
      "document.find('quiz-box')"
    ],
    answer: "document.getElementById('quiz-box')"
  }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timeLeft = TIME_PER_QUESTION;
let timerInterval = null;
let answered = false;

// DOM references
const questionProgressEl = document.getElementById("question-progress");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");

// Randomly shuffles a copy of the questions array (Fisher-Yates)
function shuffleQuestions() {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Starts/resets the countdown timer for the current question
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_PER_QUESTION;
  timerEl.textContent = `Time Left: ${timeLeft}s`;
  timerEl.classList.remove("warning");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 5) {
      timerEl.classList.add("warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) {
        checkAnswer(true);
      }
    }
  }, 1000);
}

// Displays the current question and answer options
function displayQuestion() {
  const current = shuffledQuestions[currentQuestionIndex];
  answered = false;
  selectedOption = null;

  questionProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
  questionTextEl.textContent = current.question;
  optionsContainerEl.innerHTML = "";

  feedbackSectionEl.textContent = "";
  feedbackSectionEl.className = "feedback-section";

  submitBtn.disabled = true;
  submitBtn.classList.remove("hidden");
  nextBtn.disabled = true;
  nextBtn.classList.remove("hidden");
  nextBtn.textContent =
    currentQuestionIndex === shuffledQuestions.length - 1 ? "Finish Quiz" : "Next Question";

  current.options.forEach((optionText) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = optionText;

    btn.addEventListener("click", () => {
      if (answered) return;
      selectedOption = optionText;
      submitBtn.disabled = false;

      document.querySelectorAll(".option-btn").forEach((el) => {
        el.classList.remove("selected");
      });
      btn.classList.add("selected");
    });

    optionsContainerEl.appendChild(btn);
  });

  startTimer();
}

// Checks whether the selected answer is correct and updates the score
function checkAnswer(timedOut = false) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const current = shuffledQuestions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === current.answer) {
      btn.classList.add("correct");
    } else if (btn.textContent === selectedOption && selectedOption !== current.answer) {
      btn.classList.add("incorrect");
    }
  });

  if (!timedOut && selectedOption === current.answer) {
    score++;
    feedbackSectionEl.textContent = "Correct! Nice job.";
    feedbackSectionEl.classList.add("correct");
  } else if (timedOut) {
    feedbackSectionEl.textContent = `Time's up! Correct answer: ${current.answer}`;
    feedbackSectionEl.classList.add("incorrect");
  } else {
    feedbackSectionEl.textContent = `Incorrect. Correct answer: ${current.answer}`;
    feedbackSectionEl.classList.add("incorrect");
  }

  scoreDisplayEl.textContent = `Score: ${score} / ${shuffledQuestions.length}`;
  submitBtn.disabled = true;
  nextBtn.disabled = false;
}

// Moves to the next question or finishes the quiz, resetting timer and updating score
function nextQuestion() {
  currentQuestionIndex++;
  scoreDisplayEl.textContent = `Score: ${score} / ${shuffledQuestions.length}`;

  if (currentQuestionIndex < shuffledQuestions.length) {
    displayQuestion();
  } else {
    clearInterval(timerInterval);
    questionProgressEl.textContent = "Quiz Completed";
    timerEl.textContent = "Done";
    timerEl.classList.remove("warning");
    questionTextEl.textContent = "You have completed the quiz!";
    optionsContainerEl.innerHTML = "";
    feedbackSectionEl.textContent = `Final Score: ${score} out of ${shuffledQuestions.length} (${Math.round(
      (score / shuffledQuestions.length) * 100
    )}%).`;
    feedbackSectionEl.className = "feedback-section correct";
    scoreDisplayEl.textContent = `Final Score: ${score} / ${shuffledQuestions.length}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  }
}

// Initializes and starts the quiz
function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  shuffledQuestions = shuffleQuestions();

  scoreDisplayEl.textContent = `Score: 0 / ${shuffledQuestions.length}`;
  restartBtn.classList.add("hidden");

  displayQuestion();
}

submitBtn.addEventListener("click", () => checkAnswer(false));
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Start quiz on page load
startQuiz();