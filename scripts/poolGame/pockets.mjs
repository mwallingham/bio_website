const pocketStats = {

    pocketW: 20,
    pocketR: 15,
    border: 30

}

class SidePocket {

    constructor(x, y, angle) {

        this.position = {

            x: x,
            y: y

        }

        this.pocketRight = {

            x: pocketStats.pocketW,
            y: pocketStats.border - pocketStats.pocketW


        }

        this.pocketLeft = {

            x: -pocketStats.pocketW,
            y: pocketStats.border - pocketStats.pocketW,


        }

        this.modelCircleRight = {

            x: pocketStats.pocketW + 4,
            y: 1,

        }

        this.modelCircleLeft = {

            x: -(pocketStats.pocketW + 4),
            y: 1,

        }

        this.modelCircleR = 10;

        if (angle != 0) {

            this.pocketRight = vectorRotate(this.pocketRight, angle);
            this.pocketLeft = vectorRotate(this.pocketLeft, angle);
            this.modelCircleRight = vectorRotate(this.modelCircleRight, angle);
            this.modelCircleLeft = vectorRotate(this.modelCircleLeft, angle);

        }


        console.log(this.pocketLeft);
        console.log(this.pocketRight);
    }

    draw(c) {

        /*c.beginPath();
        c.arc(this.position.x + this.modelCircleRight.x, this.position.y + this.modelCircleRight.y, this.modelCircleR, 0, 2 * Math.PI);
        c.stroke();

        c.beginPath();
        c.arc(this.position.x + this.modelCircleLeft.x, this.position.y + this.modelCircleLeft.y, this.modelCircleR, 0, 2 * Math.PI);
        c.stroke();*/

        c.beginPath();
        c.fillStyle = "green";
        c.moveTo(this.position.x, this.position.y);
        c.lineTo(this.position.x + this.pocketLeft.x, this.position.y + this.pocketLeft.y);
        c.lineTo(this.position.x + this.pocketRight.x, this.position.y + this.pocketRight.y);
        c.fill();

        c.beginPath();
        c.arc(this.position.x, this.position.y, pocketStats.pocketR, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
        c.stroke();
    }
}

class CornerPocket {

    constructor(x, y, angle) {

        this.position = {

            x: x,
            y: y
        }

        this.modelCircleR = 10;

        this.pocketRight = {

            x: 0,
            y: 20

        }

        this.pocketLeft = {

            x: -20,
            y: 0,

        }

        this.modelCircleRight = {

            x: 0 + this.modelCircleR,
            y: 20,

        }

        this.modelCircleLeft = {

            x: -20,
            y: 0 - this.modelCircleR,

        }

        this.trianglecenter = {

            x: 15 / Math.sqrt(2),
            y: -15 / Math.sqrt(2)

        }

        if (angle != 0) {

            this.pocketRight = vectorRotate(this.pocketRight, angle);
            this.pocketLeft = vectorRotate(this.pocketLeft, angle);
            this.modelCircleLeft = vectorRotate(this.modelCircleLeft, angle);
            this.modelCircleRight = vectorRotate(this.modelCircleRight, angle);
            this.trianglecenter = vectorRotate(this.trianglecenter, angle);

        }

    }

    draw(c) {

        /*c.beginPath();
        c.arc(this.position.x + this.modelCircleRight.x, this.position.y + this.modelCircleRight.y, this.modelCircleR, 0, 2 * Math.PI);
        c.stroke();

        c.beginPath();
        c.arc(this.position.x + this.modelCircleLeft.x, this.position.y + this.modelCircleLeft.y, this.modelCircleR, 0, 2 * Math.PI);
        c.stroke();*/

        c.beginPath();
        c.fillStyle = "green";
        c.moveTo(this.position.x + this.trianglecenter.x, this.position.y + this.trianglecenter.y);
        c.lineTo(this.position.x + this.pocketLeft.x, this.position.y + this.pocketLeft.y);
        c.lineTo(this.position.x + this.pocketRight.x, this.position.y + this.pocketRight.y);
        c.fill();

        c.beginPath();
        c.arc(this.position.x, this.position.y, pocketStats.pocketR, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
        c.stroke();

    }
}

function vectorRotate(vector, angle) {

    return {

        x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
        y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle),

    };
}

export { SidePocket, CornerPocket, pocketStats };