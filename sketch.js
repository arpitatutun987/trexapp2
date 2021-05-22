var trex, trexrun, ground, groundi;
var ground2,cloud,cloudi,cactus;
var c1,c2,c3,c4,c5,c6,cactusg,cloudg;
var play = 0,end = 1,gs = play,tc;
var go,goi,re,rei,score = 0,hs = 0;
var jump,die,cp;


function preload(){
  
  trexrun = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundi = loadImage("ground2.png");
  cloudi = loadImage("cloud.png");
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  tc = loadAnimation("trex_collided.png");
  goi = loadImage("gameOver.png");
  rei = loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  cp = loadSound("checkPoint.mp3");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-50,10,10);
  trex.addAnimation("abc",trexrun);
  trex.scale=0.5;
  trex.addAnimation("pqr",tc);
  
  ground = createSprite(width/2,height-40,width,5);
  ground.addImage(groundi);
  
  
  ground2 = createSprite(width/2,height-37,width,5);
  ground2.visible = false;
  
  cactusg = new Group();
  cloudg = new Group();
  
  trex.debug = false;
  trex.setCollider("rectangle",0,0,90,trex.height);
  
  go = createSprite(width/2,height/2,10,10);
  go.addImage(goi);
  go.scale = 0.7;
  
  re = createSprite(width/2,height/2,10,10);
  re.addImage(rei);
  re.scale = 0.4;
  
  
}

function draw(){
  background("black");
  
  textSize(15);
  text("Score :"+score,width-100,15);
  text("HS :"+hs,width-200,15);
  
  if(hs<score){
    hs = score;
  }
  
  //console.log(trex.y);
  if(gs === play){
    
    score = score+Math.round(getFrameRate()/61);
    
    if(score>0 && score%100 === 0){
      cp.play();
    }
    
    ground.velocityX = -(3+(score/300));
    
    go.visible = false;
    re.visible = false;
    
    trex.changeAnimation("abc",trexrun);
    
    if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if((touches.length>0 || keyDown("space")) && trex.y>height - 80){
    trex.velocityY = -13;
    jump.play();
    touches = [];
  }
    
  trex.velocityY = trex.velocityY+0.5;
  
    trex.collide(ground2);
  
  
 spawnCloud(); 
spawnCactus();
    
    if(trex.isTouching(cactusg)){
      die.play();
      gs = end;
    }
  }
  
  if(gs === end){
    ground.velocityX = 0;
    trex.velocityY = 0;
    cactusg.setVelocityXEach(0);
   cloudg.setVelocityXEach(0);
    cactusg.setLifetimeEach(-1);
    cloudg.setLifetimeEach(-1);
    trex.changeAnimation("pqr",tc);
    go.visible = true;
    re.visible = true;
    
    if(mousePressedOver(re) || touches.length>0){
      restart();
      touches = [];
    }
  }
   
drawSprites();
 
}

function restart(){
  gs = play;
  cloudg.destroyEach();
  cactusg.destroyEach();
  score = 0;
  
}

function spawnCloud(){
  
  if(frameCount % 100 === 0 ){
    
 cloud = createSprite(width,random(10,50),10,10);
 cloud.velocityX=-3;
cloud.addImage(cloudi);
  cloud.scale=0.5;
    
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloud.lifetime = width/2;
  cloudg.add(cloud);

  } 
}

function spawnCactus(){
  
  if(frameCount % 130 === 0){
  cactus = createSprite(width,height-55,10,10);
  cactus.velocityX=-(3+(score/300));
  cactus.lifetime = width/2;
    cactus.scale = 0.5;
    cactusg.add(cactus);
    
  var a = Math.round(random(1,6));
    switch(a){
      case 1 : cactus.addImage(c1);
      break ;
       case 2 : cactus.addImage(c2);
      break ;
      case 3 : cactus.addImage(c3); 
      break ;
      case 4 : cactus.addImage(c4);
      break ;
      case 5 : cactus.addImage(c5);
      break ;
      case 6 : cactus.addImage(c6);
      break ;
    }
}
}