import Velocity from "./velocity.mjs";
import { pocketStats } from "./pockets.mjs";

export default class Ball {

    constructor(game, x, y, colour) {

        this.initial = {

            x: x,
            y: y
        }

        this.position = {

            x: x,
            y: y
        }

        this.colour = colour;
        this.radius = 10;
        this.gameW = game.width;
        this.gameH = game.height;
        this.game = game;
        this.border = game.border;
        this.pocketW = game.pocketW;
        this.mass = 5;
        this.potted = false;
        this.velocity = new Velocity();

        this.offsetForBreak = 1.;
    }

    update(dT) {

        if (!dT) return;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.update();

        if ((this.position.x < this.gameW / 2 - pocketStats.pocketW && this.position.x > this.border + 20) || (this.position.x > this.gameW / 2 + pocketStats.pocketW && this.position.x < this.gameW - (this.border + 20))) {
            if ((this.position.y - this.radius) < this.border) this.velocity.y = -this.velocity.y;
            while ((this.position.y - this.radius) < this.border) this.position.y += this.velocity.y;

            if ((this.position.y + this.radius) > this.gameH - this.border) this.velocity.y = -this.velocity.y;
            while ((this.position.y + this.radius) > this.gameH - this.border) this.position.y += this.velocity.y;

        }

        if (this.position.y > (this.border + 20) && this.position.y < this.gameH - (this.border + 20)) {

            if ((this.position.x - this.radius) < this.border) this.velocity.x = -this.velocity.x;
            while ((this.position.x - this.radius) < this.border) this.position.x += this.velocity.x;

            if ((this.position.x + this.radius) > this.gameW - this.border) this.velocity.x = -this.velocity.x;
            while ((this.position.x + this.radius) > this.gameW - this.border) this.position.x += this.velocity.x;

        }
    }

    draw(c) {

        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.colour;
        c.fill();
        c.stroke();

    }

    distanceFrom(other) {

        return (other.position.x - this.position.x) ** 2 + (other.position.y - this.position.y) ** 2;

    }

    distanceFromCorner(corner) {

        return (corner.x - this.position.x) ** 2 + (corner.y - this.position.y) ** 2;

    }
}