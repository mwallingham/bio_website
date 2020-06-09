import { Game } from "./game.mjs";

//initialise the canvas, set to the size of the screen and draw pitch
var canvas = document.getElementById("canvas");
canvas.style.cursor = "none";

fitToContainer(canvas);

function fitToContainer(canvas) {
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

var c = canvas.getContext("2d");
let border = 30;
let pocketWidth = 20;
let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;
let game = new Game(GAME_WIDTH, GAME_HEIGHT, border, pocketWidth);
game.startrack();
game.listen();


let lastTime = 0;

function gameLoop(timeStamp) {

    let dT = timeStamp - lastTime;
    lastTime = timeStamp;

    drawPockets(c);
    game.update(dT);
    game.draw(c);

    requestAnimationFrame(gameLoop);

}

function drawPockets(c) {

    c.clearRect(0, 0, canvas.style.width, canvas.style.height);
    c.fillStyle = "#297d0a";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "#70310f";
    c.fillRect(0, 0, canvas.width, border);
    c.fillRect(0, 0, border, canvas.height);
    c.fillRect(canvas.width - border, 0, canvas.width, canvas.height);
    c.fillRect(0, canvas.height - border, canvas.width, canvas.height);

}


gameLoop();