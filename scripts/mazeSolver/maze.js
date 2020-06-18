import Point from "./point.js";

var space = {

    W: 0,
    H: 0,
    wallW: 0,
    wallH: 0,

}

class Maze {

    constructor(game) {

        this.xlen = game.xlen;
        this.ylen = game.ylen;
        this.width = game.mazeW;
        this.height = game.mazeH;
        this.gSpeed = game.gSpeed;
        this.wallFactor = .04;

        this.space = this.setSpacing();
        space = this.space;

        this.grid = this.build(game.xlen, game.ylen, game.ctx);
        this.fillEdges();

        this.generated = false;

    }

    setSpacing() {

        var object = {

            W: (1 - this.wallFactor) * this.width / this.xlen,
            H: (1 - this.wallFactor) * this.height / this.ylen,
            wallW: this.wallFactor * this.width / (this.xlen - 1),
            wallH: this.wallFactor * this.height / (this.ylen - 1),
        }

        return object;
    }

    build(x, y, c) {

        let build = []

        for (let j = 0; j < y; j++) {

            build[j] = [];

            for (let i = 0; i < x; i++) {

                build[j][i] = new Point(i, j, c);

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

    printBorder(c) {

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        c.fillStyle = '#353b36';

        for (let j = 0; j < this.ylen; j++) {

            for (let i = 0; i < this.xlen; i++) {

                if (this.grid[j][i] === 1) {

                    c.fillRect(
                        i * (this.space.W + this.space.wallW),
                        j * (this.space.H + this.space.wallH),
                        this.space.W,
                        this.space.H);
                }
            }
        }
    }

    printMaze(c) {

        c.clearRect(space.W, space.H, this.width - 2 * space.W, this.height - 2 * space.H);

        for (let j = 1; j < this.ylen - 1; j++) {

            for (let i = 1; i < this.xlen - 1; i++) {


                if (i == this.xlen - 2) this.grid[j][i].E.fill = false;
                if (j == this.ylen - 2) this.grid[j][i].S.fill = false;

                this.grid[j][i].draw(c);
            }
        }
    }

    resetGrid() {

        for (let j = 1; j < this.ylen - 1; j++) {

            for (let i = 1; i < this.xlen - 1; i++) {


                this.grid[j][i].deadEnd = false;
                this.grid[j][i].visited = false;
            }
        }

    }
}

export { Maze, space }