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

var x = {
    aInternal: GAMESTATE.GENERATING,
    aListener: function(val) {},
    set a(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get a() {
        return this.aInternal;
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
}

x.registerListener(function(val) {
    alert("Someone changed the value of x.a to " + val);
});

var game = new Game(
    c,
    xlen,
    ylen,
    mazeW,
    mazeH,
    $("#gSpeed").children("option:selected").val(),
    $("#sSpeed").children("option:selected").val(),
    $("#bVisible").children("option:selected").val(),
    $("#WRF").children("option:selected").val(),
    setRemoveDE()
);

game.initiateObjects();
game.animateMazeGeneration();

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
        game.removeDE = setRemoveDE();

        if ($("#bVisible").children("option:selected").val() === "true") {

            game.botVisibility = true;

        } else game.botVisibility = false;

        game.wallRemovalFactor = $("#WRF").children("option:selected").val();
        game.initiateObjects();

        if ($("#gAnimation").children("option:selected").val() === "false") {

            game.animateMazeGeneration();

        } else game.quickGenerate();

    } else return;
}

function update() {

    if (game.gamestate !== GAMESTATE.SOLVING) {
        game.sSpeed = $("#sSpeed").children("option:selected").val();
        game.removeDE = setRemoveDE();
        game.updateBot();
    } else return;
}

function setRemoveDE() {

    let removeDE = $("#removeDE").children("option:selected").val();

    if (removeDE > 0) return removeDE;
    else return false;
}

document.getElementById("regenButton").addEventListener('click', newGame);

$(document).ready(function() {

    $("#gAnimation").change(function() {

        let selected = $(this).children("option:selected").val();
        if (selected == "true") {

            document.getElementById("optional").style.display = "none";
        } else {

            document.getElementById("optional").style.display = "inline";
        }
    });

    $("#sSpeed").change(async function() {

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        while (game.gamestate !== GAMESTATE.STATIC) await sleep(300);
        update();
    })

    $("#removeDE").change(async function() {

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        while (game.gamestate !== GAMESTATE.STATIC) await sleep(300);
        update();
    })
})