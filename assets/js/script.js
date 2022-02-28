const timerEl = document.getElementById('timer');
const instructionsEl = document.getElementById('instruction');
const startButtonEl = document.getElementById('start-btn');
const questionContainerEl = document.getElementById('question-container');
const answerBtnsEl = document.querySelectorAll('.answer-btn');
const titleEl = document.getElementById('title-text');
const resultsEl = document.getElementById('results');
const scoreContainerEl = document.getElementById('score-container');
const highScoreEl = document.getElementById('high-score-container');
const scoreValEl = document.getElementById('score-value');
const inputValEl = document.getElementById('initials');
const initialValueEl = document.querySelector('.initials-value');
const inputFormEl = document.getElementById('input-form');
const initialLabelEl = document.getElementById('initial-label');
const submitBtnEl = document.getElementById('submit-btn');
const restartBtnEl = document.getElementById('restart-btn');
const clearBtnEl = document.getElementById('clear-btn');
const answerOne = document.getElementById('choice-one');
const answerTwo = document.getElementById('choice-two');
const answerThree = document.getElementById('choice-three');
const answerFour = document.getElementById('choice-four');



let timeLeft = 100;
let questionIndex = 0;
let score = [];
let username = [];

function timer() {
    let interval = setInterval(function() {
        if (timeLeft >= 1) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else {
            alert('You are out of time.');
            localStorage.setItem('score', JSON.stringify(0));
            clearInterval(interval);
            initialsPage();
        }
    }, 1000);
}

function startQuiz() {
    timer();
    instructionsEl.classList.add('hidden');
    startButtonEl.classList.add('hidden');
    showQuestion();
    nextQuestion();
}

function showQuestion() {
    questionContainerEl.classList.remove('hidden');
}

function nextQuestion() {
    if (questionIndex >= questions.length) {
        localStorage.setItem('score', JSON.stringify(timerEl.textContent));
        initialsPage();
    } else {
        for (var i = 0; i < answerBtnsEl.length; i++) {
            answerBtnsEl[i].textContent = questions[questionIndex].answers[i].text;
            answerBtnsEl[i].dataset.correct = questions[questionIndex].answers[i].correct;
        }
        titleEl.textContent = questions[questionIndex].question;
        questionIndex ++;
    }
}

function answerHandler(event) {
    let correct = event.target.dataset.correct;
    if (correct === 'true') {
        nextQuestion();
    } else {
        timeLeft -= 10;
        alert('Incorrect');
    }
}

function initialsPage() {
    resultsEl.style.display = "flex";
    scoreContainerEl.classList.add('hidden');
    titleEl.textContent = "Input your initials below:";
    // timerEl.classList.add('hidden');
    questionContainerEl.classList.add('hidden');
    highScoreEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    getScore();
}

function getScore() {
    let savedScore = localStorage.getItem('score');
    if (!savedScore) {
        return false;
    }
    console.log('Saved score found!')
    savedScore = JSON.parse(savedScore);
    score.push(savedScore);
    for (var i = 0; i < score.length; i++) {
        scoreValEl.textContent = score[i];
    }
}

function submit(event) {
    event.preventDefault();
    setInputValue();
}

function setInputValue() {
    localStorage.setItem('user', JSON.stringify(inputValEl.value));
    getInputValue()
}

function getInputValue() {
    let savedName = localStorage.getItem('user');
    console.log('saved name found');
    savedName = JSON.parse(savedName);
    username.push(savedName);
    for (var i = 0; i < username.length; i++) {
        initialValueEl.textContent = username[i];
    }

    highScorePage();
}

function highScorePage() {
    inputFormEl.classList.add('hidden');
    initialLabelEl.classList.add('hidden');
    inputValEl.classList.add('hidden');
    submitBtnEl.classList.add('hidden');
    highScoreEl.classList.remove('hidden');
    restartBtnEl.classList.remove('hidden');
    clearBtnEl.classList.remove('hidden');
    titleEl.textContent = 'Score';
}

function restart() {
    location.reload();
}

function clearHighScores() {
    localStorage.clear();
    clearBtnEl.classList.add('hidden');
    titleEl.textContent = "Cleared";
    resultsEl.textContent = '';
}

const questions = [
    {
        question: "Commonly used data types do NOT include...",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ]
    },
    
    {
        question: "The condition in an if/else statement is enclosed within...",
        answers: [
            { text: "quotes", correct: false },
            { text: "parentheses", correct: true },
            { text: "curly brackets", correct: false },
            { text: "square brackets", correct: false }
        ]
    },

    {
        question: "Arrays in JavaScript can be used to store...",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of these", correct: true }
        ]
    },

    {
        question: "Within what must string values be enclosed when being assigned to variables?",
        answers: [
            { text: "commas", correct: false },
            { text: "quotes", correct: true },
            { text: "curly brackets", correct: false },
            { text: "parentheses", correct: false }
        ]
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is...",
        answers: [
            { text: "console.log", correct: true },
            { text: "terminal/bash", correct: false },
            { text: "JavaScript", correct: false },
            { text: "for loops", correct: false }
        ]
    }
];

startButtonEl.addEventListener('click', startQuiz);
answerOne.addEventListener('click', answerHandler);
answerTwo.addEventListener('click', answerHandler);
answerThree.addEventListener('click', answerHandler);
answerFour.addEventListener('click', answerHandler);
submitBtnEl.addEventListener('click', submit);
restartBtnEl.addEventListener('click', restart);
clearBtnEl.addEventListener('click', clearHighScores);