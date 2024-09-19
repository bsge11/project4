const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
    correctAnswer: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const questionElement = document.getElementById('question');
  const choicesElements = document.querySelectorAll('.choice');
  questionElement.textContent = questions[currentQuestionIndex].question;

  choicesElements.forEach((button, index) => {
    button.textContent = questions[currentQuestionIndex].choices[index];
    button.style.backgroundColor = "#007bff"; // Reset button colors
  });

  // Generate a random color
  const randomColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
  document.body.style.backgroundColor = randomColor;
  
  answered = false;
}

function selectAnswer(choiceIndex) {
  if (answered) return; // Prevent multiple answers
  
  const correctSound = document.getElementById('correct-sound');
  const wrongSound = document.getElementById('wrong-sound');
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const choicesElements = document.querySelectorAll('.choice');
  
  if (choiceIndex === correctAnswer) {
    choicesElements[choiceIndex].style.backgroundColor = "green";
    score++;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    choicesElements[choiceIndex].style.backgroundColor = "red";
    choicesElements[correctAnswer].style.backgroundColor = "green";
    wrongSound.play();
  }
  
  document.getElementById('score').textContent = `Score: ${score}`;
  answered = true;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    document.getElementById('question').textContent = "Quiz Complete!";
    document.querySelector('.choices').style.display = "none";
    document.getElementById('next-btn').style.display = "none";
  } else {
    loadQuestion();
  }
}

// Initialize quiz
loadQuestion();
