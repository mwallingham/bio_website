export default class Velocity {

    constructor() {

        this.x = 0;
        this.y = 0;

    }

    magnitude() {

        return (this.x ** 2 + this.y ** 2) ** 0.5;

    }

    update() {

        if (this.magnitude() > 0.2) {

            this.x *= 0.98;
            this.y *= 0.98;

        } else {

            this.x = 0;
            this.y = 0;

        }
    }

}