export default class Gate {

    constructor(position, facing, method, id) {

        //facing up down, from above - 0
        //facing up down, from below - 1
        //facing left right, from left - 2
        //facing left right, from right - 3

        this.gap = 23;
        this.colour = '#808080';
        this.facing = facing;
        this.method = method;
        this.id = id;


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

    draw(c, colour) {

        c.beginPath();
        c.arc(this.post1.position.x, this.post1.position.y, this.post1.radius, 0, 2 * Math.PI);
        c.fillStyle = colour;
        c.fill();
        c.stroke();

        c.beginPath();
        c.arc(this.post2.position.x, this.post2.position.y, this.post1.radius, 0, 2 * Math.PI);
        c.fillStyle = colour;
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

        this.radius = 3;
        this.mass = 1000;

    }

}