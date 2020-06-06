import Player from './player.mjs';
import Pointer from './pointer.mjs';
import InputHandler from './input.mjs';
import Gate from './gate.mjs';

const GAMESTATE = {

    STATIC: 0,
    MOVING: 1,
    CROQUET: 2,

}

class Game {

    constructor(GAME_WIDTH, GAME_HEIGHT, Context) {

        this.gameWidth = GAME_WIDTH;
        this.gameHeight = GAME_HEIGHT;
        this.players = [];
        this.pointer = new Pointer(this);
        this.gamestate = GAMESTATE.STATIC;
        this.lastGamestate = GAMESTATE.STATIC;
        this.playerActive = true;
        this.currentPlayer = 0;
        this.cxt = Context;
        this.gates = [];
    }

    listen() {

        new InputHandler(this);

    }

    addPlayer(name, colour) {

        this.players.push(new Player(this, name, colour));
    }

    addGate(position, facing) {

        this.gates.push(new Gate(this, position, facing));

    }

    draw(c) {

        switch (this.gamestate) {


            case GAMESTATE.STATIC:

                this.players[this.currentPlayer].initiated = true;
                this.pointer.draw(c, this.players[this.currentPlayer].position);
                break;

        }

        this.players.forEach(object => {
            if (object.initiated) object.draw(c);
        });

        this.gates.forEach(object => object.draw(c));

    }

    update(dT) {



        switch (this.gamestate) {

            case GAMESTATE.STATIC:
                break;

            case GAMESTATE.CROQUET:
                break;

            case GAMESTATE.MOVING:

                let activePlayer = this.players[this.currentPlayer];

                //checking for ball collisions
                this.checkBallCollisions(activePlayer);

                //checking for gate collisions
                this.checkGateCollisions();

                //update all player positions
                this.players.forEach(object => object.update(dT));

                //checking for all static
                if (this.players.every(this.finished)) {

                    this.pointer.reset();

                    this.players.forEach(object => {

                        if (object.hitThisTurn) {

                            activePlayer.playersHit.push(object);
                            object.hitThisTurn = false;

                        }
                    });

                    if (activePlayer.playersHit.length > 0) {
                        this.gamestate = GAMESTATE.CROQUET;
                        activePlayer.playerToCroquet = activePlayer.playersHit.shift();
                        activePlayer.justCroqued = true;
                    } else {

                        this.gamestate = GAMESTATE.STATIC;

                        if (activePlayer.justCroqued) {

                            activePlayer.justCroqued = false;
                            break;

                        }

                        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
                    }
                }

                break;

        }
    }

    finished(player) {

        return player.velocity.magnitude() == 0;

    }

