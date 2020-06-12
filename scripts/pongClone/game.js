import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';
import { buildLevel, levels } from './levels.js';


const GAMESTATE = {

    SETTINGS: 0,
    RUNNING: 1,
    PAUSED: 2,
    RESTARTING: 3,
    FINISHED: 4,

}

class Game {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.levelstate = 0;
        this.lives = 5;
        this.gamestate = GAMESTATE.RESTARTING;
    }

    start(paddleWidth, ballSpeed) {

        this.diedThisLevel = false;

        this.paddleWidth = paddleWidth;
        this.ballSpeed = ballSpeed;

        this.paddle = new Paddle(this, paddleWidth);
        this.ball = new Ball(this, ballSpeed);

        let bricks = buildLevel(this, levels[this.levelstate]);

        this.gameObjects = [this.ball, this.paddle, ...bricks];

        this.totalBricks = bricks.length;

    }

    listen() {

        new InputHandler(this);

    }

    update(dT) {

        if (this.gamestate == GAMESTATE.PAUSED || this.gamestate == GAMESTATE.SETTINGS) return;

        if (this.gamestate == GAMESTATE.FINISHED) {

            this.ended();
            return;

        }

        if (this.gamestate == GAMESTATE.RESTARTING) {

            this.restarting(dT);
            return;
        }

        if (this.gameObjects.length == 2) {
            if (!this.diedThisLevel) this.lives += 1;
            this.levelstate += 1;
            if (this.levelstate == levels.length - 1) {

                this.gamestate = GAMESTATE.FINISHED;
                this.ended();
                return;
            }

            this.start(this.paddleWidth, this.ballSpeed);
            this.gamestate = GAMESTATE.RESTARTING;
        }

        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
        this.gameObjects.forEach(object => object.update(dT));

    }

    draw(c) {

        this.gameObjects.forEach(object => object.draw(c));

    }

    toggleSettings() {

        if (this.gamestate == GAMESTATE.SETTINGS) {

            document.getElementById("gameScreen").style.display = "none";
            document.getElementById("pauseSettings").style.display = "inline-block";


        } else {

            document.getElementById("gameScreen").style.display = "inline-block";
            document.getElementById("pauseSettings").style.display = "none";

            if (this.ballSpeed != document.getElementById("ballSpeedChange").value) {

                this.ballSpeed = document.getElementById("ballSpeedChange").value;
                this.ball = new Ball(this, this.ballSpeed);
                this.gameObjects[0] = this.ball;
                this.gamestate = GAMESTATE.RESTARTING;
            }

            if (this.paddleWidth != document.getElementById("paddleWidthChange").value) {

                this.paddleWidth = document.getElementById("paddleWidthChange").value;
                this.paddle = new Paddle(this, this.paddleWidth);
                this.gameObjects[1] = this.paddle;
                this.gamestate = GAMESTATE.RESTARTING;
            }

        }
    }

    restarting(dT) {

        this.paddle.update(dT);
        this.ball.restarting();
    }

    ended() {

        if (this.lives != 0) {

            document.getElementById("gameCompletedScreen").style.display = "inline-block";

        } else {

            document.getElementById("gameOverScreen").style.display = "inline-block";

        }

        document.getElementById("gameScreen").style.display = "none";


    }

}

export { GAMESTATE, Game };