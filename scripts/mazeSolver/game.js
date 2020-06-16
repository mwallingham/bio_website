import { Maze } from './maze.js';
import Bot from './bot.js';

export default class Game {

    constructor(c, xlen, ylen, mazeW, mazeH) {

        this.maze = new Maze(xlen, ylen, mazeW, mazeH);
        this.bot = new Bot(this.maze);

        this.c = c;

        this.intitiate();

    }

    async intitiate() {

        await this.maze.printBorder(this.c);
        await this.maze.printMaze(this.c);
        this.bot.draw(this.c);
        this.bot.move();
        this.loop();

    }

    async loop() {

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await this.maze.printMaze(this.c);
        this.bot.draw(this.c);
        this.bot.move();

        await sleep(100);

        this.loop();

    }


}