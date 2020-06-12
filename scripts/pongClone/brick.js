import { yDetectCollision, xDetectCollision } from './collisionDetection.js';

export default class Brick {

    constructor(game, position, width) {

        this.image = document.getElementById("brick_image");

        this.game = game;
        this.position = position;
        this.width = width;
        this.height = 30;
        this.markedForDeletion = false;

    }

    update() {

        if (yDetectCollision(this.game.ball, this)) {

            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;

        }

        if (xDetectCollision(this.game.ball, this)) {

            this.game.ball.speed.x = -this.game.ball.speed.x;
            this.markedForDeletion = true;

        }

    }

    draw(c) {

        c.drawImage(

            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height

        );
    }
}