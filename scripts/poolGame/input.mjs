import { GAMESTATE } from './game.mjs';

export default class InputHandler {

    constructor(game) {

        document.addEventListener('keydown', event => {

            switch (event.keyCode) {

                case 32:

                    switch (game.gamestate) {

                        case GAMESTATE.STATIC:

                            game.cue.adjustPower();
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

                            game.cue.sendPower();
                            break;

                    }
                    break;
            }

        })


        window.addEventListener('mousemove', function(e) {

            switch (game.gamestate) {

                case GAMESTATE.STATIC:

                    game.cue.fromMouse({

                        x: e.x,
                        y: e.y,

                    });

                    break;


            }

        });
    }
}