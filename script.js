let accel = 0.05;
let circles;
let ball = {
    x: 200,
    y: 100,
    size: 50,
    velA: 0,
}
function setup() {
    createCanvas(400, 400);
}
function draw() {
    background(100);
    for (let i = 0; i < circles.length; i++) {
        circles(ball.x, ball.y, ball.size);
        updateCircle(circles[i]);
        for (let j = i + 1; j < circles.length; j++) {
            checkCollision(circles[i], circle);
        }
        ball.velY += accel;
        ball.y += ball.velY
        if (ball.y > 400 - ball.size / 2) {
            ball.velY *= -0.9;
            ball.y = 400 - ball.size / 2;
        }
    }
}

function updateCircle() {

}
function checkCollision(a, b) {
    let dist = sqrt()
}