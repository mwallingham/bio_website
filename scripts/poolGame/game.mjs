import Ball from "./ball.mjs";
import Cue from "./cue.mjs";
import InputHandler from "./input.mjs";
import { SidePocket, CornerPocket } from "./pockets.mjs";
import { pocketStats } from "./pockets.mjs";

const GAMESTATE = {

    STATIC: 0,
    MOVING: 1,
}

class Game {

    constructor(width, height, border, pocketW) {

        this.width = width;
        this.height = height;
        this.border = border;
        this.pocketW = pocketW;
        this.balls = [];
        this.pockets = [];
        this.cueBall = new Ball(this, width * .2, height / 2, 'white');

        this.balls.push(this.cueBall);

        this.cue = new Cue(this);
        this.ballR = this.cueBall.radius;
        this.gamestate = GAMESTATE.STATIC;
        this.breaking = true;
    }

    listen() {

        new InputHandler(this);

    }

    firstBall() {

        this.balls.push(new Ball(this, this.width * .8, this.height / 2, 'red'));
    }

    update(dT) {

        switch (this.gamestate) {

            case GAMESTATE.MOVING:

                this.balls = this.balls.filter(function(item) {

                    return !item.potted;

                });

                this.checkBallCollisions();

                this.balls.forEach(ball => ball.update(dT));

                this.cueBall.update(dT);

                if (this.balls.every(this.finished)) {

                    this.cue.reset();
                    this.gamestate = GAMESTATE.STATIC;

                }
                break;

            case GAMESTATE.STATIC:

                this.cue.update(dT);
        }
    }

    startrack() {

        this.balls.forEach(ball => {

            ball.radius += ball.offsetForBreak;

        });

        let count = 0;
        let dx = 2 * this.ballR * Math.cos(30 * Math.PI / 180);
        let dy = 2 * this.ballR * Math.sin(30 * Math.PI / 180);
        let colour = 'red';
        let upDown = 1;
        let rackX = this.width * 0.7;
        let rackY = this.height / 2;


        for (let i = 1; i < 6; i++) {

            let levelCount = 0;
            let row = 0;
            let offset = 0;

            for (let j = 0; j < i; j++) {

                (count % 2 == 0) ? colour = 'red': colour = 'yellow';

                if (i % 2 == 1 && j == 0) {

                    this.balls.push(new Ball(this, rackX + (i - 1) * dx, rackY, colour, this));
                    row = 1;
                    offset = 0;
                    continue;

                } else if (i % 2 == 0) {

                    offset = dy;

                }

                if (levelCount % 2 == 0 && levelCount > 0) {

                    row += 1;

                };

                levelCount += 1;

                if (i > 1) {

                    (j % 2 == 0) ? upDown = -1: upDown = 1;

                    this.balls.push(new Ball(this, rackX + (i - 1) * dx, rackY + (offset + 2 * this.ballR * row) * upDown, colour));

                    console.log(dy);
                }

                count++;
            }
        }

        this.balls.forEach(ball => {

            ball.radius -= ball.offsetForBreak;

        });

        this.pockets.push(new SidePocket(this.width / 2, this.pocketW, 0));
        this.pockets.push(new SidePocket(this.width / 2, this.height - this.pocketW, Math.PI));
        this.pockets.push(new CornerPocket(this.width - this.border, this.border, 0));
        this.pockets.push(new CornerPocket(this.width - this.border, this.height - this.border, Math.PI / 2));
        this.pockets.push(new CornerPocket(this.border, this.height - this.border, Math.PI));
        this.pockets.push(new CornerPocket(this.border, this.border, 3 * Math.PI / 2));
    }

    draw(c) {

        this.pockets.forEach(pocket => pocket.draw(c));

        switch (this.gamestate) {

            case GAMESTATE.STATIC:

                this.cue.draw(c);

        }

        this.balls.forEach(ball => ball.draw(c));
        this.cueBall.draw(c);


    }

    finished(ball) {

        return ball.velocity.magnitude() == 0;

    }

    dot(object1, object2) {

        let one = object1[0] * object2[0];
        let two = object1[1] * object2[1];

        return one + two

    }

