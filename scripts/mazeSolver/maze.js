import Point from "./point.js";

var space = {

    W: 0,
    H: 0,
    wallW: 0,
    wallH: 0,

}


class Maze {

    constructor(xlen, ylen, width, height) {

        this.xlen = xlen;
        this.ylen = ylen;
        this.width = width;
        this.height = height;

        this.wallFactor = .04;

        this.space = {

            W: (1 - this.wallFactor) * width / xlen,
            H: (1 - this.wallFactor) * height / ylen,
            wallW: this.wallFactor * width / (xlen - 1),
            wallH: this.wallFactor * height / (ylen - 1),

        }
        space = this.space;

        this.grid = this.build(xlen, ylen);
        this.fillEdges();

    }

    generateMaze() {

        this.bot.move();

    }

    build(x, y) {

        let build = []

        for (let j = 0; j < y; j++) {

            build[j] = [];

            for (let i = 0; i < x; i++) {

                build[j][i] = new Point(i, j);

            }
        }
        return build;
    }

    fillEdges() {

        for (let x = 0; x < this.xlen; x++) {

            this.grid[0][x] = 1;
            this.grid[this.ylen - 1][x] = 1;

        }

        for (let y = 0; y < this.ylen; y++) {

            this.grid[y][0] = 1;
            this.grid[y][this.xlen - 1] = 1;

        }

    }

    async printBorder(c) {

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        for (let j = 0; j < this.ylen; j++) {

            for (let i = 0; i < this.xlen; i++) {

                if (this.grid[j][i] === 1) {

                    c.fillRect(i * (this.space.W + this.space.wallW), j * (this.space.H + this.space.wallH), this.space.W, this.space.H);
                    await sleep(0);
                }
            }
        }
    }

    async printMaze(c) {

        c.clearRect(space.W, space.H, this.width - 2 * space.W, this.height - 2 * space.H);

        for (let j = 1; j < this.ylen - 1; j++) {

            for (let i = 1; i < this.xlen - 1; i++) {


                if (i == this.xlen - 2) this.grid[j][i].E.fill = false;
                if (j == this.ylen - 2) this.grid[j][i].S.fill = false;

                this.grid[j][i].draw(c);

            }
        }
    }
}

export { Maze, space }