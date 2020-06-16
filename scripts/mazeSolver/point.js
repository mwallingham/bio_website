import { space } from './maze.js';

export default class Point {

    constructor(x, y) {



        this.S = {

            fill: true,
            x_start: x * (space.W + space.wallW) - space.wallW,
            y_start: y * (space.H + space.wallH) + space.H

        }

        this.E = {

            fill: true,
            x_start: x * (space.W + space.wallW) + space.W,
            y_start: y * (space.H + space.wallH) - space.wallH,

        }

        this.visited = false;
        this.deadEnd = false;
    }

    draw(c) {


        c.fillStyle = '#212529';

        if (this.S.fill) c.fillRect(this.S.x_start, this.S.y_start, space.W + 2 * space.wallW, space.wallH);

        if (this.E.fill) c.fillRect(this.E.x_start, this.E.y_start, space.wallW, space.H + 2 * space.wallH);
    }
}