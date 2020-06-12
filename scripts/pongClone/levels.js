import Brick from './brick.js';

function buildLevel(game, level) {

    let bricks = [];
    let brickWidth = 45;

    let spacing = {

        x: (game.gameWidth - (level[0].length * brickWidth)) / (level[0].length + 1),

    }

    level.forEach((row, rowIndex) => {

        row.forEach((brick, brickIndex) => {

            if (brick === 1) {

                let position = {

                    x: ((brickWidth + spacing.x) * brickIndex) + spacing.x,
                    y: (60 * rowIndex) + 35,

                }

                bricks.push(new Brick(game, position, brickWidth));

            }
        });
    });

    return bricks;
}

const levels = [

    [
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1]
    ],

    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0]
    ],

    [
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0]
    ],

    [
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1]
    ],

    [
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ],
];

export { buildLevel, levels };