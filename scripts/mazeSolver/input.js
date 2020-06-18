import { GAMESTATE } from './game.js';



export default class InputHandler {

    constructor(game) {


        window.addEventListener('click', function(e) {

            switch (game.gamestate) {

                case GAMESTATE.STATIC:

                    game.setTarget({

                        x: e.x,
                        y: e.y,

                    });
                    break;
            }
        })
    }
}