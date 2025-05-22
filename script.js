const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let marioY = 200;
let velocity = 0;
const gravity = 0.6;
const jumpPower = -10;
const pipes = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", () => {
  if (!gameOver) velocity = jumpPower;
});

function drawMario() {
  ctx.fillStyle = "red";
  ctx.fillRect(100, marioY, 30, 30);
}

function drawPipes() {
  pipes.forEach(pipe => {
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, 50, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 50, canvas.height - pipe.bottom);
  });
}

function updatePipes() {
  if (pipes.length === 0 || pipes[pipes.length - 1].x < 300) {
    const topHeight = Math.random() * 200 + 50;
    const gap = 140;
    pipes.push({
      x: canvas.width,
      top: topHeight,
      bottom: topHeight + gap,
    });
  }

  pipes.forEach(pipe => pipe.x -= 2);

  pipes.forEach(pipe => {
    if (
      100 < pipe.x + 50 &&
      100 + 30 > pipe.x &&
      (marioY < pipe.top || marioY + 30 > pipe.bottom)
    ) {
      gameOver = true;
    }
    if (pipe.x === 100) score++;
  });
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMario();
  drawPipes();
  updatePipes();

  marioY += velocity;
  velocity += gravity;

  if (marioY + 30 > canvas.height) {
    gameOver = true;
  }

  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Skor: " + score, 10, 30);

  if (gameOver) {
    ctx.fillText("Oyun Bitti!", canvas.width / 2 - 60, canvas.height / 2);
  } else {
    requestAnimationFrame(update);
  }
}

update();
