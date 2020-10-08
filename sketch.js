 var trex, ground, ground2, gameState, score, cloudGroup, cactusGroup, end, restart, die, jump, checkpoint;

var trexRunning, groundImage, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6, cloudImage, restartImage, endImage;


function preload(){
trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
cactus1 = loadImage("obstacle1.png");
cactus2 = loadImage("obstacle2.png");
cactus3 = loadImage("obstacle3.png");
cactus4 = loadImage("obstacle4.png");
cactus5 = loadImage("obstacle5.png");
cactus6 = loadImage("obstacle6.png");
restartImage = loadImage("restart.png");
endImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  checkpoint= loadSound('checkPoint.mp3');
  
  die=loadSound('die.mp3');
  
  jump=loadSound('jump.mp3');
  
trex = createSprite(50, 170, 20, 50);
trex.addAnimation("trexRunning", trexRunning);

//create ground for trex
ground = createSprite(200, 180, 400, 20);
ground.addImage(groundImage);

ground2 = createSprite(200, 180, 400, 10);
ground2.visible = false;
  
//to change the behaiviour of the game
gameState = "Play";

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

 score = 0;

cloudGroup = new Group();

cactusGroup = new Group();

trex.setCollider("circle", 0, 0, 20);

//trex.debug = true;

 end = createSprite(300, 100, 1, 0);
 end.addImage(endImage);
 end.scale=0.5;
 end.visible = false;
   
 restart = createSprite(300, 150 ,0, 0);
 restart.addImage(restartImage);
 restart.scale=0.5;
 restart.visible=false;

}

function draw() {
  //set background to white
  background("white");
  
  //console.log(trex.y);
 
  //console.log("hello" + randomNumber(1,10) +"world");
 
  textSize(18);
 
 if(gameState == "Play"){
   
   score = score + Math.round (getFrameRate()/60);
   
  ground.velocityX = -5;
   
   var quo = Math.round(score/600);
   
   if(quo%2==0){
   background("white");
   fill("black");
   text("score :" + score, 450, 50);
   }
   else{
  background("black");
  fill("white");
  text("score :" + score, 450, 50);
   }
   
    //jump when the space key is pressed
   if(keyDown("space") && trex.y>=165 ){
    trex.velocityY = -12 ;
    jump.play();
  }
  
  if(score%100==0 && score!=0){
    checkpoint.play();
  }
  
  
    //if ground finishes then ground has to restart 
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawn_clouds();
  
  spawn_cactus();
 
 if(cactusGroup.isTouching(trex)){
   die.play();
   gameState = "End";
 }
 
 if(score%500==0){
   cactusGroup.setVelocityXEach(-7);
 }
 
}

 if(gameState == "End"){
   end.visible=true;
   fill("black");
   text("score :" + score, 450, 50);
   restart.visible=true;
   ground.velocityX = 0;
   trex.pause();
   cactusGroup.setVelocityXEach(0);
   cloudGroup.setVelocityXEach(0);
   cactusGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
   }
   
   if(mousePressedOver(restart)){
     gameState= "Play";
     end.visible=false;
     restart.visible=false;
     cactusGroup.destroyEach();
     cloudGroup.destroyEach();
     score=0;
     trex.play();
   }

  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  //stop trex from falling down
  trex.collide(ground2);
  drawSprites();
}
function spawn_clouds(){
  if(frameCount%60 == 0){
  var cloud = createSprite(600, Math.round(random(80, 120)), 40, 10);
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;
  cloud.velocityX = -2;  
  trex.depth = 3;
  cloud.depth = 2;
  cloud.lifetime = 200;
  cloudGroup.add(cloud);
 }
}

function spawn_cactus(){
  if(frameCount%70 == 0){
  var cactus = createSprite( 600, 165, 10, 10);
  var rand = Math.round(random(1, 6));
  switch(rand)
  {
    case 1 : cactus.addImage(cactus1);  
    break;
    case 2 : cactus.addImage(cactus2);
    break;
    case 3 : cactus.addImage(cactus3);
    break;
    case 4 : cactus.addImage(cactus4);
    break;
    case 5 : cactus.addImage(cactus5);
    break;
    case 6 : cactus.addImage(cactus6);
    break;
    default :
    break;
    
  }
  cactus.scale = 0.6;
  cactus.velocityX=-(7+score/100);
  cactus.lifetime = 300;
  cactusGroup.add(cactus);
  }
}