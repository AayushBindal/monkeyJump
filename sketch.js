var ground
var monkey , monkey_running
var banana ,bananaImage
var obstacle, obstacleImage
var FoodGroup
var obstacleGroup
var score = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(500,500);
    monkey = createSprite(140,370,10,10);
    monkey.addAnimation("ssa",monkey_running);
    monkey.scale = 0.1;
    ground = createSprite(250,400,500,10);
  
    foodGroup = new Group();
    obstacleGroup = new Group();
}

function draw() {
    background("orange");
    monkey.collide(ground);
    
  if(monkey.isTouching(foodGroup)){
     score = score +1;
     foodGroup.destroyEach();
     }
  
  if(monkey.isTouching(obstacleGroup)){
     score = 0;
     foodGroup.destroyEach();
     obstacleGroup.destroyEach();
  }
  
  if(keyDown("space") && monkey.y > 364){
       monkey.velocityY = -14;
    }
  
  obstacles();
  bananas();
  // add gravity
  monkey.velocityY = monkey.velocityY + 0.5;
  
    drawSprites();
  textSize(20);
  text("survival time: "+score,10,20);
}

function obstacles() {
  if(frameCount % 100 === 0){
     obstacle = createSprite(505,360,10,10)
     obstacle.addImage("marble", obstacleImage);
     obstacle.scale = 0.18;
     obstacle.velocityX = -(6 +score/40);
     obstacle.lifetime = 220;
     obstacleGroup.add(obstacle);
     obstacle.setCollider("rectangle",0,0,500,400);
     }
 }

function bananas(){
 if(frameCount % 60 === 0){
    banana = createSprite(500,200,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage("food",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(3 +score/10);
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}