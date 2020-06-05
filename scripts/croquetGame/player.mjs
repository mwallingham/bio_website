import Velocity from "./velocity.mjs";

export default class Player {

    constructor(game, name, colour) {

        this.name = name;
        this.colour = colour;
        this.radius = 10;
        this.gameW = game.gameWidth;
        this.gameH = game.gameHeight;
        this.initiated = false;
        this.mass = 10;

        this.position = {
            x: game.gameWidth * 0.1,
            y: game.gameHeight * 0.1,
        }

        this.velocity = new Velocity();
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
        if ((this.position.y + this.radius) > this.gameH) this.velocity.y = -this.velocity.y;
        if ((this.position.x - this.radius) < 0) this.velocity.x = -this.velocity.x;
        if ((this.position.x + this.radius) > this.gameW) this.velocity.x = -this.velocity.x;

    }

    distanceFrom(other) {

        return (other.position.x - this.position.x) ** 2 + (other.position.y - this.position.y) ** 2;

    }

}