import Player from './player.mjs';
import Pointer from './pointer.mjs';
import InputHandler from './input.mjs';

export default class Game {

    constructor(GAME_WIDTH, GAME_HEIGHT) {

        this.gameWidth = GAME_WIDTH;
        this.gameHeight = GAME_HEIGHT;
        this.players = [];
        this.pointer = new Pointer(this);
        this.playerActive = true;
        this.currentPlayer = 0;

    }

    listen() {

        new InputHandler(this);

    }

    addPlayer(name, colour) {

        this.players.push(new Player(this, name, colour));

    }

    draw(c) {

        this.players.forEach(object => {
            if (object.initiated) object.draw(c);
        });

        if (this.playerActive) {
            this.players[this.currentPlayer].initiated = true;
            this.pointer.draw(c, this.players[this.currentPlayer].position)
        };

    }

    update(dT) {

        this.players.forEach((object, playerIndex) => {

            if (object.initiated) {

                for (let i = 0; i < (this.players.length - 1); i++) {

                    let next = this.players[(playerIndex + 1 + i) % this.players.length];

                    if (next.initiated) {

                        if (object.distanceFrom(next) <= (2 * object.radius) ** 2) {

                            this.setCollisionVelocities(object, next);
                        }
                    }
                }
            }
            object.update(dT);

        });

        let rotated = this.players[this.currentPlayer].velocity.rotate(Math.PI / 2);

        document.getElementById("tan").textContent = "x: " + rotated[0].toString() + "  y:  " +
            rotated[1].toString();



        if ((!this.playerActive) && (this.players.every(this.finished))) {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
            this.playerActive = true;
            this.pointer.angle = Math.PI;
            this.pointer.power = 0;
            this.pointer.timer = 0;
            this.currentPlayer = this.currentPlayer % this.players.length;
        }
    }

    finished(player) {

        return player.velocity.magnitude() == 0;

    }

    setCollisionVelocities(object1, object2) {


        let O1_O2 = Math.atan2(object2.position.y - object1.position.y,
            object2.position.x - object1.position.x);
        let O2_O1 = Math.atan2(object1.position.y - object2.position.y,
            object1.position.x - object2.position.x);

        let O1_R = object1.velocity.rotate(-O1_O2);
        let O2_R = object2.velocity.rotate(-O2_O1);

        let O1_alongAxis = O1_R[0];
        let O2_alongAxis = O2_R[0];
        let O1_perpAxis = O1_R[1];
        let O2_perpAxis = O2_R[1];

        let m1 = object1.mass;
        let m2 = object2.mass;
        let v11 = O1_alongAxis;
        let v21 = O2_alongAxis;

        let tKE = 0.5 * m1 * (v11 ** 2) + 0.5 * m2 * (v21 ** 2);
        let P = m1 * v11 + m2 * v21;

        let A = m1 + (m1 ** 2) / m2;
        let B = -(2 * P * m1) / m2;
        let C = (P ** 2) / m2 - 2 * tKE;

        let v121 = (-B + (B ** 2 - 4 * A * C) ** 0.5) / (2 * A);
        let v122 = (-B - (B ** 2 - 4 * A * C) ** 0.5) / (2 * A);

        let v12 = 0;
        let v22 = 0;

        if (v11 > v21) {

            v12 = Math.min(v121, v122);
            v22 = Math.max(v121, v122);

        } else {

            v22 = Math.min(v121, v122);
            v12 = Math.max(v121, v122);

        }

        let z = -Math.PI;

        object1.velocity.x = v12 * Math.cos(O1_O2 + z) - O1_perpAxis * Math.sin(O1_O2 + z);
        object1.velocity.y = v12 * Math.sin(O1_O2 + z) + O1_perpAxis * Math.cos(O1_O2 + z);

        object2.velocity.x = v22 * Math.cos(O2_O1) - O2_perpAxis * Math.sin(O2_O1);
        object2.velocity.y = v22 * Math.sin(O2_O1) + O2_perpAxis * Math.cos(O2_O1);

        while (object1.distanceFrom(object2) <= (2 * object1.radius) ** 2) {

            object1.update(1);
            object2.update(1);

        }
        return;

    }

}