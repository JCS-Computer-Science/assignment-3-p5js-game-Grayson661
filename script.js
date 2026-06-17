let player = {
    x: 200,
    y: 350,
    width: 50,
    height: 30,
    speed: 5
};

let bullets = [];
let asteroids = [];

let score = 0;
let gameOver = false;

function setup() {
    createCanvas(400, 400);

    let button = document.getElementById("restartBtn");
    button.addEventListener("click", resetGame);
}

function draw() {
    background(0);

    if (gameOver) {
        fill(255);
        textSize(32);
        text("GAME OVER", 90, 200);
        return;
    }

    if (frameCount % 60 === 0) {
        spawnAsteroid();
    }

    movePlayer();
    drawPlayer();
    updateBullets();
    updateAsteroids();
    displayScore();
}

function movePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        player.x -= player.speed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        player.x += player.speed;
    }

    if (player.x < player.width / 2) {
        player.x = player.width / 2;
    }

    if (player.x > width - player.width / 2) {
        player.x = width - player.width / 2;
    }
}

function drawPlayer() {
    fill(0, 255, 0);
    rectMode(CENTER);

    rect(player.x, player.y, player.width, player.height);
}

function keyPressed() {
    if (key === " ") {
        bullets.push({
            x: player.x,
            y: player.y,
            size: 8,
            speed: 8
        });
    }
}

function updateBullets() {
    fill(255, 255, 0);

    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;

        circle(bullets[i].x, bullets[i].y, bullets[i].size);

        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

function spawnAsteroid() {
    asteroids.push({
        x: random(width),
        y: 0,
        size: 30,
        speed: random(2, 5)
    });
}

function updateAsteroids() {
    fill(150);

    for (let i = asteroids.length - 1; i >= 0; i--) {

        asteroids[i].y += asteroids[i].speed;

        circle(
            asteroids[i].x,
            asteroids[i].y,
            asteroids[i].size
        );

        checkBulletCollision(i);

        if (i < asteroids.length) {
            checkPlayerCollision(i);
        }

        if (i < asteroids.length && asteroids[i].y > height) {
            asteroids.splice(i, 1);
        }
    }
}

function checkBulletCollision(index) {
    for (let i = bullets.length - 1; i >= 0; i--) {

        let d = dist(
            bullets[i].x,
            bullets[i].y,
            asteroids[index].x,
            asteroids[index].y
        );

        if (d < asteroids[index].size / 2) {
            bullets.splice(i, 1);
            asteroids.splice(index, 1);
            score++;
            return;
        }
    }
}

function checkPlayerCollision(index) {
    let d = dist(
        player.x,
        player.y,
        asteroids[index].x,
        asteroids[index].y
    );

    if (d < 30) {
        gameOver = true;
    }
}

function displayScore() {
    fill(255);
    textSize(20);
    text("Score: " + score, 10, 25);
}

function resetGame() {
    player.x = 200;

    bullets = [];
    asteroids = [];

    score = 0;
    gameOver = false;
}