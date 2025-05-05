let level = 100;
let speed = 5;

let gameOver = false;
let cloud;
let ground;
let stone,stone2;
let c1,c2;
let runner;
let high_score = 0;
let button = [];
let label = ["Start","Pause","Resume","Restart"];
let start = false;
let pause = false;
let restart = false;
function preload(){
  r_img = loadImage('pics/runner1.png');
  s_img  = loadImage('pics/rock.png');
  c_img  = loadImage('pics/cloud.png');
  g_img = loadImage('pics/ground-1.jpg ');
  h_img = loadImage('pics/heart2.png');
  coin_img = loadImage('pics/coin.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = new Ground();
  stone = new Stone(width+20);
  stone2 = new Stone(width+width/2+20);
  c1 = new Coin(width+20);
  c2 = new Coin(width+width/2+20);
  runner = new Runner();
  cloud = new Cloud();
  let index = 0;
  for(let i=0;i<width;i+=width/4)
  {
    button.push(new Button(i+40,height-70,100,60,label[index]));
    index+=1;
  }
}

function draw() {


  background(158, 245, 252);
  ground.show();

  if(start){
    play();
  }else if(gameOver){
    text("Game Over",width/2,height/2);
    text("click to restart",width/2-10,height/2+25);
  }
  for(let i=0;i<button.length;i++)
      button[i].show();
}

function play(){

  background(158, 245, 252);

  for(let i=0;i<runner.health;i++){
    image(h_img,i*50+10,10,30,30);
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

  if(runner.health==0){
    gameOver = true;
    start = false;
  }
  textSize(25);
  text("SCORE : "+runner.score,400,50);
  text("HIGH_SCORE : "+high_score,550,50);
  if(runner.score>high_score){
      high_score = runner.score;
  }
}

function keyPressed(){
  if(key==' ')
    runner.jump();
}
function restartGame()
{
  ground = new Ground();
  stone = new Stone(width+20);
  stone2 = new Stone(width+width/2+20);
  runner = new Runner();
  cloud = new Cloud();
  start = true;
  gameOver = false;
}

function mousePressed(){
  if(gameOver){
  restartGame();
}
  for(let i=0;i<button.length;i++)
  {
    if(button[i].isClicked())
    {
      if(button[i].text == "Start" && !start)
        start = true;
      else if(button[i].text == "Pause"){
        noLoop();
      }
      else if(button[i].text == "Resume")
       loop();
      else if(button[i].text == "Restart")
        restartGame();
    }
  }
}
