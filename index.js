'use strict';

const QUIZSTATUS = {
    currentQuestion: 0,
    numberAnswersCorrect: 0,
    numberAnswersIncorrect: 0
}

// hard coded quiz questions with ID, question, answer options, and correct answer
const QUIZQUESTIONS = [{
        id: 1,
        question: "What city is the state capital of Wisconsin?",
        optionA: "Madison",
        optionB: "Green Bay",
        optionC: "La Crosse",
        optionD: "Hurley",
        answer: "A"
    },
    {
        id: 2,
        question: "What is the name of the current home to the Milwaukee Brewers baseball team?",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "B"
    },
    {
        id: 3,
        question: "What is the state dance?",
        optionA: "Square Dance",
        optionB: "Polka",
        optionC: "Clogging",
        optionD: "Folk Dance",
        answer: "B"
    },
    {
        id: 4,
        question: "What is the state bird?",
        optionA: "Northern Cardinal",
        optionB: "Western Meadowlark",
        optionC: "American Robin",
        optionD: "Eastern Goldfinch",
        answer: "C"
    },
    {
        id: 5,
        question: "What is the state tree?",
        optionA: "Bur Oak",
        optionB: "Eastern Cottonwood",
        optionC: "Eastern White Pine",
        optionD: "Sugar Maple",
        answer: "D"
    },
    {
        id: 6,
        question: "What is the highest point in Wisconsin?",
        optionA: "Timms Hill",
        optionB: "Mount Arvon",
        optionC: "Charles Mound",
        optionD: "Eagle Mountain",
        answer: "A"
    },
    {
        id: 7,
        question: "What is the largest city in Wisconsin?",
        optionA: "Madison",
        optionB: "Green Bay",
        optionC: "Milwaukee",
        optionD: "Kenosha",
        answer: "C"
    },
    {
        id: 8,
        question: "What is the Wisconsin state motto?",
        optionA: "To be, rather than to seem",
        optionB: "Our liberties we prize and our rights we will maintain",
        optionC: "Forward",
        optionD: "State sovereignty, national union",
        answer: "C"
    },
    {
        id: 9,
        question: "What is the Wisconsin state fruit?",
        optionA: "Honeycrisp Apple",
        optionB: "Cranberry",
        optionC: "Pumpkin",
        optionD: "Golden Delicious Apple",
        answer: "B"
    },
    {
        id: 10,
        question: "What is the name of the home field for the Green Bay Packers?",
        optionA: "Packers Field",
        optionB: "Lambeau Field",
        optionC: "Cheesehead Central",
        optionD: "Curly Field",
        answer: "B"
    }
];

// returns the HTML to render a particular quiz question given the desired questionID and hard coded quiz questions
function generateQuizQuestion(questionIDToDisplay, quizQuestions) {
    let displayQuestion = quizQuestions.find(question => question.id === questionIDToDisplay);
    return `            
            <input type="hidden" name="questionID" id="questionID" class="questionID" value="${questionIDToDisplay}">
            <fieldset>
                <legend class="question">${displayQuestion.question}</legend>
                <div class="answer-option">
                <input type="radio" name="answer" id="answer-a" value="A">
            <label for="answer-a">${displayQuestion.optionA}</label>
            </div>
            <div class="answer-option">
            <input type="radio" name="answer" id="answer-b" value="B">
            <label for="answer-b">${displayQuestion.optionB}</label>
            </div>
            <div class="answer-option">
            <input type="radio" name="answer" id="answer-c" value="C">
            <label for="answer-c">${displayQuestion.optionC}</label>
            </div>
            <div class="answer-option">
            <input type="radio" name="answer" id="answer-d" value="D">
            <label for="answer-d">${displayQuestion.optionD}</label>
            </div>
            </fieldset>
            `;
}

function renderQuizResultPage() {
    let stringToDisplay = "<h2>Quiz Results</h2><p>You've completed the quiz. Here are your final results:</p><p>You answered " + QUIZSTATUS.numberAnswersCorrect + " out of 10 questions correctly.</p><p>Feel free to take the quiz over again by clicking the Retake Quiz button.</p><button class=\"quiz-retake\"><span class=\"button-label\">RETAKE QUIZ</span></button>";
    $("#js-quiz-app").html(stringToDisplay);
}

function renderScoreTracker() {
    return("<section class=\"score-tracker\"><p>Current Score</p><p>" + QUIZSTATUS.numberAnswersCorrect + " Correct</p><p>" + QUIZSTATUS.numberAnswersIncorrect + " Incorrect</p></section>");
}

function renderQuizQuestionTracker(){
    return("<div class=\"question-count\"><p>Question <span class=\"current-question-number\">" + QUIZSTATUS.currentQuestion + "</span> of 10</p></div>");
}

function handleDisplayQuestion() {
    let questionID = QUIZSTATUS.currentQuestion;
    $("body").css("background-color","#eee");
    if (questionID <= 10) {
        let stringToDisplay = renderScoreTracker();
        stringToDisplay += "<h2>Question " + QUIZSTATUS.currentQuestion + "</h2>";
        stringToDisplay += "<form id=\"js-quiz-form\">"
        stringToDisplay += generateQuizQuestion(questionID, QUIZQUESTIONS);
        stringToDisplay += "<button type=\"submit\"><span class=\"button-label\">SUBMIT ANSWER</span></button>";
        stringToDisplay += "</form>";
        stringToDisplay += renderQuizQuestionTracker();
        $("#js-quiz-app").html(stringToDisplay);
    } else {
        renderQuizResultsPage();
    }
}

