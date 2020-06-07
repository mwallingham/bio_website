import { Game } from './game.mjs';

//initialise the canvas, set to the size of the screen and draw pitch
var canvas = document.getElementById("gameScreen");
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
c.fillStyle = "#297d0a";
c.fillRect(0, 0, canvas.width, canvas.height);

/////////////////////////////////////////

//initialise game to fit screen

let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;
let game = new Game(GAME_WIDTH, GAME_HEIGHT, c);
game.addPlayer("Mark", "blue");
game.addPlayer("Tanmay", "red");

game.addGate([GAME_WIDTH * 0.15, GAME_HEIGHT * 0.25], 1, 2, 1);
game.addGate([GAME_WIDTH * 0.85, GAME_HEIGHT * 0.25], 1, 2, 2);
game.addGate([GAME_WIDTH * 0.85, GAME_HEIGHT * 0.75], 1, 3, 3);
game.addGate([GAME_WIDTH * 0.15, GAME_HEIGHT * 0.75], 1, 3, 4);
game.addGate([GAME_WIDTH * 0.35, GAME_HEIGHT * 0.5], 1, 2, 5);
game.addGate([GAME_WIDTH * 0.65, GAME_HEIGHT * 0.5], 1, 3, 6);


/////////////////////////////////////////


//main game loop

let lastTime = 0;

function gameLoop(timeStamp) {

    let dT = timeStamp - lastTime;
    lastTime = timeStamp;
    c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    c.fillStyle = "#297d0a";
    c.fillRect(0, 0, canvas.width, canvas.height);
    game.update(dT);
    game.draw(c);
    requestAnimationFrame(gameLoop);

}

//////////////////////////////////

game.listen();
gameLoop();