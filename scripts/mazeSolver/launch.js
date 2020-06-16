import Game from './game.js'

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
var xlen = 25;
var ylen = 18;
c.clearRect(0, 0, mazeW, mazeH);
c.fillStyle = '#212529';


var game = new Game(c, xlen, ylen, mazeW, mazeH);