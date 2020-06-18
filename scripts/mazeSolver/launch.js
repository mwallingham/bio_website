import { GAMESTATE, Game } from './game.js'

var canvas = document.getElementById("maze");
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
var mazeW = canvas.width;
var mazeH = canvas.height;
var xlen = 30;
var ylen = 20;
c.clearRect(0, 0, mazeW, mazeH);
c.fillStyle = '#212529';

var game = new Game(
    c,
    $("#xlen").children("option:selected").val(),
    $("#ylen").children("option:selected").val(),
    mazeW,
    mazeH,
    $("#gSpeed").children("option:selected").val(),
    $("#sSpeed").children("option:selected").val(),
    $("#bVisible").children("option:selected").val(),
);

game.initiateObjects();
game.generateMaze();

function newGame() {

    if (game.gamestate !== GAMESTATE.SOLVING) {

        c.clearRect(0, 0, mazeW, mazeH);
        game.xlen = $("#xlen").children("option:selected").val();
        game.ylen = $("#ylen").children("option:selected").val();
        game.gSpeed = $("#gSpeed").children("option:selected").val();
        game.sSpeed = $("#sSpeed").children("option:selected").val();

        if ($("#bVisible").children("option:selected").val() === "true") {

            game.botVisibility = true;

        } else game.botVisibility = false;

        game.initiateObjects();
        game.generateMaze();

    } else return;
}

function update() {

    if (game.gamestate !== GAMESTATE.SOLVING) {
        game.sSpeed = $("#sSpeed").children("option:selected").val();
        game.updateBot();

    } else return;
}

document.getElementById("resetButton").addEventListener('click', newGame);
document.getElementById("updateButton").addEventListener('click', update);