let level = 100;
let speed = 5;

let gameOver = false;
let cloud;
let ground;
let stone, stone2;
let c1, c2;
let runner;
let high_score = 0;
let button = [];
let label = ["Start", "Pause", "Resume", "Restart"];
let start = false;
let pause = false;
let restart = false;
// Variables to handle screen size
let screenWidth, screenHeight;
// Scale factors for responsive sizing
let scaleX, scaleY;

function preload() {
  r_img = loadImage('pics/runner1.png');
  s_img = loadImage('pics/rock.png');
  c_img = loadImage('pics/cloud.png');
  g_img = loadImage('pics/ground-1.jpg');
  h_img = loadImage('pics/heart2.png');
  coin_img = loadImage('pics/coin.png');
}

function setup() {
  // Create a full-screen canvas
  createCanvas(windowWidth, windowHeight);

  // Set screen dimensions
  screenWidth = windowWidth;
  screenHeight = windowHeight;

  // Calculate scale factors compared to original 800x500 design
  scaleX = screenWidth / 800;
  scaleY = screenHeight / 500;

  // Initialize game objects with scaled positions
  initializeGame();
}

function initializeGame() {
  ground = new Ground();
  stone = new Stone(screenWidth + 20 * scaleX);
  stone2 = new Stone(screenWidth + screenWidth / 2 + 20 * scaleX);
  c1 = new Coin(screenWidth + 20 * scaleX);
  c2 = new Coin(screenWidth + screenWidth / 2 + 20 * scaleX);
  runner = new Runner();
  cloud = new Cloud();

  // Reset buttons with new positions
  button = [];
  let index = 0;
  for (let i = 0; i < screenWidth; i += screenWidth / 4) {
    button.push(new Button(i + 40 * scaleX, screenHeight - 70 * scaleY, 100 * scaleX, 60 * scaleY, label[index]));
    index += 1;
  }
}

function draw() {
  background(158, 245, 252);
  ground.show();

  if (start) {
    play();
  } else if (gameOver) {
    textAlign(CENTER);
    textSize(30 * Math.min(scaleX, scaleY));
    fill(255, 0, 0);
    text("Game Over", screenWidth / 2, screenHeight / 2);
    textSize(20 * Math.min(scaleX, scaleY));
    text("click to restart", screenWidth / 2, screenHeight / 2 + 25 * scaleY);
  }

  for (let i = 0; i < button.length; i++)
    button[i].show();
}

function play() {
  background(158, 245, 252);

  // Show health hearts
  for (let i = 0; i < runner.health; i++) {
    image(h_img, i * 50 * scaleX + 10 * scaleX, 10 * scaleY, 30 * scaleX, 30 * scaleY);
  }

  ground.show();
  ground.move();

  stone.show();
  stone.move();

  stone2.show();
  stone2.move();

  c1.show();
  c1.move();

  c2.show();
  c2.move();

  cloud.show();
  cloud.move();

  runner.show();
  runner.move();

  runner.hit(stone);
  runner.hit(stone2);

  runner.hitcoin(c1);
  runner.hitcoin(c2);

  if (runner.health == 0) {
    gameOver = true;
    start = false;
  }

  textSize(25 * Math.min(scaleX, scaleY));
  textAlign(CENTER);
  fill(0);
  text("SCORE : " + runner.score, screenWidth / 2, 50 * scaleY);
  text("HIGH_SCORE : " + high_score, screenWidth * 0.75, 50 * scaleY);

  if (runner.score > high_score) {
    high_score = runner.score;
  }
}

function keyPressed() {
  if (key == ' ')
    runner.jump();
}

function restartGame() {
  initializeGame();
  start = true;
  gameOver = false;
}

