export default class FinishPost {


    constructor(game) {

        this.position = {

            x: game.gameWidth / 2,
            y: game.gameHeight / 2

        }

        this.colour = "white";
        this.radius = 5;
    }

    draw(c) {

        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.colour;
        c.fill();
        c.stroke();
    }
}