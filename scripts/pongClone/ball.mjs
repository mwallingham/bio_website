import { yDetectCollision, xDetectCollision } from './collisionDetection.mjs';
import { GAMESTATE } from './game.mjs';

export default class Ball {

    constructor(game, ballSpeed) {

        this.game = game;
        this.radius = 8;
        this.restartSpeed = -0.7 * ballSpeed;

        this.position = {

            x: this.game.gameWidth / 2,
            y: this.game.gameHeight - 70,
        }

        this.speed = {

            x: 0,
            y: this.restartSpeed,
            max_x: ballSpeed,
        }
    }

    draw(c) {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
        c.stroke();
    }

    update(dT) {

        if (!dT) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + this.radius > this.game.gameWidth && this.speed.x > 0) this.speed.x = -this.speed.x;
        if (this.position.y - this.radius < 0 && this.speed.y < 0) this.speed.y = -this.speed.y;
        if (this.position.x - this.radius < 0 && this.speed.x < 0) this.speed.x = -this.speed.x;

        if (yDetectCollision(this, this.game.paddle)) {
            if (this.speed.y > 0) {
                this.speed.y = -this.speed.y;
                this.speed.x = (this.position.x - (this.game.paddle.position.x + this.game.paddle.width / 2)) * this.speed.max_x / this.game.paddle.width;
            }
        }

        if (xDetectCollision(this, this.game.paddle)) {

            this.speed.x = -this.speed.x;

        }

        if (this.position.y + this.radius > this.game.gameHeight) {

            this.game.gamestate = GAMESTATE.RESTARTING;

        }

    }

    restarting() {

        this.position.x = this.game.paddle.position.x + this.game.paddle.width / 2;
        this.position.y = this.game.paddle.position.y - 2 * this.radius;
        this.speed.x = 0;
        this.speed.y = this.restartSpeed;

    }

}