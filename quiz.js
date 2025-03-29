// Quiz state variables
let currentQuiz = 'temperature';
let currentQuestion = 0;
let score = 0;
let answered = false;
let questions = [];

// Core functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateQuestions() {
    const questions = [
        // ... existing temperature questions ...
    ];

    const shuffledQuestions = shuffleArray([...questions]);
    return shuffledQuestions.map(q => {
        const shuffledOptions = shuffleArray([...q.options]);
        const correctIndex = shuffledOptions.indexOf(q.correct);
        return {
            question: q.question,
            options: shuffledOptions,
            correct: correctIndex
        };
    });
}

function showQuestion() {
    answered = false;
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

function selectOption(index) {
    if (answered) return;
    answered = true;

    const options = document.querySelectorAll('.option');
    const correct = questions[currentQuestion].correct;

    options[index].classList.add(index === correct ? 'correct' : 'incorrect');
    options[correct].classList.add('correct');

    if (index === correct) score++;
}

function nextQuestion() {
    if (!answered) {
        alert('Please select an answer first!');
        return;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('scoreContainer').classList.add('active');
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('score').textContent = percentage;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('scoreContainer').classList.remove('active');
    document.getElementById('quizContainer').classList.add('active');
    showQuestion();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Quiz initialization functions
function startTemperatureQuiz() {
    currentQuiz = 'temperature';
    questions = generateQuestions();
    currentQuestion = 0;
    score = 0;
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizContainer').classList.add('active');
    showQuestion();
}

function startGrapeQuiz() {
    currentQuiz = 'grape';
    questions = shuffleArray([...grapeQuestions]).map(q => {
        const shuffledOptions = shuffleArray([...q.options]);
        const correctIndex = shuffledOptions.indexOf(q.correct);
        return {
            question: q.question,
            options: shuffledOptions,
            correct: correctIndex
        };
    });
    currentQuestion = 0;
    score = 0;
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizContainer').classList.add('active');
    showQuestion();
}

function startCharacteristicsQuiz() {
    currentQuiz = 'characteristics';
    questions = shuffleArray([...characteristicsQuestions]).map(q => {
        const shuffledOptions = shuffleArray([...q.options]);
        const correctIndex = shuffledOptions.indexOf(q.correct);
        return {
            question: q.question,
            options: shuffledOptions,
            correct: correctIndex
        };
    });
    currentQuestion = 0;
    score = 0;
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizContainer').classList.add('active');
    showQuestion();
}

function startMixedQuiz() {
    currentQuiz = 'mixed';
    
    // Combine questions from all three categories
    const allQuestions = [
        ...generateQuestions().slice(0, 17), // 17 temperature questions
        ...grapeQuestions.slice(0, 17),      // 17 grape questions
        ...characteristicsQuestions.slice(0, 16) // 16 characteristics questions
    ];
    
    // Shuffle all questions
    questions = shuffleArray(allQuestions).map(q => {
        const shuffledOptions = shuffleArray([...q.options]);
        const correctIndex = shuffledOptions.indexOf(q.correct);
        return {
            question: q.question,
            options: shuffledOptions,
            correct: correctIndex
        };
    });
    
    currentQuestion = 0;
    score = 0;
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizContainer').classList.add('active');
    showQuestion();
}

function returnToHome() {
    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('scoreContainer').classList.remove('active');
    document.getElementById('startScreen').style.display = 'block';
}

// Export functions for testing
module.exports = {
    shuffleArray,
    generateQuestions,
    startTemperatureQuiz,
    startGrapeQuiz,
    startCharacteristicsQuiz,
    startMixedQuiz,
    showQuestion,
    selectOption,
    nextQuestion,
    showScore,
    restartQuiz,
    returnToHome
}; 