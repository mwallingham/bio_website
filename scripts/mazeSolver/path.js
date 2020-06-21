import { space } from './maze.js';

export default class Path {

    constructor(x, y, bot, node = [bot.position.x, bot.position.y]) {

        this.start = [x, y]
        this.current = this.start;

        this.bot = bot;

        this.route = [];
        this.addToRoute([node[0], node[1]]);
        this.addToRoute(this.current);

        this.radiusReduction = 0.6;
        this.deadEnd = false;
        this.merged = false;
        this.branches = [];
        this.branch = false;
        this.found = false;

        this.iterations = 0;
    }

    async advance() {

        if (!this.branch) {

            let x = this.current[0];
            let y = this.current[1];
            let directions = this.bot.checkBoundary(x, y);
            let possible = [];

            Object.entries(directions).forEach(direction => {

                if (direction[1] &&
                    this.bot.checkWalls(direction[0], x, y) &&
                    !this.inRoute(x + this.bot.DX[direction[0]], y + this.bot.DY[direction[0]])) {

                    possible.push(direction[0]);
                }
            })

            if (possible.length > 1) {

                this.branch = true;

                possible.forEach(direction => {

                    let newX = this.current[0] + this.bot.DX[direction];
                    let newY = this.current[1] + this.bot.DY[direction];

                    if (!this.isTarget([newX, newY])) {
                        if (!this.bot.inAnyRoute(newX, newY)) {

                            this.branches.push(new Path(
                                newX,
                                newY,
                                this.bot,
                                this.current))

                        }
                    } else {
                        this.addToRoute([newX, newY]);
                        this.found = true;
                        this.bot.foundTarget = true;
                    }
                })

            } else if (possible.length == 1) {

                this.current[0] += this.bot.DX[possible[0]];
                this.current[1] += this.bot.DY[possible[0]];

                if (!this.isTarget(this.current)) {

                    if (!this.bot.inAnyRoute(this.current[0], this.current[1])) this.addToRoute(this.current);
                    else this.merged = true;

                } else {

                    this.addToRoute(this.current);
                    this.found = true;
                    this.bot.foundTarget = true;
                }

            } else {

                this.deadEnd = true;

            }

        } else {

            if (!this.found) {

                this.branches.forEach(branch => {

                    if (!branch.deadEnd &&
                        !branch.merged &&
                        !this.bot.foundTarget) branch.advance();
                    if (branch.found) this.found = true;
                })

            } else {

                return;
            }
        }
    }

    inRoute(x, y) {

        let result = false;

        this.route.forEach(position => {

            if (position[0] == x &&
                position[1] == y) {

                result = true;
            }
        })

        if (this.branch && !result) {

            this.branches.forEach(branch => {

                if (branch.inRoute(x, y)) {
                    result = true;
                }
            })
        }

        return result;
    }

    addToRoute(position) {

        let x = position[0];
        let y = position[1];

        this.route.push([x, y]);
    }

    isTarget(position) {

        let result = false;

        if (position[0] == this.bot.target[0] && position[1] == this.bot.target[1]) {

            result = true;
        }

        return result;

    }

    returnRoute() {

        let route = this.route.slice(1);

        if (this.branch) {

            this.branches.forEach(branch => {

                if (branch.found) {

                    route = route.concat(branch.returnRoute());

                };
            })
        }

        return route;
    }

    checkBranches() {

        let check = true;

        this.branches.forEach(branch => {

            if (branch.merged) branch.deadEnd = true;
            if (!branch.deadEnd) check = false;
        })

        this.deadEnd = check;
    }

    animate(c) {

        if (this.branch) {

            this.branches.forEach(branch => {

                branch.animate(c);
            })

            if (!this.deadEnd) this.checkBranches();
        }

        if (this.deadEnd || this.merged) {
            c.fillStyle = "red";
            this.iterations += 1;
        } else c.fillStyle = "green";

        this.route.slice(1).forEach(point => {

            if (!this.bot.removeDE || this.iterations < this.bot.removeDE) {

                let x = (space.W + space.wallW) * point[0] + (0.5 * space.W);
                let y = (space.H + space.wallH) * point[1] + (0.5 * space.H);

                c.beginPath();
                c.arc(x, y, this.radiusReduction * this.bot.radius / 2, 0, 2 * Math.PI);
                c.fill();
                c.stroke();

            } else if (this.iterations == this.bot.removeDE) {
                this.bot.maze.grid[point[1]][point[0]].clearSelf();

            } else {
                return;
            }
        })
    }
}