const ANGLE = {

    1: Math.PI / 4,
    2: 3 * Math.PI / 4,
    3: 5 * Math.PI / 4,
    4: 7 * Math.PI / 4


}

class SidePocket {

    constructor(x, y, rotate, game) {

        this.position = {

            x: x,
            y: y

        }

        this.border = game.border;
        this.pocketW = game.pocketW;

        (rotate === 0) ? this.rotate = -1: this.rotate = 1;




    }

    draw(c) {

        c.beginPath();
        c.fillStyle = "#297d0a";
        c.moveTo(this.position.x, this.position.y);
        c.lineTo(this.position.x - this.pocketW, this.position.y + (this.border - this.pocketW) * this.rotate);
        c.lineTo(this.position.x + this.pocketW, this.position.y + (this.border - this.pocketW) * this.rotate);
        c.fill();

        c.beginPath();
        c.arc(this.position.x, this.position.y, 15, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
        c.stroke();

    }
}

class CornerPocket {

    constructor(x, y, rotate, game) {

        this.position = {

            x: x,
            y: y

        }

    }

    draw(c) {

        c.beginPath();
        c.fillStyle = "#297d0a";
        c.moveTo(this.position.x, this.position.y);
        c.lineTo(this.position.x - this.pocketW, this.position.y + (this.border - this.pocketW) * this.rotate);
        c.lineTo(this.position.x + this.pocketW, this.position.y + (this.border - this.pocketW) * this.rotate);
        c.fill();

        c.beginPath();
        c.arc(this.position.x, this.position.y, 15, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
        c.stroke();

    }
}

export { SidePocket, CornerPocket };