export default class Gate {

    constructor(game, position, facing) {

        this.game = game;
        this.gap = 35;
        this.colour = '#808080';

        switch (facing) {

            case 0:

                this.post1 = new Post(position[0] - this.gap / 2, position[1]);

                this.post2 = new Post(position[0] + this.gap / 2, position[1]);

                break;

            case 1:

                this.post1 = new Post(position[0], position[1] - this.gap / 2);

                this.post2 = new Post(position[0], position[1] + this.gap / 2);

                break;
        }

        this.velocity = {
            x: 0,
            y: 0
        }

    }

    draw(c) {

        c.beginPath();
        c.arc(this.post1.position.x, this.post1.position.y, this.post1.radius, 0, 2 * Math.PI);
        c.fillStyle = this.colour;
        c.fill();
        c.stroke();

        c.beginPath();
        c.arc(this.post2.position.x, this.post2.position.y, this.post1.radius, 0, 2 * Math.PI);
        c.fillStyle = this.colour;
        c.fill();
        c.stroke();

    }



}

class Post {

    constructor(x, y) {

        this.position = {

            x: x,
            y: y

        }

        this.radius = 5;
        this.mass = 1000;

    }

}