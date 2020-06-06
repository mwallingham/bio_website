import { GAMESTATE } from './game.mjs';

export default class InputHandler {

    constructor(game) {

        document.addEventListener('keydown', event => {

            switch (event.keyCode) {

                case 32:

                    switch (game.gamestate) {

                        case GAMESTATE.STATIC:

                            game.pointer.adjustPower();
                            break;

                    }
                    break;
            }
        })

        document.addEventListener('keyup', event => {

            switch (event.keyCode) {

                case 32:

                    switch (game.gamestate) {

                        case GAMESTATE.STATIC:

                            game.pointer.sendPower();
                            break;

                    }
                    break;
            }

        })

        document.addEventListener('click', event => {

            switch (game.gamestate) {

                case GAMESTATE.CROQUET:

                    game.gamestate = GAMESTATE.STATIC;

            }
        })

        window.addEventListener('mousemove', function(e) {

            switch (game.gamestate) {

                case GAMESTATE.STATIC:

                    game.pointer.fromMouse({

                        x: e.x,
                        y: e.y,

                    });

                    break;

                case GAMESTATE.CROQUET:

                    game.players[game.currentPlayer].moveForCroquet({

                        x: e.x,
                        y: e.y,

                    });

                    break;

            }

        });
    }
}