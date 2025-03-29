// Mock DOM elements
document.body.innerHTML = `
    <div id="startScreen"></div>
    <div id="quizContainer"></div>
    <div id="scoreContainer"></div>
    <div id="question"></div>
    <div id="options"></div>
    <div id="progress"></div>
    <div id="score"></div>
`;

// Import quiz functions
const {
    shuffleArray,
    generateQuestions,
    startTemperatureQuiz,
    startGrapeQuiz,
    startCharacteristicsQuiz,
    showQuestion,
    selectOption,
    nextQuestion,
    showScore,
    restartQuiz,
    returnToHome,
    startMixedQuiz
} = require('./quiz.js');

describe('Quiz Core Functions', () => {
    describe('shuffleArray', () => {
        it('should maintain array length after shuffling', () => {
            const originalArray = [1, 2, 3, 4, 5];
            const shuffledArray = shuffleArray([...originalArray]);
            expect(shuffledArray.length).toBe(originalArray.length);
        });

        it('should contain all original elements after shuffling', () => {
            const originalArray = [1, 2, 3, 4, 5];
            const shuffledArray = shuffleArray([...originalArray]);
            originalArray.forEach(element => {
                expect(shuffledArray).toContain(element);
            });
        });
    });

    describe('generateQuestions', () => {
        it('should generate temperature questions with correct structure', () => {
            const questions = generateQuestions();
            expect(Array.isArray(questions)).toBe(true);
            expect(questions.length).toBeGreaterThan(0);
            questions.forEach(q => {
                expect(q).toHaveProperty('question');
                expect(q).toHaveProperty('options');
                expect(q).toHaveProperty('correct');
                expect(Array.isArray(q.options)).toBe(true);
                expect(typeof q.correct).toBe('number');
            });
        });
    });
});

describe('Quiz Navigation', () => {
    beforeEach(() => {
        document.getElementById('startScreen').style.display = 'block';
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('scoreContainer').classList.remove('active');
    });

    describe('startTemperatureQuiz', () => {
        it('should initialize temperature quiz correctly', () => {
            startTemperatureQuiz();
            expect(document.getElementById('startScreen').style.display).toBe('none');
            expect(document.getElementById('quizContainer').classList.contains('active')).toBe(true);
        });
    });

    describe('startGrapeQuiz', () => {
        it('should initialize grape quiz correctly', () => {
            startGrapeQuiz();
            expect(document.getElementById('startScreen').style.display).toBe('none');
            expect(document.getElementById('quizContainer').classList.contains('active')).toBe(true);
        });
    });

    describe('startCharacteristicsQuiz', () => {
        it('should initialize characteristics quiz correctly', () => {
            startCharacteristicsQuiz();
            expect(document.getElementById('startScreen').style.display).toBe('none');
            expect(document.getElementById('quizContainer').classList.contains('active')).toBe(true);
        });
    });

    describe('startMixedQuiz', () => {
        it('should initialize mixed quiz correctly', () => {
            startMixedQuiz();
            expect(document.getElementById('startScreen').style.display).toBe('none');
            expect(document.getElementById('quizContainer').classList.contains('active')).toBe(true);
        });

        it('should have 50 questions total', () => {
            startMixedQuiz();
            expect(questions.length).toBe(50);
        });

        it('should contain questions from all categories', () => {
            startMixedQuiz();
            const questionTexts = questions.map(q => q.question);
            
            // Check for temperature questions
            expect(questionTexts.some(q => q.includes('temperature') || q.includes('alcohol'))).toBe(true);
            
            // Check for grape questions
            expect(questionTexts.some(q => q.includes('region') || q.includes('appellation'))).toBe(true);
            
            // Check for characteristics questions
            expect(questionTexts.some(q => q.includes('characteristic') || q.includes('flavor'))).toBe(true);
        });
    });
});

describe('Question Display and Answer Selection', () => {
    beforeEach(() => {
        startTemperatureQuiz();
    });

    describe('showQuestion', () => {
        it('should display question and options', () => {
            showQuestion();
            const questionElement = document.getElementById('question');
            const optionsContainer = document.getElementById('options');
            expect(questionElement.textContent).toBeTruthy();
            expect(optionsContainer.children.length).toBe(4);
        });
    });

    describe('selectOption', () => {
        it('should mark correct answer appropriately', () => {
            showQuestion();
            const correctIndex = questions[0].correct;
            selectOption(correctIndex);
            const options = document.querySelectorAll('.option');
            expect(options[correctIndex].classList.contains('correct')).toBe(true);
        });

        it('should mark incorrect answer appropriately', () => {
            showQuestion();
            const incorrectIndex = (questions[0].correct + 1) % 4;
            selectOption(incorrectIndex);
            const options = document.querySelectorAll('.option');
            expect(options[incorrectIndex].classList.contains('incorrect')).toBe(true);
        });
    });
});

describe('Score Tracking', () => {
    beforeEach(() => {
        startTemperatureQuiz();
    });

    describe('showScore', () => {
        it('should display final score correctly', () => {
            score = 15;
            questions = Array(20).fill({});
            showScore();
            expect(document.getElementById('score').textContent).toBe('75');
        });
    });

    describe('restartQuiz', () => {
        it('should reset quiz state', () => {
            currentQuestion = 10;
            score = 5;
            restartQuiz();
            expect(currentQuestion).toBe(0);
            expect(score).toBe(0);
        });
    });
});

describe('Navigation Functions', () => {
    describe('returnToHome', () => {
        it('should return to home screen', () => {
            document.getElementById('quizContainer').classList.add('active');
            document.getElementById('scoreContainer').classList.add('active');
            returnToHome();
            expect(document.getElementById('startScreen').style.display).toBe('block');
            expect(document.getElementById('quizContainer').classList.contains('active')).toBe(false);
            expect(document.getElementById('scoreContainer').classList.contains('active')).toBe(false);
        });
    });
}); 