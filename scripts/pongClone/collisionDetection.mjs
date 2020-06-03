function yDetectCollision(ball, gameObject) {

    let bottomOfBall = ball.position.y + ball.radius;
    let topOfBall = ball.position.y - ball.radius;

    let topOfObject = gameObject.position.y;
    let leftOfObject = gameObject.position.x;
    let rightOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    if (

        ((ball.speed.y > 0 &&
                bottomOfBall > topOfObject &&
                topOfBall < topOfObject) ||

            (ball.speed.y < 0 &&
                topOfBall < bottomOfObject &&
                bottomOfBall > topOfObject))

        &&

        ball.position.x > leftOfObject &&

        ball.position.x < rightOfObject

    ) {

        return true;

    } else {

        return false;

    }

}

function xDetectCollision(ball, gameObject) {

    let rightOfBall = ball.position.x + ball.radius;
    let leftOfBall = ball.position.x - ball.radius;

    let topOfObject = gameObject.position.y;
    let leftOfObject = gameObject.position.x;
    let rightOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    if (

        ((ball.speed.x > 0 &&
                rightOfBall > leftOfObject &&
                leftOfBall < leftOfObject) ||

            (ball.speed.x < 0 &&
                leftOfBall < rightOfObject &&
                rightOfBall > rightOfObject))

        &&

        ball.position.y < bottomOfObject &&

        ball.position.y > topOfObject

    ) {

        return true;

    } else {

        return false;
    }
}

export { yDetectCollision, xDetectCollision };