const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Rome', 'Berlin'],
        answer: 'Paris'
    },
    {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
    },
    {
        question: 'What is the largest ocean?',
        options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
        answer: 'Pacific'
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'Jane Austen'],
        answer: 'Harper Lee'
    },
    {
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'H2O', 'CO2', 'NaCl'],
        answer: 'H2O'
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion(question) {
    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');

    questionElement.textContent = question.question;
    answerButtons.innerHTML = '';
    nextButton.style.display = 'none';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(option, question.answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedOption, correctAnswer) {
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');

    if (selectedOption === correctAnswer) {
        score += 1;
        answerButtons.querySelectorAll('button').forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else {
                button.disabled = true;
            }
        });
        setTimeout(() => nextQuestion(), 1000);
    } else {
        answerButtons.querySelectorAll('button').forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedOption) {
                button.classList.add('wrong');
            }
            button.disabled = true;
        });
        nextButton.style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const passFailElement = document.getElementById('pass-fail');
    
    const percentage = (score / questions.length) * 100;
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
    passFailElement.textContent = percentage >= 50 ? 'Congratulations! You Passed!' : 'Sorry, You Failed.';
    passFailElement.style.color = percentage >= 50 ? '#28a745' : '#dc3545';
    
    resultContainer.classList.remove('hidden');
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

// Initial setup
showQuestion(questions[currentQuestionIndex]);