    vectorCollision(ball1, ball2) {

        let b1vx = ball1.velocity.x;
        let b2vx = ball2.velocity.x;
        let b1px = ball1.position.x;
        let b2px = ball2.position.x;
        let b1vy = ball1.velocity.y;
        let b2vy = ball2.velocity.y;
        let b1py = ball1.position.y;
        let b2py = ball2.position.y;
        let m1 = ball1.mass;
        let m2 = ball2.mass;

        //unit vector connecting two centers

        let c_c = [

            (b2px - b1px) / (Math.sqrt((b2py - b1py) ** 2 + (b2px - b1px) ** 2)),
            (b2py - b1py) / (Math.sqrt((b2py - b1py) ** 2 + (b2px - b1px) ** 2))

        ];

        //unit vector perpendicular

        let perp_c_c = [

            (-c_c[1] / c_c[0]) / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1),
            1 / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1)

        ];


        //getting magnitudes of velocities in direction of collision

        let b1vcollision = this.dot(c_c, [b1vx, b1vy]);
        let b2vcollision = this.dot(c_c, [b2vx, b2vy]);

        //getting magnitudes of velocities perpendicular

        let b1vperp = this.dot(perp_c_c, [b1vx, b1vy]);
        let b2vperp = this.dot(perp_c_c, [b2vx, b2vy]);


        //solving 1d problem

        let tKE = 0.5 * m1 * (b1vcollision ** 2) + 0.5 * m2 * (b2vcollision ** 2);
        let P = m1 * b1vcollision + m2 * b2vcollision;

        let A = m1 + (m1 ** 2) / m2;
        let B = -(2 * P * m1) / m2;
        let C = (P ** 2) / m2 - 2 * tKE;

        let v121 = (-B + (B ** 2 - 4 * A * C) ** 0.5) / (2 * A);
        let v122 = (-B - (B ** 2 - 4 * A * C) ** 0.5) / (2 * A);

        let v12 = 0;
        let v22 = 0;

        if (Math.abs(b1vcollision - v121) < 0.01) {

            v12 = v122;
            v22 = v121;

        } else {

            v12 = v121;
            v22 = v122;

        }

        ball1.velocity.x = v12 * c_c[0] + b1vperp * perp_c_c[0];
        ball1.velocity.y = v12 * c_c[1] + b1vperp * perp_c_c[1];

        ball2.velocity.x = v22 * c_c[0] + b2vperp * perp_c_c[0];
        ball2.velocity.y = v22 * c_c[1] + b2vperp * perp_c_c[1];

    }

    dot(object1, object2) {

        let one = object1[0] * object2[0];
        let two = object1[1] * object2[1];

        return one + two

    }

    vectorCollisionPocket(ball, corner) {

        let pvx = ball.velocity.x;
        let ppx = ball.position.x;
        let pvy = ball.velocity.y;
        let ppy = ball.position.y;
        let cornerx = corner.x;
        let cornery = corner.y;

        let c_c = [

            (cornerx - ppx) / (Math.sqrt((cornery - ppy) ** 2 + (cornerx - ppx) ** 2)),
            (cornery - ppy) / (Math.sqrt((cornery - ppy) ** 2 + (cornerx - ppx) ** 2))

        ];

        let perp_c_c = [

            (-c_c[1] / c_c[0]) / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1),
            1 / Math.sqrt((-c_c[1] / c_c[0]) ** 2 + 1)

        ];

        let p1vcollision = this.dot(c_c, [pvx, pvy]);
        let p1vperp = this.dot(perp_c_c, [pvx, pvy]);

        let v12 = -p1vcollision * 0.1;

        ball.velocity.x = v12 * c_c[0] + p1vperp * perp_c_c[0];
        ball.velocity.y = v12 * c_c[1] + p1vperp * perp_c_c[1];

    }

    checkBallCollisions() {

        this.balls.forEach((object, ballIndex) => {

            for (let i = ballIndex + 1; i < this.balls.length; i++) {

                let next = this.balls[i];

                if (object.distanceFrom(next) <= (2 * object.radius) ** 2) {

                    while (object.distanceFrom(next) <= (2 * object.radius) ** 2) {

                        object.position.x -= object.velocity.x;
                        object.position.y -= object.velocity.y;
                        next.position.x -= next.velocity.x;
                        next.position.y -= next.velocity.y;
                    }

                    this.vectorCollision(object, next);
                }
            }

            this.pockets.forEach(pocket => {

                if (object.distanceFrom(pocket) < pocketStats.pocketR ** 2 + object.radius ** 2) object.potted = true;

                else if (object.distanceFromCorner(pocket.modelCircleRight) < pocket.modelCirleR ** 2 + object.radius ** 2) this.vectorCollisionPocket(object, pocket.modelCircleRight);

                else if (object.distanceFromCorner(pocket.modelCircleLeft) < pocket.modelCirleR ** 2 + object.radius ** 2) this.vectorCollisionPocket(object, pocket.modelCirleLeft);


            })

        });
    }
}

export { Game, GAMESTATE };