function handleQuizQuestionAnswerSubmission() {
    $('#js-quiz-app').submit(function (event) {
        event.preventDefault();
        const submittedAnswer = $("input[type=radio][name=answer]:checked").val();
        // if they don't select an answer, throw up an error message
        if (submittedAnswer == undefined) {
            alert("Please select an answer.")
        } else {
            let submittedID = $('#questionID').val();
            let submittedQuestion = QUIZQUESTIONS.find(question => question.id == submittedID);
            let answerText = "";
            switch (submittedQuestion.answer) {
                case "A":
                    answerText = submittedQuestion.optionA;
                    break;
                case "B":
                    answerText = submittedQuestion.optionB;
                    break;
                case "C":
                    answerText = submittedQuestion.optionC;
                    break;
                case "D":
                    answerText = submittedQuestion.optionD;
                    break;
            }
            if (submittedAnswer == submittedQuestion.answer) {
                renderCorrectResponsePage(answerText);
            } else {
                renderIncorrectResponsePage(answerText);
            }
        }
    });
}

function renderCorrectResponsePage(correctAnswerText) {
    QUIZSTATUS.numberAnswersCorrect++;
    let stringToDisplay = renderScoreTracker();
    stringToDisplay += "<h2>Question " + QUIZSTATUS.currentQuestion + "</h2>";
    stringToDisplay += "<p><span class=\"correct-alert\">Correct</span>!</p><div class=\"quiz-controls\"><button class=\"quiz-continue\">CONTINUE</button></div>";
    stringToDisplay += renderQuizQuestionTracker();
    $("body").css("background-color","limegreen");
    $("#js-quiz-app").html(stringToDisplay);
}

function renderIncorrectResponsePage(correctAnswerText) {
    QUIZSTATUS.numberAnswersIncorrect++;
    let stringToDisplay = renderScoreTracker();
    stringToDisplay += "<h2>Question " + QUIZSTATUS.currentQuestion + "</h2>";
    stringToDisplay += "<p><span class=\"incorrect-alert\">Incorrect</span>. The correct answer was:</p><p>" + correctAnswerText + "<div class=\"quiz-controls\"><button class=\"quiz-continue\">CONTINUE</button></div>";
    stringToDisplay += renderQuizQuestionTracker();
    $("body").css("background-color","red");
    $("#js-quiz-app").html(stringToDisplay);
}

// display the starting page for the quiz app
function renderQuizStartPage() {
    let stringToDisplay = "<h2>Welcome</h2><p>Welcome to Better Know Wisconsin - a short, 10 question quiz that will test your knowledge about the great state of Wisconsin.</p><p>Think you know everything there is to know about Wisconsin? Let's find out. Click the Start Quiz button below to begin.</p><div class=\"quiz-controls\"><button class=\"quiz-start\">START QUIZ</button></div>";
    $("#js-quiz-app").html(stringToDisplay);
}

function renderQuizResultsPage() {
    let stringToDisplay = "<h2>Quiz Results</h2><p>You've completed the quiz. Here are your final results:</p><p>You answered " + QUIZSTATUS.numberAnswersCorrect + " out of 10 questions correctly.</p><p>Feel free to take the quiz over again by clicking the Retake Quiz button.</p><div class=\"quiz-controls\"><button class=\"quiz-retake\">RETAKE QUIZ</button></div>";
    $("#js-quiz-app").html(stringToDisplay);
}

// display the first quiz question when they click the RETAKE QUIZ button
function handleRetakeQuizClicked() {
    $('#js-quiz-app').on('click', '.quiz-retake', function () {
        QUIZSTATUS.currentQuestion = 0;
        QUIZSTATUS.numberAnswersCorrect = 0;
        QUIZSTATUS.numberAnswersIncorrect = 0;
        renderQuizStartPage();
    });
}

function handleContinueQuizClicked() {
    $('#js-quiz-app').on('click', '.quiz-continue', function () {
        QUIZSTATUS.currentQuestion++;
        handleDisplayQuestion();
    });
}

// display the first quiz question when they click the START QUIZ button
function handleStartQuizClicked() {
    $('#js-quiz-app').on('click', '.quiz-start', function () {
        QUIZSTATUS.currentQuestion++;
        handleDisplayQuestion();
    });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the quiz, and activating our individual functions
// that handle quiz answer
function handleQuiz() {
    renderQuizStartPage();
    handleStartQuizClicked();
    handleQuizQuestionAnswerSubmission();
    handleRetakeQuizClicked();
    handleContinueQuizClicked();
}

/*
default: display quiz start page, set current question = 0
when they click start quiz, display the first question and its options
when they click submit answer, check to see if they submitted the correct answer
    if they were correct, state they were correct and provide them with a button to move to next question
    if they were wrong, stage they were wrong, provide them with the correct answer, and provide them with a button to move to next question
when they move on to the next question, increment question counter, display the current question and its options
*/

// when the page loads, call `handleQuiz`
$(handleQuiz);