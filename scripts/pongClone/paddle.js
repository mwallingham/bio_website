export default class Paddle {

    constructor(game, paddleWidth) {

        this.width = 150 * paddleWidth / 5;
        this.height = 30;
        this.gameWidth = game.gameWidth;

        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        }

        this.maxSpeed = 5;
        this.speed = 0;

    }

    moveLeft() {

        this.speed = -this.maxSpeed;

    }

    moveRight() {

        this.speed = this.maxSpeed;

    }

    stop() {

        this.speed = 0;
    }

    draw(c) {

        c.fillRect(this.position.x, this.position.y, this.width, this.height);

    }

    update(dT) {

        if (!dT) return;
        this.position.x += this.speed;

        if (this.position.x < 5) this.position.x = 5;
        if (this.position.x + this.width > this.gameWidth - 5) this.position.x = this.gameWidth - this.width - 5;
    }
}