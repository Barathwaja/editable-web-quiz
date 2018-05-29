var score = 0;
var round = 0;
var timeleft = 0;
var locked = true;
var time2answer;
var rounds2play;

function newGame(){
    getOptionValues();
    randomizeQuestions();
    createMatchfield();
    newRound();
}

function getOptionValues(){ //Get values from the HTML form
    var options = document.getElementById("optionsForm")
    rounds2play = options.elements[0].value;
    time2answer = options.elements[1].value;
}

function randomizeQuestions(){
    data.sort(function() {
        return Math.random() - 0.5;
    });
}

function createMatchfield(){
    //remove Form
    var form = document.getElementById("optionsForm");
    optionsForm.parentNode.removeChild(form);
    //remove headline text
    headline.innerHTML = "";
    //remove subheadline text
    subheadline.innerHTML = "";
    matchfield.style.display = "block";   
}

function newRound(){
    if(round <= rounds2play){
        locked = false;
        round++;
        setButtons(data[round]);
        timer();
        resetButtons();
        var question = data[round].question;
        headline.innerHTML = "<center>" + question + "</center";
        subheadline.innerHTML = "<center>Score: " + score + " Round: " + round +  " / " + rounds2play + "</center>";
        
    }
    else gameOver();
}

function gameOver(){
    headline.innerHTML = "<center> Game Over! </center";
    subheadline.innerHTML ="<center> You've scored " + score + " / " + rounds2play + " point(s). </center>";
}

function timer(){
    timeleft = time2answer;
    var progressbar = document.getElementById("progressbar");
    var timer = setInterval(function() {
        progressbar.style.width = (100 / time2answer) * timeleft + "%";
        timeleft--;
        if(timeleft < 0) {
            clearInterval(timer);
            newRound();
        }
    }, 1000);
}

function setButtons(question){
    if(question.answerA != null && question.answerB != null && question.answerC != null && question.answerD != null){
        answerA.style.visibility = "visible";
        answerB.style.visibility = "visible";
        answerC.style.visibility = "visible";
        answerD.style.visibility = "visible";
    }
    else if(question.answerB === null){
        answerA.style.visibility = "visible";
        answerB.style.visibility = "hidden";
        answerC.style.visibility = "hidden";
        answerD.style.visibility = "hidden";
    }
    else if(question.answerC === null){
        answerA.style.visibility = "visible";
        answerB.style.visibility = "visible";
        answerD.style.visibility = "hidden";
        answerC.style.visibility = "hidden";
    }
    else if(question.answerD === null){
        answerA.style.visibility = "visible";
        answerB.style.visibility = "visible";
        answerC.style.visibility = "visible";
        answerD.style.visibility = "hidden";
    }
    else{
        alert("INVALID QUESTION!");
    }
}

function clickButton(selectedAnswer){
    if(locked === true){
        return;
    }
    locked = true;
    if(selectedAnswer.getAttribute("id") === data[round].correct){
        selectedAnswer.className = "btn btn-block btn-success";
        score++;
        timeleft = 1;
    }
    else{
        selectedAnswer.className = "btn btn-block btn-danger";
        timeleft = 1;
    }
}

function resetButtons(){
    answerA.className = "btn btn-outline-primary btn-block";
    answerB.className = "btn btn-outline-primary btn-block";
    answerC.className = "btn btn-outline-primary btn-block";
    answerD.className = "btn btn-outline-primary btn-block";
}