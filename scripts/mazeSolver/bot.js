import { space } from './maze.js';

export default class Bot {

    constructor(maze) {

        this.position = {
            x: Math.floor(Math.random() * (maze.xlen - 3) + 1),
            y: Math.floor(Math.random() * (maze.ylen - 3) + 1),
        }

        /*this.position.x = 1;
        this.position.y = maze.ylen - 2;

        maze.grid[maze.ylen - 3][this.position.x].visited = true;*/

        this.radius = Math.min(maze.space.W, maze.space.H) * 0.7;
        this.maze = maze;

        this.border = {

            right: maze.xlen - 1,
            bottom: maze.ylen - 1
        }

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

    move() {

        let directions = {

            "N": true,
            "S": true,
            "E": true,
            "W": true

        }

        if (this.position.x === 1) directions["W"] = false;
        else if (this.position.x === this.maze.xlen - 2) directions["E"] = false;

        if (this.position.y === 1) directions["N"] = false;
        else if (this.position.y === this.maze.ylen - 2) directions["S"] = false;

        let possible = [];
        let noWalls = "";


        Object.entries(directions).forEach(direction => {

            if (direction[1]) {

                if (!this.maze.grid[this.position.y + this.DY[direction[0]]][this.position.x + this.DX[direction[0]]].visited) {

                    possible.push(direction[0]);

                }

                if (this.check(direction[0])) noWalls = direction[0];

            }
        })

        if (possible.length > 0) {

            let moving = possible[Math.round(Math.random() * (possible.length - 1))];

            console.log(moving);

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

        } else {

            this.maze.grid[this.position.y][this.position.x].deadEnd = true;
            this.position.x += this.DX[noWalls];
            this.position.y += this.DY[noWalls];

        }
    }


    check(direction) {

        switch (direction) {

            case "N":
                console.log(this.maze.grid[this.position.y + this.DY[direction]][this.position.x]);

                if (!this.maze.grid[this.position.y + this.DY[direction]][this.position.x].S.fill &&
                    !this.maze.grid[this.position.y + this.DY[direction]][this.position.x].deadEnd) {

                    return true;
                }
                break;

            case "S":
                console.log(this.maze.grid[this.position.y][this.position.x]);
                if (!this.maze.grid[this.position.y][this.position.x].S.fill &&
                    !this.maze.grid[this.position.y + this.DY[direction]][this.position.x].deadEnd) {
                    return true
                };
                break;
            case "E":
                if (!this.maze.grid[this.position.y][this.position.x].E.fill &&
                    !this.maze.grid[this.position.y][this.position.x + this.DX[direction]].deadEnd) return true;
                break;
            case "W":
                if (!this.maze.grid[this.position.y][this.position.x + this.DX[direction]].E.fill &&
                    !this.maze.grid[this.position.y][this.position.x + this.DX[direction]].deadEnd) return true;
                break;
        }

        return false;
    }

    draw(c) {

        let x = (space.W + space.wallW) * this.position.x + (0.5 * space.W);
        let y = (space.H + space.wallH) * this.position.y + (0.5 * space.H);

        c.beginPath();
        c.arc(x, y, this.radius / 2, 0, 2 * Math.PI);
        c.fillStyle = this.colour;
        c.fill();
        c.stroke();

    }
}