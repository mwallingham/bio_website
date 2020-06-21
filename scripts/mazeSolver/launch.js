import { GAMESTATE, Game } from './game.js'

///// GET NECESSARY ELEMENTS FROM HTML ///////

var canvas = document.getElementById("maze");
var screen = document.getElementById("gameScreen");

screen.style.width = (window.innerWidth * 0.5).toString() + "px";
screen.style.height = (window.innerHeight * 0.67).toString() + "px";

///// SET CANVAS DIMENSIONS & INITIALISE GAME //////

fitToContainer(canvas);

function fitToContainer(canvas) {

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

var c = canvas.getContext("2d");
var mazeW = canvas.width;
var mazeH = canvas.height;
var xlen = $("#xlen").children("option:selected").val();
var ylen = $("#ylen").children("option:selected").val();
var game = new Game(
    c,
    xlen,
    ylen,
    mazeW,
    mazeH,
    $("#gSpeed").children("option:selected").val(),
    $("#sSpeed").children("option:selected").val(),
    $("#bVisible").children("option:selected").val(),
    $("#WRF").children("option:selected").val()
);

game.initiateObjects();
game.generateMaze();

/////// ORIGINAL SCREEN WIDTH ALLOWS FOR REPOSITIONING OF CANVAS UPON X-CELL CHANGE ////////

var originalSW = Number(screen.style.width.slice(0, -2));

////// SET FUNCITONS AND LISTENERS FOR CHANGES IN PARAMETERS /////////


function newGame() {

    if (game.gamestate !== GAMESTATE.SOLVING) {

        c.clearRect(0, 0, mazeW, mazeH);

        let newXLEN = $("#xlen").children("option:selected").val();
        let newYLEN = $("#ylen").children("option:selected").val();
        let newWidth = mazeW * newXLEN / xlen;
        let newHeight = mazeH * newYLEN / ylen;

        screen.style.transform = "translateX(" + ((originalSW - newWidth) / 2).toString() + "px)";

        screen.style.width = newWidth.toString() + "px";
        screen.style.height = newHeight.toString() + "px";

        fitToContainer(canvas);

        game.mazeW = canvas.width;
        game.mazeH = canvas.height;
        game.xlen = newXLEN;
        game.ylen = newYLEN;
        game.gSpeed = $("#gSpeed").children("option:selected").val();
        game.sSpeed = $("#sSpeed").children("option:selected").val();

        if ($("#bVisible").children("option:selected").val() === "true") {

            game.botVisibility = true;

        } else game.botVisibility = false;

        game.wallRemovalFactor = $("#WRF").children("option:selected").val();
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