    vectorCollision(player1, player2) {

        let p1vx = player1.velocity.x;
        let p2vx = player2.velocity.x;
        let p1px = player1.position.x;
        let p2px = player2.position.x;
        let p1vy = player1.velocity.y;
        let p2vy = player2.velocity.y;
        let p1py = player1.position.y;
        let p2py = player2.position.y;
        let m1 = player1.mass;
        let m2 = player2.mass;

        //unit vector connecting two centers

        let c_c = [

            (p2px - p1px) / (Math.sqrt((p2py - p1py) ** 2 + (p2px - p1px) ** 2)),
            (p2py - p1py) / (Math.sqrt((p2py - p1py) ** 2 + (p2px - p1px) ** 2))

        ];

        //unit vector perpendicular

        let perp_c_c = [

            (-c_c[1] / c_c[0]) / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1),
            1 / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1)

        ];


        //getting magnitudes of velocities in direction of collision

        let p1vcollision = this.dot(c_c, [p1vx, p1vy]);
        let p2vcollision = this.dot(c_c, [p2vx, p2vy]);

        //getting magnitudes of velocities perpendicular

        let p1vperp = this.dot(perp_c_c, [p1vx, p1vy]);
        let p2vperp = this.dot(perp_c_c, [p2vx, p2vy]);


        //solving 1d problem

        let tKE = 0.5 * m1 * (p1vcollision ** 2) + 0.5 * m2 * (p2vcollision ** 2);
        let P = m1 * p1vcollision + m2 * p2vcollision;

        let A = m1 + (m1 ** 2) / m2;
        let B = -(2 * P * m1) / m2;
        let C = (P ** 2) / m2 - 2 * tKE;

        let v121 = (-B + (B ** 2 - 4 * A * C) ** 0.5) / (2 * A);
        let v122 = (-B - (B ** 2 - 4 * A * C) ** 0.5) / (2 * A);

        let v12 = 0;
        let v22 = 0;

        if (Math.abs(p1vcollision - v121) < 0.01) {

            v12 = v122;
            v22 = v121;

        } else {

            v12 = v121;
            v22 = v122;

        }

        player1.velocity.x = v12 * c_c[0] + p1vperp * perp_c_c[0];
        player1.velocity.y = v12 * c_c[1] + p1vperp * perp_c_c[1];

        player2.velocity.x = v22 * c_c[0] + p2vperp * perp_c_c[0];
        player2.velocity.y = v22 * c_c[1] + p2vperp * perp_c_c[1];

    }

    dot(object1, object2) {

        let one = object1[0] * object2[0];
        let two = object1[1] * object2[1];

        return one + two

    }

    vectorCollisionPost(player, post) {

        let pvx = player.velocity.x;
        let ppx = player.position.x;
        let pvy = player.velocity.y;
        let ppy = player.position.y;
        let postx = post.position.x;
        let posty = post.position.y;

        let c_c = [

            (postx - ppx) / (Math.sqrt((posty - ppy) ** 2 + (postx - ppx) ** 2)),
            (posty - ppy) / (Math.sqrt((posty - ppy) ** 2 + (postx - ppx) ** 2))

        ];

        let perp_c_c = [

            (-c_c[1] / c_c[0]) / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1),
            1 / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1)

        ];

        let p1vcollision = this.dot(c_c, [pvx, pvy]);
        let p1vperp = this.dot(perp_c_c, [pvx, pvy]);

        let v12 = -p1vcollision * 0.1;

        player.velocity.x = v12 * c_c[0] + p1vperp * perp_c_c[0];
        player.velocity.y = v12 * c_c[1] + p1vperp * perp_c_c[1];

    }

    checkBallCollisions(activePlayer) {

        this.players.forEach((object, playerIndex) => {

            if (object.initiated) {

                for (let i = 0; i < (this.players.length - 1); i++) {

                    let next = this.players[(playerIndex + 1 + i) % this.players.length];

                    if (next.initiated) {

                        if (object.distanceFrom(next) <= (2 * object.radius) ** 2) {

                            while (object.distanceFrom(next) <= (2 * object.radius) ** 2) {

                                object.position.x -= object.velocity.x;
                                object.position.y -= object.velocity.y;
                                next.position.x -= next.velocity.x;
                                next.position.y -= next.velocity.y;
                            }

                            this.vectorCollision(object, next);

                            if (activePlayer == object && activePlayer.playerToCroquet != next) next.hitThisTurn = true;
                            if (activePlayer == next && activePlayer.playerToCroquet != object) object.hitThisTurn = true;

                        }
                    }
                }
            }
        });
    }

    checkGateCollisions() {

        this.players.forEach(player => {

            if (player.initiated) {

                this.gates.forEach(gate => {

                    if (player.distanceFrom(gate.post1) <= (gate.post1.radius) ** 2 + (player.radius) ** 2) {

                        while (player.distanceFrom(gate.post1) <= (gate.post1.radius) ** 2 + (player.radius) ** 2) {

                            player.position.x -= player.velocity.x;
                            player.position.y -= player.velocity.y;
                        }

                        this.vectorCollisionPost(player, gate.post1);

                    }
                    if (player.distanceFrom(gate.post2) <= (gate.post2.radius) ** 2 + (player.radius) ** 2) {

                        while (player.distanceFrom(gate.post2) <= (gate.post2.radius) ** 2 + (player.radius) ** 2) {

                            player.position.x -= player.velocity.x;
                            player.position.y -= player.velocity.y;
                        }

                        this.vectorCollisionPost(player, gate.post2);

                    }
                })
            }
        })

    }

}

export { GAMESTATE, Game };