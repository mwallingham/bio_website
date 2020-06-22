import { space } from './maze.js';
import Path from './path.js';
import { GAMESTATE } from './game.js';

export default class Bot {

    constructor(game) {

        this.game = game;
        this.maze = game.maze;
        this.gSpeed = game.gSpeed;
        this.sSpeed = game.sSpeed;
        this.radius = Math.min(space.W, space.H) * 0.6;
        this.pathSize = (this.radius / 2) * 0.3;
        this.removeDE = game.removeDE;
        this.DX = {

            "N": 0,
            "S": 0,
            "E": 1,
            "W": -1
        }
        this.DY = {

            "N": -1,
            "S": 1,
            "E": 0,
            "W": 0
        }
    }

    /////// MAZE GENERATION //////

    generate() {

        let directions = this.checkBoundary();
        let possible = [];
        let noWalls = "";

        Object.entries(directions).forEach(direction => {

            if (direction[1]) {

                if (!this.maze.grid[this.position.y + this.DY[direction[0]]][this.position.x + this.DX[direction[0]]].visited) {

                    possible.push(direction[0]);
                }

                if (this.checkWalls(direction[0]) && this.checkDeadEnds(direction[0])) noWalls = direction[0];
            }
        })

        if (possible.length > 0) {

            let moving = possible[Math.round(Math.random() * (possible.length - 1))];

            switch (moving) {

                case "N":
                    this.maze.grid[this.position.y + this.DY[moving]][this.position.x].S.fill = false;
                    break;
                case "S":
                    this.maze.grid[this.position.y][this.position.x].S.fill = false;
                    break;
                case "E":
                    this.maze.grid[this.position.y][this.position.x].E.fill = false;
                    break;
                case "W":
                    this.maze.grid[this.position.y][this.position.x + this.DX[moving]].E.fill = false;
                    break;

            }

            this.position.x += this.DX[moving];
            this.position.y += this.DY[moving];

            this.maze.grid[this.position.y][this.position.x].visited = true;

        } else if (possible.length === 0 && noWalls) {

            this.maze.grid[this.position.y][this.position.x].deadEnd = true;
            this.position.x += this.DX[noWalls];
            this.position.y += this.DY[noWalls];

        } else {

            this.maze.generated = true;
        }
    }

    removeWalls() {

        let x = Math.floor(Math.random() * (this.maze.xlen - 3) + 1);
        let y = Math.floor(Math.random() * (this.maze.ylen - 3) + 1);

        (Math.random() >= 0.5) ? this.maze.grid[y][x].E.fill = false: this.maze.grid[y][x].S.fill = false;
    }

    //////////////////////////////

    //////// MAZE SOLVING ////////

    chaseTarget(x, y, c) {

        document.getElementById("pathLength").textContent = "Path Length: ";
        this.target = [x, y];

        if (!this.isTarget([this.position.x, this.position.y])) {

            this.clearGrid();
            this.paths = [];
            this.foundTarget = false;

            let directions = this.checkBoundary();

            Object.entries(directions).forEach(direction => {

                let startX = this.position.x + this.DX[direction[0]];
                let startY = this.position.y + this.DY[direction[0]];

                if (!this.foundTarget && direction[1] && this.checkWalls(direction[0])) {

                    if (this.isTarget([startX, startY])) {

                        this.route = [
                            [startX, startY]
                        ];

                        this.foundTarget = true;
                        this.paths = [];
                    };

                    this.paths.push(new Path(
                        startX,
                        startY,
                        this
                    ));
                }
            })

            if ($("#sAnimation").children("option:selected").val() !== "false") this.advance(c);
            else {
                this.quickSolve(c);
            }

        } else {
            this.game.gamestate = GAMESTATE.STATIC;
            return;
        }
    }

    clearGrid() {

        for (let j = 1; j < this.maze.ylen - 1; j++) {

            for (let i = 1; i < this.maze.xlen - 1; i++) {

                if ((i === this.position.x && j === this.position.y) ||
                    (i === this.target[0] && j === this.target[1])) continue;

                else this.maze.grid[j][i].clearSelf();
            }
        }
    }

    isTarget(position) {

        let result = false;

        if (position[0] == this.target[0] && position[1] == this.target[1]) {

            result = true;
        }
        return result;
    }

    async advance(c) {

        this.drawTarget(this.target, c);

        this.paths.forEach(path => {

            path.animate(c);

        });

        await this.sleep(this.sSpeed);

        if (!this.foundTarget) {

            this.paths.forEach(path => {

                if (!path.deadEnd &&
                    !path.merged &&
                    !this.foundTarget) path.advance();
            })

            this.advance(c);

        } else this.retrieveRoute(c);
    }

