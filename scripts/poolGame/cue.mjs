import { GAMESTATE } from './game.mjs';

export default class Cue {

    constructor(game) {

        this.game = game;
        this.inner = 15
        this.outer = 500;
        this.power = 0;
        this.timer = 0;
        this.innerMag = Math.sqrt(2 * (this.inner ** 2));
        this.outerMag = 100;
        this.aimFactor = 1;
        this.cueBall = game.cueBall;
        this.center = game.cueBall.position;
        this.maxCuePower = 35;

        this.s_e = {
            x_start: 0,
            y_start: 15,
            px_end: 0,
            py_end: 0,
            x_end: 0,
            y_end: 100,
        }

        this.unit_v = {

            x: 0,
            y: 1
        }
    }

    update() {

        this.center = this.cueBall.position;

    }


    draw(c) {

        this.s_e.px_end = this.unit_v.x * ((this.outerMag - this.innerMag) * this.aimFactor * this.power / 100 + this.innerMag);
        this.s_e.py_end = this.unit_v.y * ((this.outerMag - this.innerMag) * this.aimFactor * this.power / 100 + this.innerMag);

        let points = this.s_e;

        c.beginPath();
        c.moveTo(this.center.x + points.x_start, this.center.y + points.y_start);
        c.lineTo(this.center.x + points.px_end, this.center.y + points.py_end);
        c.strokeStyle = "red";
        c.lineWidth = 2;
        c.stroke();

        c.beginPath();
        c.moveTo(this.center.x + points.px_end, this.center.y + points.py_end);
        c.lineTo(this.center.x + points.x_end, this.center.y + points.y_end);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();
    }

    adjustPower() {

        if ((Math.floor(this.timer / 100)) % 2 === 0) this.power += 2;
        else this.power -= 2;

        this.timer += 2;

    }

    sendPower() {

        this.game.gamestate = GAMESTATE.MOVING;
        this.game.cueBall.velocity.x = this.maxCuePower * this.unit_v.x * this.power / 100;
        this.game.cueBall.velocity.y = this.maxCuePower * this.unit_v.y * this.power / 100;

    }

    fromMouse(mouse) {

        var screen = document.querySelector("canvas");
        let rect = screen.getBoundingClientRect();

        let y = (mouse.y - rect.top) - this.center.y;
        let x = (mouse.x - rect.left) - this.center.x;

        this.outerMag = Math.sqrt(x ** 2 + y ** 2);

        this.unit_v.x = x / this.outerMag;
        this.unit_v.y = y / this.outerMag;

        this.s_e.x_start = this.unit_v.x * this.innerMag;
        this.s_e.y_start = this.unit_v.y * this.innerMag;
        this.s_e.x_end = this.unit_v.x * (this.aimFactor * (this.outerMag - this.innerMag) + this.innerMag);
        this.s_e.y_end = this.unit_v.y * (this.aimFactor * (this.outerMag - this.innerMag) + this.innerMag);
    }

    reset() {

        this.power = 0;
        this.timer = 0;

        this.s_e = {
            x_start: 0,
            y_start: 15,
            px_end: 0,
            py_end: 15,
            x_end: 0,
            y_end: 100,
        }

        this.unit_v = {

            x: 0,
            y: 1
        }

    }
}