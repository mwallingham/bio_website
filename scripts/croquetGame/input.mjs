export default class InputHandler {

    constructor(game) {

        document.addEventListener('keydown', event => {

            switch (event.keyCode) {

                case 37:

                    if (game.playerActive) game.pointer.moveLeft();
                    break;

                case 39:

                    if (game.playerActive) game.pointer.moveRight();
                    break;

                case 32:

                    if (game.playerActive) game.pointer.adjustPower();
                    break;

            }


        })

        document.addEventListener('keyup', event => {

            switch (event.keyCode) {

                case 32:

                    game.pointer.sendPower();
                    break;


            }


        })


    }


}