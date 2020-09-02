var animatedmonkey, monkey, score, monky, monke, jung;
var animatedstone, stone, stoneg, iground;
var animatedbanana, banana, bananag;
var jungle, animatedjungle, gamestate;

function preload(){

animatedmonkey = loadAnimation('Monkey_01.png', 'Monkey_02.png', 'Monkey_03.png', 'Monkey_04.png', 'Monkey_05.png', 'Monkey_06.png', 'Monkey_07.png', 'Monkey_08.png','Monkey_09.png', 'Monkey_10.png')
  
  animatedstone = loadImage('stone.png');
  animatedbanana = loadImage('banana.png');
  animatedjungle = loadImage('jungle.jpg');
  
  monky = loadImage('Monkey.png');
  
  jung = loadImage('jungle-1.jpg');
  
  stoneg = new Group();
  bananag = new Group();
  
  gamestate = 'play';
}

function setup() {
  createCanvas(400, 400);


jungle = createSprite(350,200,1000,200);
jungle.addImage(animatedjungle);
jungle.scale = 0.7;
jungle.velocityX = -5;
  
monkey = createSprite(50,310,50,50);
monkey.addAnimation('a',animatedmonkey);
monkey.scale = 0.11;
  
monke = createSprite(50,310,50,50);
monke.scale = 0.11;
  
iground = createSprite(200,360,400,10);
iground.visible = false;
  
gamestate = 'play';
score = 0;

}

function draw() {
  background(220);
  
  
  
  if (gamestate == 'play'){
    monkey.visible = true;
    monke.visible = false;
    if (jungle.x < 50){
      jungle.x = 350; 
    }
    spawnstones();
    spawnbananas();
  
  if (keyDown('space')&& monkey.y > 285){
    monkey.velocityY = monkey.velocityY -5;
  }
  if (bananag.isTouching(monkey)){
    bananag.destroyEach();
    score = score +1
  }
    if (stoneg.isTouching(monkey)){
    gamestate = 'end';
  }
    if (score == 5){
       gamestate = 'win'; 
    }
    
    monkey.velocityY = monkey.velocityY + 0.71;
  }
  
  if (gamestate == 'end'){
    bananag.destroyEach();
    stoneg.destroyEach();
    monkey.velocityY = 0;
    monkey.addAnimation(monky);
    jungle.addImage(jung);
    jungle.velocityX = 0;
    score = 0;
    restart();
    monkey.visible = false;
    monke.addImage(monky);
    monke.visible = true;
  }
  if (gamestate == 'win'){
    bananag.destroyEach();
    stoneg.destroyEach();
    monkey.velocityY = 0;
    monkey.addAnimation(monky);
    jungle.addImage(jung);
    jungle.velocityX = 0;
    score = 0;
    restart();
    monkey.visible = false;
    monke.addImage(monky);
    monke.visible= true;
  }
  
  drawSprites();
  
  fill('black');
  text('Score:' + score,50,75);
  
  monke.collide(iground);
  monkey.collide(iground);
  
  if (gamestate == 'win'){
  textSize(18);
  text("You won",181,175);
  textSize(18);
  text("Press r to restart",150,200);
}
  
if ((gamestate == 'end')){
  textSize(18);
  text("Press r to restart",150,200);
  textSize(18);
  text("Game Over",180,175);
  
}
}

  function spawnstones(){
    if (World.frameCount%80 == 0){  
      stone = createSprite(350,320,50,50);
      stone.addImage(animatedstone);
      stone.scale = 0.11;
      stone.velocityX = -5;
      stone.lifetime = 80;
      stoneg.add(stone);
    }
  }

  function spawnbananas(){
    if (World.frameCount%80 == 0){
      banana = createSprite(75,75,50,50);
      banana.addImage(animatedbanana);
      banana.scale = 0.055;
      banana.velocityY = 4;
      banana.lifetime = 100;
      bananag.add(banana);
    }
  }
function restart(){
 if (keyDown('r')){ 
  gamestate = 'play';
  score = 0;
  jungle.velocityX = -4;
 }
}


