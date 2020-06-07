export default class Velocity {

    constructor() {

        this.x = 0;
        this.y = 0;
        this.theta = 0;
        this.moving = false;
    }

    magnitude() {

        return (this.x ** 2 + this.y ** 2) ** 0.5;

    }

    update() {

        if (this.magnitude() > 0.2) {

            this.x *= 0.97;
            this.y *= 0.97;

        } else {

            this.x = 0;
            this.y = 0;

        }
    }

    rotate(angle) {

        return [this.x * Math.cos(angle) - (-this.y) * Math.sin(angle),
            this.x * Math.sin(angle) + (-this.y) * Math.cos(angle)
        ];
    }

}