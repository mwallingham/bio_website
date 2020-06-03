var input = document.getElementById("guess");
var button = document.getElementById("button");
var label = document.getElementById("feedback")
var labelOriginal = label.textContent;

var imageSource = document.getElementById("questionImage");

class Question {

    constructor(source, answer) {
        this.imageSource = source;
        this.answer = answer;
    }
}

facebook = new Question("scripts/logoQuiz/images/facebook.png", 'facebook');
instagram = new Question("scripts/logoQuiz/images/insta.png", 'instagram');

questions = [facebook, instagram];

imageSource.src = questions[0].imageSource;
var answer = questions[0].answer;

input.addEventListener("keydown", function(something) {

    if (something.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
});

function display() {

    document.getElementById("startBox").style.display = "none";
    document.getElementById("quiz").style.display = "block";

}

function inputEntered() {

    if (input.value.toLowerCase() === answer) {

        label.textContent = "Correct!";
        label.style.textAlign = "center";
        timed(true, 1000);

    } else if (!input.value) {

        label.style.fontSize = "22px";
        label.textContent = "Please enter an answer:";
        timed(false, 2000);

    } else {

        label.textContent = "Incorrect, try again:";
        timed(false, 2000);
    }
    input.value = "";
}

function timed(flag = false, delay = 1000) {

    setTimeout(function() {
        label.textContent = labelOriginal;
        if (flag === true) {
            changeImage();
        }
    }, delay);
}

function changeImage() {

    if (answer === questions[0].answer) {

        imageSource.src = questions[1].imageSource;
        answer = questions[1].answer;

    } else {

        imageSource.src = questions[0].imageSource;
        answer = questions[0].answer;

    }
}