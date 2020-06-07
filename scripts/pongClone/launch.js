import { Game } from './game.mjs'
import { levels } from './levels.mjs'

// launches game - sets up screen

function startGame() {


    startButton.style.display = "none";
    settings.style.display = "none";
    canvas.style.display = "inline-block";
    game.start(paddleWidth.value, ballSpeed.value);
    game.listen();

    document.getElementById("ballSpeedChange").value = ballSpeed.value;
    document.getElementById("paddleWidthChange").value = paddleWidth.value;

    gameLoop();

}

//setting up main loop

let lastTime = 0;

function gameLoop(timeStamp) {

    let dT = timeStamp - lastTime;
    lastTime = timeStamp;
    c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(dT);
    game.draw(c);

    let bricksGone = game.totalBricks - (game.gameObjects.length - 2);

    level.textContent = "Level: " + (game.levelstate + 1).toString() + "/" + levels.length.toString();
    scoreBoard.textContent = "Score: " + bricksGone.toString() + "/" + game.totalBricks.toString();
    lives.textContent = "Lives: " + game.lives.toString();

    requestAnimationFrame(gameLoop);

}

//getting main screen context

var canvas = document.getElementById("gameScreen");
var c = canvas.getContext("2d");

// linking buttons, settings container and sliders

var startButton = document.getElementById("startGame");
var settings = document.getElementById("settingsContainer");
var ballSpeed = document.getElementById("ballSpeed");
var paddleWidth = document.getElementById("paddleWidth");

//linking outputs

var scoreBoard = document.getElementById("score");
var level = document.getElementById("level");
var lives = document.getElementById("lives");


// setting up the game based on width and height of canvas provided

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);


//waiting to launch the game

startButton.addEventListener("click", startGame);