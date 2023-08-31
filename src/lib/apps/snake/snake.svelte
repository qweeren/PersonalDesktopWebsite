<script>
  import { onMount } from 'svelte';

  let canvas;
  let context;
  let deathsfx;
  let eatsfx;
  let gameLoop;

  let score;
  let directionX;
  let directionY;
  let snakeSize;
  let snake;
  let apple;

  onMount(() => {
    canvas = document.getElementById("gameCanvas");
    // @ts-ignore
    context = canvas.getContext("2d");
  });

  function start() {
    score = 0;
    clearInterval(gameLoop);
    directionX = 1;
    directionY = 0;
    snakeSize = 10;

    snake = [
      { x: 40, y: 30 },
      { x: 39, y: 30 },
      { x: 38, y: 30 },
      { x: 37, y: 30 },
    ];

    apple = { x: 20, y: 20 };
    gameLoop = setInterval(update, 75);
  }

  function MoveSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }
    snake[0].x += directionX;
    snake[0].y += directionY;
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp" && directionY !== 1) {
      directionX = 0;
      directionY = -1;
    } else if (event.key === "ArrowLeft" && directionX !== 1) {
      directionX = -1;
      directionY = 0;
    } else if (event.key === "ArrowDown" && directionY !== -1) {
      directionX = 0;
      directionY = 1;
    } else if (event.key === "ArrowRight" && directionX !== -1) {
      directionX = 1;
      directionY = 0;
    }
  }

  function updateScoreText() {
    document.getElementById("score").innerHTML = "Score: " + score;
  }

  function update() {
    MoveSnake();
    checkCollision();
    draw();
  }

  function growSnake() {
    score++;
    updateScoreText();
    snake.push([snake[snake.length - 1].x, snake[snake.length - 1].y]);
  }

  function checkCollision() {
    // Check collision with walls
    if (
      snake[0].x < 0 ||
      snake[0].x >= canvas.width / snakeSize ||
      snake[0].y < 0 ||
      snake[0].y >= canvas.height / snakeSize
    ) {
      deathsfx.play();
      clearInterval(gameLoop);
      return;
    }

    // Check collision with self
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        deathsfx.play();
        clearInterval(gameLoop);
        return;
      }
    }

    // Check collision with apple
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      growSnake();
      eatsfx.play();
      randomlyPositionApple();
    }
  }

  function randomlyPositionApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / snakeSize));
    apple.y = Math.floor(Math.random() * (canvas.height / snakeSize));
  }

  function clear() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    clear();

    // Draw apple
    context.fillStyle = "#f00";
    context.fillRect(
      apple.x * snakeSize,
      apple.y * snakeSize,
      snakeSize,
      snakeSize
    );

    // Draw snake
    context.fillStyle = "#0f0";
    for (let i = 0; i < snake.length; i++) {
      context.beginPath();
      context.rect(
        snake[i].x * snakeSize,
        snake[i].y * snakeSize,
        snakeSize,
        snakeSize
      );
      context.closePath();
      context.fill();
    }
  }

  function startButton() {
    start();
    document.getElementById("start").remove();
  }
</script>

<div class="snake">
  <canvas id="gameCanvas" width="800" height="600"></canvas>
  <div id="score">Score: 0</div>
  <button id="refreshButton" on:click={start}>Restart</button>
  <button id="start" on:click={startButton}>Start</button>
</div>
<svelte:body on:keydown|preventDefault={handleKeyDown} />

<audio src="https://cdn.discordapp.com/attachments/801140209664000100/1146635162059288679/death.wav" bind:this={deathsfx}></audio>
<audio src="https://cdn.discordapp.com/attachments/801140209664000100/1146635182397477026/eat.wav" bind:this={eatsfx}></audio>

<style>
  *{
    margin: 0;
  }
  .snake {
    background-color: #000;
    font-family: "Press Start 2P", Arial, sans-serif;
    text-align: center;
    margin: 0;
  }

  #gameCanvas {
    padding: 0;
    margin: 10px auto;
    border: 1px solid #0f0;
  }

  #score {
    color: #0f0;
    font-size: 18px;
    margin: 10px 0px;
  }

  button {
    font-family: "Press Start 2P", Arial, sans-serif;
    padding: 10px;
    font-size: 18px;
    background-color: transparent;
    color: #0f0;
    border: 1px solid #0f0;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0f0;
    color: #000;
  }

  #start {
    position: absolute;
    left: 50%;
    top: 300px;
    transform: translate(-50%, -50%);
  }
</style>