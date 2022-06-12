// Starting page - 'coding quiz challenge' + description
// ALL PAGES - 'View highscores' and timer in the top corners
//  timer only starts once quiz has begun, and counts down
// From there - display each question in turn, let user know
//  when their answer was right or wrong
//If right, move to next question
//End - score=current time
//User inputs name/initials for high score/submit button
//submitting score takes you to high score page
//high score page has buttons to clear all scores, or return to quiz

//JS
//  Have master variable controlling page displayed
// CSS prebuilt classes will display values according to code
//  there, but JS will add or remove items from main as needed

var page = 0;
var timer = 90;
var questionText = document.getElementById("title");
var sectionForList = document.getElementById("mainDisplay");
var secondText = document.getElementById("fillerText");
var textReply = document.getElementById("subtext");
var clockQuiz = document.getElementById('timer');
var userName = "";
var beginButton = document.getElementById('start');
var firstQ = document.getElementById('Q1');
var secondQ = document.getElementById('Q2');
var thirdQ = document.getElementById('Q3');
var fourthQ = document.getElementById('Q4');
var fifthQ = document.getElementById('Q5');

//var h1El = document.createElement("h1");
//h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");

//Main display must contain start button on page load
//  on click for start - begin quiz, start timer - use css to hide main display - set attribute queryselector
//  Easier to show/hide div than elements whithin it

//timer interval function
function startTimer() {
    var timerInterval = setInterval(function () {
        if (timer > 1) {
            clockQuiz.textContent = timer + ' second(s) remaining';
            timer--;
        } else {
            clockQuiz.textContent = timer + ' second(s) remaining';
            clearInterval(timerInterval);
        }
    }, 1000);
}



//display 'incorrect' when the wrong button is pressed
var wrongButtons = document.querySelectorAll('incorrectButton');
for (let i = 0; i < wrongButtons.length; i++) {
    var button = wrongButtons[i];
    button.addEventListener("click", answerWrong);
}

function answerWrong() {
    textReply.textContent = 'Incorrect';
}

//display 'correct', take user to next question

var rightButtons = document.querySelectorAll('correctButton');
for (let i = 0; i < rightButtons.length; i++) {
    var button = rightButtons[i];
    button.addEventListener("click", answerRight);
}

//hit right button, go to next question
function answerRight() {
    textReply.textContent = 'Correct';
    page = page + 1;
}

//add on-click function to quiz start button
//starts timer
function initiateQuiz() {
    page = page + 1;
    redesignPage();
    startTimer();
    beginButton.setAttribute('style', 'display: none');
}
beginButton.addEventListener("click", initiateQuiz);


//Initial Setup
questionText.textContent = "Code Quiz";
secondText.textContent = "This is a short quiz on some simple code concepts. Press the button below to begin."
clockQuiz.textContent = timer;


// Try to make webpage gets reformatted on button click
function redesignPage () {
    //Title Page
    if (page === 0) {
      questionText.textContent = "Code Quiz";
      secondText.textContent = "This is a short quiz on some simple code concepts. Press the button below to begin."
      clockQuiz.textContent = timer;
      beginButton.setAttribute('style', 'display: block');
    }

//Q1
    if (page === 1) {
      questionText.textContent = "Which character is used to denote custom classes in a CSS file?";
      secondText.textContent = "";
      firstQ.setAttribute('style', 'visibility: visible');
    }

//Q2
    if (page === 2) {
        questionText.textContent = "Q2";
        var list = document.getElementById("Q2");
        list.setAttribute('display', 'visible');

        questionText.textContent = 'Which character is used to denote an ID in a CSS file?';
    }

//Q3
    if (page === 3) {
      questionText.textContent = "Q3";
      var list = document.getElementById("Q3");
      list.setAttribute('display', 'visible');

       questionText.textContent = 'In JavaScript, of the options below, what is the best code element for accessing elements of an array?';
    }

//Q4
    if (page === 4) {
        questionText.textContent = "Q4";
        var list = document.getElementById("Q4");
        list.setAttribute('display', 'visible');

        questionText.textContent = 'Which html element below would be considered a semantic tag?';
    }

//Q5
    if (page === 5) {
        questionText.textContent = "Q5";
        var list = document.getElementById("Q5");
        list.setAttribute('display', 'visible');

        questionText.textContent = 'Which kind of brackets are used to access individual elements of an array?';
        //button must end timer
        clearInterval(timerInterval);
    }

//Score and submit
    if (page === 6) {
         //localStorage.setItem("name", value);
        questionText.textContent = "Quiz Complete!";
        secondText.textContent = "Your score was" ;

        var submission = document.getElementById("submit");
        submission.setAttribute('display', 'visible');
        //add text for current score
        //submission box
        //automatically takes user to highscore page when submitted

    }

    //Highscore page
    if (page === 7) {
        questionText.textContent = "Highscores";
        secondText.textContent = "";
        var scoreList = document.getElementById("highscore");
        scoreList.setAttribute('display', 'visible');
    
        //localStorage.getItem("name");
        //buttons clear local storage, go to start

    }

}




//begin timer
function startQuiz() {

}


