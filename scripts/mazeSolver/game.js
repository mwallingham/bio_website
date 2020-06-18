import { space, Maze } from './maze.js';
import Bot from './bot.js';
import InputHandler from './input.js';

const GAMESTATE = {

    GENERATING: 1,
    STATIC: 1,
    SOLVING: 2
}

class Game {

    constructor(c, xlen, ylen, mazeW, mazeH, gSpeed, sSpeed, bVisible) {

        this.ctx = c;
        this.xlen = xlen;
        this.ylen = ylen;
        this.mazeW = mazeW;
        this.mazeH = mazeH;
        this.gSpeed = gSpeed;
        this.sSpeed = sSpeed;
        this.gamestate = GAMESTATE.GENERATING;
        (bVisible === "true") ? this.botVisibility = true: this.botVisibility = false;

    }

    initiateObjects() {

        this.gamestate = GAMESTATE.GENERATING;
        this.maze = new Maze(this);
        this.bot = new Bot(this);
        this.bot.randomPos();
    }

    updateBot() {
        let botPosition = this.bot.position;
        this.bot = new Bot(this);
        this.bot.position = botPosition;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async generateMaze() {

        this.maze.printBorder(this.ctx);

        while (!this.maze.generated) {

            this.maze.printMaze(this.ctx);
            this.bot.generate();
            if (this.botVisibility) this.bot.draw(this.ctx);
            await this.sleep(this.gSpeed);
        }

        for (let i = 0; i < Math.round(this.maze.xlen * this.maze.ylen * 0.02); i++) {

            this.bot.removeWalls();
            this.maze.printMaze(this.ctx);
        }

        this.play();
    }

    play() {

        this.bot.randomPos();
        this.bot.draw(this.ctx);
        this.gamestate = GAMESTATE.STATIC;
        new InputHandler(this);
    }

    setTarget(position) {

        var screen = document.querySelector("canvas");
        let rect = screen.getBoundingClientRect();
        let y = Math.floor((position.y - rect.top) / (space.H + space.wallH));
        let x = Math.floor((position.x - rect.left) / (space.W + space.wallW));

        if (x > 0 && x < this.maze.xlen && y > 0 && y < this.maze.ylen) {

            this.gamestate = GAMESTATE.SOLVING;

            let tx = (space.W + space.wallW) * x + (0.5 * space.W);
            let ty = (space.H + space.wallH) * y + (0.5 * space.H);

            this.ctx.beginPath();
            this.ctx.arc(tx, ty, this.bot.radius / 2, 0, 2 * Math.PI);
            this.ctx.fillStyle = "blue";
            this.ctx.fill();
            this.ctx.stroke();

            this.maze.resetGrid();
            this.bot.chaseTarget(x, y, this.ctx);

        } else {

            return;

        }
    }
}

export { Game, GAMESTATE }