const quizData = {
  music: [
    {
      question: "Who is the lead singer of the band Coldplay?",
      options: ["Chris Martin", "Adam Levine", "Bruno Mars", "Ed Sheeran"],
      answer: 0
    },
    {
      question: "Which pop singer's real name is Stefani Joanne Angelina Germanotta?",
      options: ["Taylor Swift", "Rihanna", "Lady Gaga", "Beyoncé"],
      answer: 2
    },
    {
      question: "Which song has the most views on YouTube?",
      options: ["Baby Shark Dance", "Gangnam Style", "Despacito", "Shape of You"],
      answer: 2
    }
  ],
  art: [
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Salvador Dalí"],
      answer: 0
    },
    {
      question: "Which artist is famous for his 'Campbell's Soup Cans'?",
      options: ["Andy Warhol", "Jackson Pollock", "Claude Monet", "Frida Kahlo"],
      answer: 0
    },
    {
      question: "Who created the sculpture 'David'?",
      options: ["Michelangelo", "Auguste Rodin", "Donatello", "Pietro Perugino"],
      answer: 0
    }
  ],
  coding: [
    {
      question: "What does HTML stand for?",
      options: ["Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyper Text Machine Learning"],
      answer: 2
    },
    {
      question: "What is the correct way to declare a JavaScript variable?",
      options: ["var name;", "name = var;", "variable name;", "let name;"],
      answer: 3
    },
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Colorful Style Sheet"],
      answer: 0
    }
  ]
};

let currentTopic = "";
let currentQuestion = 0;
let userAnswers = [];
let score = 0;

function startQuiz(topic) {
  currentTopic = topic;
  currentQuestion = 0;
  userAnswers = [];
  score = 0;
  showQuiz();
}

function showQuiz() {
  const container = document.querySelector(".container");
  const topics = document.querySelector(".topics");
  const quiz = document.querySelector(".quiz");
  const questionElem = document.querySelector(".question");
  const optionsElem = document.querySelector(".options");
  const buttons = document.querySelector(".buttons");
  const report = document.querySelector(".report");

  topics.style.display = "none";
  quiz.style.display = "block";
  report.style.display = "none";

  showQuestion();
  updateButtons();
  container.classList.add("fade-in");
}

function showQuestion() {
  const questionElem = document.querySelector(".question");
  const optionsElem = document.querySelector(".options");

  questionElem.innerText = quizData[currentTopic][currentQuestion].question;

  optionsElem.innerHTML = "";

  for (let i = 0; i < quizData[currentTopic][currentQuestion].options.length; i++) {
    const option = quizData[currentTopic][currentQuestion].options[i];
    const optionElem = document.createElement("div");
    optionElem.classList.add("option");
    optionElem.innerHTML = `
      <input type="radio" name="answer" id="option${i}" value="${i}">
      <label for="option${i}">${option}</label>
    `;
    optionsElem.appendChild(optionElem);
  }
}

function nextQuestion() {
  const options = document.getElementsByName("answer");
  let answer = -1;
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      answer = parseInt(options[i].value);
      break;
    }
  }

  if (answer === -1) {
    alert("Please select an answer!");
    return;
  }

  userAnswers[currentQuestion] = answer;

  if (currentQuestion < quizData[currentTopic].length - 1) {
    currentQuestion++;
    showQuestion();
    updateButtons();
  } else {
    calculateScore();
    showReport();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
    updateButtons();
  }
}

function updateButtons() {
  const buttons = document.querySelector(".buttons");

  if (currentQuestion === 0) {
    buttons.innerHTML = `
      <button class="btn" onclick="prevQuestion()" disabled>Previous</button>
      <button class="btn" onclick="nextQuestion()">Next</button>
    `;
  } else if (currentQuestion === quizData[currentTopic].length - 1) {
    buttons.innerHTML = `
      <button class="btn" onclick="prevQuestion()">Previous</button>
      <button class="btn" onclick="nextQuestion()">Finish</button>
    `;
  } else {
    buttons.innerHTML = `
      <button class="btn" onclick="prevQuestion()">Previous</button>
      <button class="btn" onclick="nextQuestion()">Next</button>
    `;
  }

  buttons.classList.add("slide-in-left");
}

function calculateScore() {
  score = 0;
  for (let i = 0; i < quizData[currentTopic].length; i++) {
    if (userAnswers[i] === quizData[currentTopic][i].answer) {
      score++;
    }
  }
}

function showReport() {
  const quiz = document.querySelector(".quiz");
  const report = document.querySelector(".report");
  const reportText = document.createElement("p");
  reportText.innerHTML = `
    You have completed the ${currentTopic} quiz!<br>
    Your score is <span class="score">${score}/${quizData[currentTopic].length}</span>.
  `;
  report.innerHTML = "";
  report.appendChild(reportText);
  quiz.style.display = "none";
  report.style.display = "block";
  report.classList.add("slide-in-right");
}