function mousePressed() {
  if (gameOver) {
    restartGame();
  }
  for (let i = 0; i < button.length; i++) {
    if (button[i].isClicked()) {
      if (button[i].text == "Start" && !start)
        start = true;
      else if (button[i].text == "Pause") {
        noLoop();
      }
      else if (button[i].text == "Resume")
        loop();
      else if (button[i].text == "Restart")
        restartGame();
    }
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screenWidth = windowWidth;
  screenHeight = windowHeight;
  scaleX = screenWidth / 800;
  scaleY = screenHeight / 500;
  initializeGame();
}

// Classes with scaled dimensions

class Ground {
  constructor() {
    this.x = 0;
    this.y = screenHeight - 120 * scaleY;
    this.width = screenWidth;
    this.height = 120 * scaleY;
  }

  show() {
    // Repeat the ground image to fill the width
    let imgWidth = g_img.width * scaleY; // Scale proportionally based on height
    let repetitions = Math.ceil(screenWidth / imgWidth) + 1;

    for (let i = 0; i < repetitions; i++) {
      image(g_img, this.x + i * imgWidth, this.y, imgWidth, this.height);
    }
  }

  move() {
    this.x -= speed * scaleX;
    if (this.x <= -g_img.width * scaleY) {
      this.x = 0;
    }
  }
}

class Stone {
  constructor(x) {
    this.x = x;
    this.y = screenHeight - 120 * scaleY - 50 * scaleY;
    this.width = 50 * scaleX;
    this.height = 50 * scaleY;
    this.passed = false;
  }

  show() {
    image(s_img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x -= speed * scaleX;
    if (this.x < -this.width) {
      this.x = screenWidth + random(100, 300) * scaleX;
      this.passed = false;
    }
  }
}

class Coin {
  constructor(x) {
    this.x = x;
    this.y = screenHeight - 120 * scaleY - 100 * scaleY - random(0, 100) * scaleY;
    this.width = 30 * scaleX;
    this.height = 30 * scaleY;
    this.collected = false;
  }

  show() {
    if (!this.collected) {
      image(coin_img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    this.x -= speed * scaleX;
    if (this.x < -this.width || this.collected) {
      this.x = screenWidth + random(100, 300) * scaleX;
      this.y = screenHeight - 120 * scaleY - 100 * scaleY - random(0, 100) * scaleY;
      this.collected = false;
    }
  }
}

class Runner {
  constructor() {
    this.x = 50 * scaleX;
    this.y = screenHeight - 120 * scaleY - 70 * scaleY;
    this.width = 50 * scaleX;
    this.height = 70 * scaleY;
    this.vy = 0;
    this.gravity = 0.6 * scaleY;
    this.health = 3;
    this.score = 0;
    this.isJumping = false;
  }

  show() {
    image(r_img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;

    // Check if landed on ground
    if (this.y > screenHeight - 120 * scaleY - this.height) {
      this.y = screenHeight - 120 * scaleY - this.height;
      this.vy = 0;
      this.isJumping = false;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.vy = -15 * scaleY;
      this.isJumping = true;
    }
  }

  hit(stone) {
    // Check for collision with stone
    if (this.x + this.width * 0.7 > stone.x &&
        this.x < stone.x + stone.width * 0.7 &&
        this.y + this.height * 0.7 > stone.y &&
        this.y < stone.y + stone.height * 0.7) {
      if (!stone.passed) {
        this.health--;
        stone.passed = true;
      }
    }
    // Increase score when passing a stone
    else if (this.x > stone.x + stone.width && !stone.passed) {
      this.score++;
      stone.passed = true;
      // Increase speed every 10 points
      if (this.score % 10 == 0) {
        speed += 0.5 * Math.min(scaleX, scaleY);
      }
    }
  }

  hitcoin(coin) {
    // Check for collision with coin
    if (this.x + this.width * 0.7 > coin.x &&
        this.x < coin.x + coin.width * 0.7 &&
        this.y + this.height * 0.7 > coin.y &&
        this.y < coin.y + coin.height * 0.7) {
      if (!coin.collected) {
        this.score += 5;
        coin.collected = true;
      }
    }
  }
}

class Cloud {
  constructor() {
    this.x = screenWidth;
    this.y = random(50, 150) * scaleY;
    this.width = 100 * scaleX;
    this.height = 60 * scaleY;
    this.speed = 1.5 * scaleX;
  }

  show() {
    image(c_img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x -= this.speed;
    if (this.x < -this.width) {
      this.x = screenWidth;
      this.y = random(50, 150) * scaleY;
    }
  }
}

class Button {
  constructor(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(200);
    rect(this.x, this.y, this.width, this.height, 10);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16 * Math.min(scaleX, scaleY));
    text(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }

  isClicked() {
    return mouseX > this.x && mouseX < this.x + this.width &&
        mouseY > this.y && mouseY < this.y + this.height;
  }
}