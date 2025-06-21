/*************************************************************************
* Audio Control Logic
**************************************************************************/
let isPlaying = false;
const musicButton = document.getElementById('music');
const backgroundMusic = document.getElementById('backgroundMusic');

function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.pause();
        musicButton.classList.remove('playing');
        musicButton.querySelector('i').className = 'fa-solid fa-music';
        isPlaying = false;
    } else {
        // Try to play the audio
        backgroundMusic.play().then(() => {
            musicButton.classList.add('playing');
            musicButton.querySelector('i').className = 'fa-solid fa-pause';
            isPlaying = true;
        }).catch((error) => {
            console.log('Audio play failed:', error);
            alert('Unable to play audio. Please check if the audio file exists or try clicking again.');
        });
    }
}

// Handle audio ended event (shouldn't happen with loop, but just in case)
backgroundMusic.addEventListener('ended', function() {
    musicButton.classList.remove('playing');
    musicButton.querySelector('i').className = 'fa-solid fa-music';
    isPlaying = false;
});


const questions = [
  {
    topic: "random",
    question: "What is the capital of the Philippines?",
    possibleAnswers: ["Manila", "P", "Luzon"],
    correctAnswer: "Manila",
  },
  {
    topic: "tech",
    question: "What is the best language to learn?",
    possibleAnswers: ["javascript", "python", "ruby"],
    correctAnswer: "javascript",
  },
  {
    topic: "math",
    question: "what is 4 X 4",
    possibleAnswers: ["7", "16", "9", "10"],
    correctAnswer: "16",
  },
  {
    topic: "random",
    question: "What is the best drink on earth?",
    possibleAnswers: ["water", "monster", "redbull"],
    correctAnswer: "water",
  },
  {
    topic: "anime",
    question: "Who is the mc of dragonball?",
    possibleAnswers: ["vegita", "goku", "jotaro"],
    correctAnswer: "goku",
  },
  {
    topic: "anime",
    question: "Who is the mc of Violet Evergarden?",
    possibleAnswers: ["zoro", "Violet Evergarden", "jotaro"],
    correctAnswer: "Violet Evergarden",
  },
  {
    topic: "anime",
    question: "Who is the mc of One piece?",
    possibleAnswers: ["zoro", "Violet Evergarden", "Luffy"],
    correctAnswer: "Luffy",
  },
  {
    topic: "anime",
    question: "Who is the mc of jojos bizarre adventure part 7?",
    possibleAnswers: ["zoro", "Yohikage Kira", "Luffy"],
    correctAnswer: "Yohikage Kira",
  },
  {
    topic: "anime",
    question: "Who is the mc of jojos bizarre adventure part 2?",
    possibleAnswers: ["Joseph Joestar", "Yohikage Kira", "Luffy"],
    correctAnswer: "Joseph Joestar",
  },
  {
    topic: "anime",
    question: "Which of these is a character from arknights?",
    possibleAnswers: ["Joseph Joestar", "Amiya", "Jotaro"],
    correctAnswer: "Amiya",
  },
];

const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
let currentQuestionIndex = 0;
let score = 0;

function handleQuestion(index) {
  // handle quiz progress section
  quizProgress.innerHTML = "";
  questions.forEach((question) => {
    quizProgress.innerHTML += "<span></span>";
  });
  let spans = document.querySelectorAll("span");
  for (let i = 0; i <= index; i++) {
    spans[i].classList.add("seen");
  }

  // topic/question
  questionContainer.innerHTML = `<p>${questions[index].topic}</p>
  <p>${questions[index].question}</p>
  `;

  // answers
  answerContainer.innerHTML = "";
  questions[index].possibleAnswers.forEach((answer) => {
    answerContainer.innerHTML += `<button>${answer}</button>`;
  });
  let answers = document.querySelectorAll("button");
  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      if (e.target.textContent === questions[index].correctAnswer) {
        console.log("correct! ");
        score++;
      } else {
        console.log("wrong");
      }
      
      if (currentQuestionIndex === questions.length - 1) {
        // Quiz finished - show score
        showFinalScore();
      } else {
        currentQuestionIndex++;
        handleQuestion(currentQuestionIndex);
      }
    });
  });
}

function showFinalScore() {
  const percentage = Math.round((score / questions.length) * 100);
  
  // Clear progress bar
  quizProgress.innerHTML = "";
  
 // Show final score and restart button in the same container
  questionContainer.innerHTML = `
      <div class="score-display">
        <p class="complete">Quiz Complete!</p>
        <p class="final-score">Your Score: ${score}/${questions.length}</p>
        <p class="percentage">${percentage}%</p>
        <button class="restart-btn" onclick="restartQuiz()">Take Quiz Again</button>
      </div>
 
  `;

  // Clear answer container
  answerContainer.innerHTML = "";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  handleQuestion(currentQuestionIndex);
}

handleQuestion(currentQuestionIndex);