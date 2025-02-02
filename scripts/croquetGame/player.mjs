import Velocity from "./velocity.mjs";

export default class Player {

    constructor(game, name, colour) {

        this.name = name;
        this.colour = colour;
        this.radius = 10;
        this.gameW = game.gameWidth;
        this.gameH = game.gameHeight;
        this.mass = 10;
        this.playersHit = [];

        this.initiated = false;
        this.hitThisTurn = false;
        this.justCroqued = false;
        this.streak = false;
        this.immune = false;
        this.hitPost = false;
        this.playerToCroquet = "";

        this.gateID = 1;

        this.initial = {
            x: game.gameWidth * 0.05,
            y: game.gameHeight * 0.25,
        }

        this.position = {
            x: game.gameWidth * 0.05,
            y: game.gameHeight * 0.25,
        }

        this.velocity = new Velocity();

        this.canRoquet = {};

    }

    draw(c) {

        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.colour;
        c.fill();
        c.stroke();

    }

    update(dT) {

        if (!dT) return;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.update();

        if ((this.position.y - this.radius) < 0) this.velocity.y = -this.velocity.y;
        while ((this.position.y - this.radius) < 0) this.position.y += this.velocity.y;

        if ((this.position.y + this.radius) > this.gameH) this.velocity.y = -this.velocity.y;
        while ((this.position.y + this.radius) > this.gameH) this.position.y += this.velocity.y;

        if ((this.position.x - this.radius) < 0) this.velocity.x = -this.velocity.x;
        while ((this.position.x - this.radius) < 0) this.position.x += this.velocity.x;

        if ((this.position.x + this.radius) > this.gameW) this.velocity.x = -this.velocity.x;
        while ((this.position.x + this.radius) > this.gameW) this.position.x += this.velocity.x;
    }

    distanceFrom(other) {

        return (other.position.x - this.position.x) ** 2 + (other.position.y - this.position.y) ** 2;

    }

    moveForCroquet(mouse) {

        var screen = document.querySelector("canvas");
        let rect = screen.getBoundingClientRect();

        let center = this.playerToCroquet.position;

        let y = (mouse.y - rect.top) - center.y;
        let x = (mouse.x - rect.left) - center.x;

        let mag = Math.sqrt(x ** 2 + y ** 2);

        this.position.x = center.x + 22 * x / mag;
        this.position.y = center.y + 22 * y / mag;

    }

    reset() {

        this.position.x = this.initial.x;
        this.position.y = this.initial.y;
        this.hitPost = false;
        this.initiated = false;
        this.gateID = 1;
        this.hitThisTurn = false;
        this.justCroqued = false;
        this.streak = false;
        this.immune = false;
        this.playerToCroquet = "";
        this.playersHit = [];

    }

}