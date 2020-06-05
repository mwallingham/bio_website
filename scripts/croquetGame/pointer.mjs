export default class Pointer {

    constructor(game) {

        this.game = game;
        this.angle = Math.PI;
        this.inner = 15
        this.outer = 100;
        this.increment = 2 * Math.PI / 180;
        this.power = 0;
        this.timer = 0;
    }

    moveRight() {

        this.angle -= this.increment;
    }

    moveLeft() {

        this.angle += this.increment;
    }

    draw(c, center) {

        let points = this.calculateEnd();

        c.beginPath();
        c.moveTo(center.x + points.x_start, center.y + points.y_start);
        c.lineTo(center.x + points.px_end, center.y + points.py_end);
        c.strokeStyle = "red";
        c.lineWidth = 2;
        c.stroke();

        c.beginPath();
        c.moveTo(center.x + points.px_end, center.y + points.py_end);
        c.lineTo(center.x + points.x_end, center.y + points.y_end);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();

    }

    calculateEnd() {

        let start_end = {
            x_start: Math.sin(this.angle) * this.inner,
            y_start: Math.cos(this.angle) * this.inner,
            px_end: Math.sin(this.angle) * ((this.outer - this.inner) * this.power / 100 + this.inner),
            py_end: Math.cos(this.angle) * ((this.outer - this.inner) * this.power / 100 + this.inner),
            x_end: Math.sin(this.angle) * this.outer,
            y_end: Math.cos(this.angle) * this.outer
        }
        return start_end;
    }

    adjustPower() {

        if ((Math.floor(this.timer / 100)) % 2 === 0) this.power += 2;
        else this.power -= 2;

        this.timer += 2;

    }

    sendPower() {

        this.game.playerActive = false;
        this.game.players[this.game.currentPlayer].velocity.x = 50 * Math.sin(this.angle) * this.power / 100;
        this.game.players[this.game.currentPlayer].velocity.y = 50 * Math.cos(this.angle) * this.power / 100;

    }
}