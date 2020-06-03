import { Game } from './game.mjs'

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

//main loop

function gameLoop(timeStamp) {

    let dT = timeStamp - lastTime;
    lastTime = timeStamp;
    c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(dT);
    game.draw(c);

    requestAnimationFrame(gameLoop);

}

let lastTime = 0;
var canvas = document.getElementById("gameScreen");
var startButton = document.getElementById("startGame");
var settings = document.getElementById("settingsContainer");
var ballSpeed = document.getElementById("ballSpeed");
var paddleWidth = document.getElementById("paddleWidth");
var c = canvas.getContext("2d");
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

startButton.addEventListener("click", startGame);