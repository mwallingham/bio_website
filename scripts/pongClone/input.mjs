import { GAMESTATE } from './game.mjs';

export default class InputHandler {

    constructor(game) {

        let lastState = 2;

        document.addEventListener('keydown', event => {

            switch (event.keyCode) {

                case 37:

                    game.paddle.moveLeft();
                    break;

                case 39:

                    game.paddle.moveRight();
                    break;

                case 32:

                    if (game.gamestate == GAMESTATE.RESTARTING) {
                        game.gamestate = GAMESTATE.RUNNING;
                        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                        game.ball.speed.x = Math.ceil(Math.random() * game.ball.speed.max_x) * plusOrMinus;
                    }
                    break;

                case 27:
                    //escape key

                    switch (game.gamestate) {

                        case GAMESTATE.PAUSED:

                            game.gamestate = GAMESTATE.RUNNING;
                            break;

                        case GAMESTATE.RUNNING:

                            game.gamestate = GAMESTATE.PAUSED;
                            break;

                        case GAMESTATE.SETTINGS:

                            game.gamestate = lastState;
                            game.toggleSettings();
                            break;
                    }

                    break;

                case 83:
                    //s key
                    if (game.gamestate != GAMESTATE.SETTINGS) {

                        lastState = game.gamestate;
                        game.gamestate = GAMESTATE.SETTINGS;

                    } else {

                        game.gamestate = lastState;

                    }

                    game.toggleSettings();

                    break;
            }
        })

        document.addEventListener('keyup', event => {

            switch (event.keyCode) {

                case 37:

                    if (game.paddle.speed < 0)
                        game.paddle.stop();

                    break;

                case 39:

                    if (game.paddle.speed > 0)
                        game.paddle.stop();
                    break;

                case 32:

                    game.paddle.speed = 0;
                    break;
            }
        })
    }
}