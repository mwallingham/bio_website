import { Game } from './game.mjs';

//initialise the canvas, set to the size of the screen and draw pitch
var canvas = document.getElementById("canvas");
var startScreen = document.getElementById("startScreen");
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

//c.fillStyle = "#297d0a";
//c.fillRect(0, 0, canvas.width, canvas.height);

/////////////////////////////////////////

//initialise game to fit screen

let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;
let game = new Game(GAME_WIDTH, GAME_HEIGHT, c);
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

// ready to switch to game


var startBox = document.getElementById("startBox");

function readPlayers() {

    let players = {};

    if ($("#player1Name").val() !== "") players[$("#player1Name").val()] = $("#colour1").val();
    if ($("#player2Name").val() !== "") players[$("#player2Name").val()] = $("#colour2").val();
    if ($("#player3Name").val() !== "") players[$("#player3Name").val()] = $("#colour3").val();
    if ($("#player4Name").val() !== "") players[$("#player4Name").val()] = $("#colour4").val();

    try {

        if (Object.keys(players).length === 0) throw "Please enter some players!";

        for (var player in players) {

            if (players[player] === "nothing") throw player + " was not set a colour!";

        }

        for (var player in players) {

            game.addPlayer(player, players[player]);
        }

        game.players.forEach((player, playerIndex) => {

            for (let i = 0; i < (game.players.length - 1); i++) {

                let next = game.players[(playerIndex + 1 + i) % game.players.length];

                player.canRoquet[next.name] = true;
            }
        })

        startGame();

    } catch (err) {

        alert(err);
        return;
    }
}

function startGame() {

    startBox.style.display = "none";
    canvas.style.display = "block";
    game.listen();
    gameLoop();

}

document.getElementById("playButton").addEventListener('click', readPlayers);