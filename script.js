var arrayScores = [];
var page = 0;
var timer = 90;
var storeScore = 0;
var scorePage = document.getElementById('scoreShortcut');
var questionText = document.getElementById("title");
var sectionForList = document.getElementById("mainDisplay");
var secondText = document.getElementById("fillerText");
var textReply = document.getElementById("subtext");
var clockQuiz = document.getElementById('timer');
var beginButton = document.getElementById('start');
var firstQ = document.getElementById('Q1');
var secondQ = document.getElementById('Q2');
var thirdQ = document.getElementById('Q3');
var fourthQ = document.getElementById('Q4');
var fifthQ = document.getElementById('Q5');
var submitUsernameButton = document.getElementById('submitName');
var nameInput = document.getElementById('nameInput');
var scoreBlock = document.getElementById("highscore");
var returnFromScores = document.getElementById('restart');
var submission = document.getElementById("submit");
var reset = document.getElementById('clear');
var scoresList = document.getElementById('scoreDisplayList');

//initialize local storage



//timer interval function
function startTimer() {
    var timerInterval = setInterval(function () {
        // if start page, score/username input page, or highscore page
        if ((page === 6) || (page === 7) || (page === 0)) {
            timer = 90;
            clockQuiz.textContent = timer;
            clearInterval(timerInterval);
        } else if (timer > 0 ){
            clockQuiz.textContent = timer + ' second(s) remaining';
            timer--;
        } else if (timer < 0) {
        //if it's not one of those pages, and the time has run out.
        } else {
            clockQuiz.textContent = 'Out of time! (0 points)';
            clearInterval(timerInterval);
            page = 0;
            redesignPage();
        }

    }, 1000);
}

//display 'incorrect' when the wrong button is pressed
var wrongButtons = document.querySelectorAll('button.incorrectButton');
for (let i = 0; i < wrongButtons.length; i++) {
    var button = wrongButtons[i];
    button.addEventListener("click", answerWrong);
}

function answerWrong() {
    textReply.textContent = 'Incorrect';
    timer -= 10;
}

//display 'correct', take user to next question

var rightButtons = document.querySelectorAll('button.correctButton');
for (let i = 0; i < rightButtons.length; i++) {
    var button = rightButtons[i];
    button.addEventListener("click", answerRight);
}

//hit right button, go to next question
function answerRight() {
    textReply.textContent = 'Correct';
    page = page + 1;
    redesignPage();
}

//add on-click function to quiz start button
//starts timer
function initiateQuiz() {
    page = page + 1;
    redesignPage();
    startTimer();
    beginButton.setAttribute('style', 'display: none');
}



//Initial Setup
questionText.textContent = "Code Quiz";
secondText.textContent = "This is a short quiz on some simple code concepts. Press the button below to begin."
clockQuiz.textContent = timer;
beginButton.addEventListener("click", initiateQuiz);
returnFromScores.addEventListener("click", function(event) {
    event.preventDefault();
    page = 0;
    redesignPage();
    scoreBlock.setAttribute('style', 'display: none');
});

//if there are scores, reset object to null
//if there are no scores, do nothing
reset.addEventListener('click', function(event) {
    event.preventDefault();
    var listItems = JSON.parse(localStorage.getItem('scoreObject'));
    if (listItems !== null) {
        localStorage.setItem('scoreObject', null);
        arrayScores = [];
        redesignPage()
    } else {
        return;
    }
});

//highscore button
scorePage.addEventListener('click', function(event) {
    event.preventDefault();
    beginButton.setAttribute('style', 'display: none');
    page = 7;
    redesignPage();
})




// Try to make sure webpage gets reformatted on button click
function redesignPage () {
    //Title Page
    if (page === 0) {
        timer = 90;
      questionText.textContent = "Code Quiz";
      secondText.textContent = "This is a short quiz on some simple code concepts. Press the button below to begin."
      clockQuiz.textContent = timer;
      beginButton.setAttribute('style', 'display: block');
    }

//Q1
    if (page === 1) {
      questionText.textContent = "Which character is used to denote custom classes in a CSS file?";
      secondText.textContent = "";
      firstQ.setAttribute('style', 'display: block');
    }

//Q2
    if (page === 2) {
        questionText.textContent = "Q2";
        firstQ.setAttribute('style', 'display: none');
        secondQ.setAttribute('style', 'display: block');

        questionText.textContent = 'Which character is used to denote an ID in a CSS file?';
    }

//Q3
    if (page === 3) {
      questionText.textContent = "Q3";
      secondQ.setAttribute('style', 'display: none');
      thirdQ.setAttribute('style', 'display: block');

      questionText.textContent = 'In JavaScript, of the options below, what is the best code element for accessing elements of an array?';
    }

//Q4
    if (page === 4) {
        questionText.textContent = "Q4";
        thirdQ.setAttribute('style', 'display: none');
        fourthQ.setAttribute('style', 'display: block');

        questionText.textContent = 'Which html element below would be considered a semantic tag?';
    }

//Q5
    if (page === 5) {
        questionText.textContent = "Q5";
        fourthQ.setAttribute('style', 'display: none');
        fifthQ.setAttribute('style', 'display: block');

        questionText.textContent = 'Which kind of brackets are used to access individual elements of an array?';
    }

//Score and submit
    if (page === 6) {
         //localStorage.setItem("name", value);
        storeScore = timer;
        startTimer();
        fifthQ.setAttribute('style', 'display: none');
        questionText.textContent = "Quiz Complete!";
        secondText.textContent = "Your score was " + timer + " points.";
        textReply.textContent = '';


        submission.setAttribute('style', 'display: block');
        //add text for current score
        //submission box
        //automatically takes user to highscore page when submitted

    }

    //Highscore page
    if (page === 7) {
        submission.setAttribute('style', 'display: none');
        fifthQ.setAttribute('style', 'display: none');
        fourthQ.setAttribute('style', 'display: none');
        thirdQ.setAttribute('style', 'display: none');
        secondQ.setAttribute('style', 'display: none');
        firstQ.setAttribute('style', 'display: none');
        textReply.textContent = '';
        questionText.textContent = "Highscores";
        secondText.textContent = "";
        scoreBlock.setAttribute('style', 'display: block');

        //reset ul on this page
        scoresList.innerHTML = "";
       
        var values = JSON.parse(localStorage.getItem('scoreObject'));
        //if there are no scores
        if (values == null) {
            var newItem = document.createElement("p")
            scoresList.append(newItem);
            newItem.textContent = "No Scores to Display"
        } else {
            for (const property in values) {
                var newElement = document.createElement("p");
                scoresList.append(newElement)
                newElement.textContent = `${values[property]}`;
            }
        }

    }

}


//button to submit localstorage data
submitUsernameButton.addEventListener("click", function(event) {
    event.preventDefault();


    //object from parsing local storage
    var scores = JSON.parse(localStorage.getItem("scoreObject"));

    var username = nameInput.value;
    //score - saved as 'storeScore' outside this function
    arrayScores.push(username + ' : ' + storeScore);


    if (username === "") {
        secondText.textContent = "Please give at least one character."
    //if localstorage value is null
    } else {
        localStorage.clear();
        var storeString = JSON.stringify(arrayScores);
        localStorage.setItem("scoreObject", storeString);
        page = 7;
        redesignPage();
    }
});