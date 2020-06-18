import { space } from './maze.js';

export default class Point {

    constructor(x, y, c) {

        this.c = c;

        this.clear = {
            x_start: x * (space.W + space.wallW) + space.wallW,
            y_start: y * (space.H + space.wallH) + space.wallH,
            width: space.W * 0.8,
            height: space.H * 0.8

        }

        this.S = {

            fill: true,
            x_start: x * (space.W + space.wallW) - space.wallW / 2,
            y_start: y * (space.H + space.wallH) + space.H
        }

        this.E = {

            fill: true,
            x_start: x * (space.W + space.wallW) + space.W,
            y_start: y * (space.H + space.wallH) - space.wallH / 2,
        }

        this.visited = false;
        this.deadEnd = false;
    }

    draw() {

        this.c.fillStyle = 'black';

        if (this.S.fill) this.c.fillRect(this.S.x_start, this.S.y_start, space.W + space.wallW, space.wallH);

        if (this.E.fill) this.c.fillRect(this.E.x_start, this.E.y_start, space.wallW, space.H + space.wallH);

    }

    clearSelf() {

        this.c.clearRect(this.clear.x_start, this.clear.y_start, this.clear.width, this.clear.height);
    }

}