    quickSolve(c) {

        this.drawTarget(this.target, c);

        this.paths.forEach(path => {

            path.animate(c);

        });

        if (!this.foundTarget) {

            this.paths.forEach(path => {

                if (!path.deadEnd &&
                    !path.merged &&
                    !this.foundTarget) path.advance();
            })

            this.quickSolve(c);

        } else this.retrieveRoute(c);
    }

    inAnyRoute(x, y) {

        let result = false;

        this.paths.forEach(path => {

            if (path.inRoute(x, y)) {
                result = true;
            }

        })

        return result;
    }

    retrieveRoute(c) {

        this.paths.forEach(path => {

            if (path.found) {

                this.route = path.returnRoute();

            }
        })

        this.printRoute(c);
        this.followRoute(c);
    }

    printRoute(c) {

        for (let j = 1; j < this.maze.ylen - 1; j++) {

            for (let i = 1; i < this.maze.xlen - 1; i++) {

                if (i === this.position.x && j === this.position.y) continue;
                else this.maze.grid[j][i].clearSelf();

            }
        }

        this.drawTarget(this.target, c);

        c.fillStyle = "green";

        this.route.slice(0, -1).forEach(point => {

            let x = (space.W + space.wallW) * point[0] + (0.5 * space.W);
            let y = (space.H + space.wallH) * point[1] + (0.5 * space.H);

            c.beginPath();
            c.arc(x, y, this.pathSize, 0, 2 * Math.PI);
            c.fill();
            c.stroke();

        })
    }

    async followRoute(c) {

        document.getElementById("pathLength").textContent = "Path Length: " + this.route.length.toString();

        while (this.route.length > 0) {

            this.maze.grid[this.position.y][this.position.x].clearSelf();

            let newPosition = this.route.shift();
            this.position.x = newPosition[0];
            this.position.y = newPosition[1];

            this.maze.grid[this.position.y][this.position.x].clearSelf();
            this.draw(c);
            await this.sleep(50);
        }

        this.draw(c);
        this.game.gamestate = GAMESTATE.STATIC;
    }

    ///////////////////////////////

    ///// SEARCHING FUNCTIONS /////

    checkBoundary(x = this.position.x, y = this.position.y) {

        let directions = {

            "N": true,
            "S": true,
            "E": true,
            "W": true

        }

        if (x === 1) directions["W"] = false;
        else if (x === this.maze.xlen - 2) directions["E"] = false;

        if (y === 1) directions["N"] = false;
        else if (y === this.maze.ylen - 2) directions["S"] = false;

        return directions;

    }

    checkDeadEnds(direction) {

        switch (direction) {

            case "N":
                if (!this.maze.grid[this.position.y + this.DY[direction]][this.position.x].deadEnd) return true;
                break;

            case "S":
                if (!this.maze.grid[this.position.y + this.DY[direction]][this.position.x].deadEnd) return true;
                break;

            case "E":
                if (!this.maze.grid[this.position.y][this.position.x + this.DX[direction]].deadEnd) return true;
                break;

            case "W":
                if (!this.maze.grid[this.position.y][this.position.x + this.DX[direction]].deadEnd) return true;
                break;
        }

        return false;

    }

    checkWalls(direction, x = this.position.x, y = this.position.y) {

        switch (direction) {

            case "N":
                if (!this.maze.grid[y + this.DY[direction]][x].S.fill) return true;
                break;

            case "S":
                if (!this.maze.grid[y][x].S.fill) return true;
                break;

            case "E":
                if (!this.maze.grid[y][x].E.fill) return true;
                break;

            case "W":
                if (!this.maze.grid[y][x + this.DX[direction]].E.fill) return true;
                break;
        }

        return false;
    }

    ///////////////////////////////

    draw(c) {

        let x = (space.W + space.wallW) * this.position.x + (0.5 * space.W);
        let y = (space.H + space.wallH) * this.position.y + (0.5 * space.H);

        c.beginPath();
        c.arc(x, y, this.radius / 2, 0, 2 * Math.PI);
        c.fillStyle = '#212529'
        c.fill();
        c.stroke();

    }

    drawTarget(position, c) {

        let tx = (space.W + space.wallW) * position[0] + (0.5 * space.W);
        let ty = (space.H + space.wallH) * position[1] + (0.5 * space.H);

        c.beginPath();
        c.arc(tx, ty, this.radius / 2, 0, 2 * Math.PI);
        c.fillStyle = "blue";
        c.fill();
        c.stroke();
    }

    randomPos() {

        this.position = {
            x: Math.floor(Math.random() * (this.maze.xlen - 3) + 1),
            y: Math.floor(Math.random() * (this.maze.ylen - 3) + 1),
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}