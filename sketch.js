// declaring matter.js stuff
const Engine = Matter.Engine;
const Constraint = Matter.Constraint;
const Bodies = Matter.Bodies;
const World = Matter.World;

//declaring game objects
var PLAY =0
var END =1
var TUT =2
var WON =3
var gameState=TUT
var bg;
var playerImg, player;

var ground;
var Redge;
var Ledge;
var Uedge;

var spikes;
var tri, triImg;

var candy;
var candySpr;

var spider1;
var spider2;
var spider3;

var st1;
var st2;
var st3;
var st4;
var st5;
var st6;
var st7;
var st8;

var st1R;
var st1L;

var gm;

var s1;
var s2;
var s3;
var si;

var won;

var starCount = 0;


function preload() {
  //loading images
  bg = loadImage("background.jpeg");

  playerImg = loadAnimation("om nom.png", "mouth.png", "hungry.png");

  triImg = loadImage("TSpikes.png");

  spr=loadImage("spider.png");

gm=loadImage("gameOver.png");

si=loadImage("star.png")

hi=loadImage("heart.png")
won=loadImage("win.jpg")
}
function setup() {
  //creating canvas
  canvas = createCanvas(displayWidth - 30, displayHeight - 150);

  //matter.js setup
  myEngine = Engine.create();
  myWorld = myEngine.world;

  //creating ground and edges
  ground = new Ground(width / 2, height - 45, canvas.width, 20);
  Ledge = new Ground(-5, height / 2, 20, canvas.height);
  Redge = new Ground(1258, height / 2, 20, canvas.height);

  //creating Uedge as a spikes to give it a red color
  Uedge = new Spikes(width / 2, 0, canvas.width, 20);

  //creating the candy
  candy = new Candy(50, height - 90, 20)


  //adjusting frameRate to slow down the speed of animation and creating player
  // frameRate(4)
  player = createSprite(width - 60, height - 510, 20, 50);
  player.addAnimation("running", playerImg);
  player.scale = 0.2;


  //creating blockk stages on which the stars should stand
  st1 = new Stage1(width / 2 - 180, height - 150, canvas.width - 180, 20)
  st2 = new Stage1(width - 0, height - 150, 300, 20)

  st3 = new Stage1(width -445, height - 255, canvas.width -180, 20)
  st4 = new Stage1(width -1250, height - 255, 300, 20)

  st5 = new Stage1(width / 2 - 180, height - 360, canvas.width - 180, 20)
  st6 = new Stage1(width - 0, height - 360, 300, 20)

  st7 = new Stage1(width -445, height - 465, canvas.width -180, 20)
  st8 = new Stage1(width -1250, height - 465, 300, 20)

  spider1=createSprite(width/2,height-195,80,80);
  spider1.addImage(spr);
  spider1.scale=0.5
  spider1.velocityX=12

  spider2=createSprite(width/2,height-300,80,80);
  spider2.addImage(spr);
  spider2.scale=0.5
  spider2.velocityX=-12

  spider3=createSprite(width/2,height-405,80,80);
  spider3.addImage(spr);
  spider3.scale=0.5
  spider3.velocityX=12

 st1R=createSprite(1350,height/2,20,canvas.height)
 st1L=createSprite(-10,height/2,20,canvas.height)
  
 s1=createSprite(50,height-195,20,20)
 s1.addImage(si)
 s1.scale=0.1

 s2=createSprite(width/2,height-300,20,20)
 s2.addImage(si)
 s2.scale=0.1

 s3=createSprite(50,height-405,20,20)
 s3.addImage(si)
 s3.scale=0.1


  //matter.js engine
  Engine.run(myEngine);
}
function draw() {
  Engine.update(myEngine)
  
  console.log(gameState)
  if (gameState===PLAY) {
  //displaying invisible bodies
  ground.display();
  Ledge.display();
  Redge.display();

  //displaying visible bodies
  background(bg);
  Uedge.display();
  
  textSize(30);
  stroke(0);
  fill(0)
  strokeWeight(2);
  text("STARS : "+starCount,width/2-600,70)

  if (spider1.isTouching(st1R)) {
    spider1.velocityX=-15
  }
  if (spider1.isTouching(st1L)) {
    spider1.velocityX=15
  }


  if (spider2.isTouching(st1R)) {
    spider2.velocityX=-15
  }
  if (spider2.isTouching(st1L)) {
    spider2.velocityX=15
  }
 

  if (spider3.isTouching(st1R)) {
    spider3.velocityX=-15
  }
  if (spider3.isTouching(st1L)) {
    spider3.velocityX=15
  }

  candySpr = createSprite(candy.body.position.x, candy.body.position.y, 50, 50);
  candySpr.visible = false

  if (candySpr.isTouching(player)) {
    console.log("yumm")
    gameState=WON
  }

  if(candySpr.isTouching(spider1)||candySpr.isTouching(spider2)||candySpr.isTouching(spider3)){
   gameState=END
  }

  //displaying stages
  st1.display();
  st2.display();
  st3.display();
  st4.display();
  st5.display();
  st6.display();
  st7.display();
  st8.display();

  if (candySpr.isTouching(s1)) {
    starCount++
    s1.destroy();
  }

  if (candySpr.isTouching(s2)) {
    starCount++
    s2.destroy();
  }

  if (candySpr.isTouching(s3)) {
    starCount++
    s3.destroy();
  }
 
  //creating a loop for spikes
  for (var i = 10; i < 2000; i = i + 25) {
    tri = createSprite(i, 14, 30, 30)
    tri.addImage(triImg)
    tri.scale = 0.05
  }

  //displaying visible bodies
  drawSprites();
  candy.display();
}
if (gameState===END) {
 console.log("game ended") 
 background(gm)
 textSize(30);
 stroke(0);
 fill(0)
 strokeWeight(2);
 text("PRESS SPACE BAR TO PLAY AGAIN",width/2-280,height/2+10)
}

if (gameState===TUT) {
  background("aliceblue")
  textSize(30);
 stroke(0);
 fill(0)
 strokeWeight(2);
 text("TUTORIAL",width/2-100,100)
 text("GOAL : FEED CANDY TO OM NOM",width/2-300,180)
 text("MOVE CANDY USING ARROW KEYS",width/2-300,260)
 text("PRESS SPACE BAR TO STOP CANDY",width/2-300,340)
 text("COLLECT ALL THE STARS ",width/2-300,420)
 text("TOUCHING SPIDERS WILL END THE GAME",width/2-300,500)
 text("PRESS R TO PLAY",width/2-600,260)

}
if (gameState===WON) {
  background(won)
  textSize(30);
 stroke(0);
 fill(0)
 strokeWeight(2);
 text("PRESS SPACE BAR TO PLAY AGAIN",width/2-250,80)
}
}

//function for giving movement to the candy
function keyPressed() {

  if (keyCode === UP_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: -400 })
  }

  if (keyCode===32&&gameState===END) {
    gameState=PLAY
    Matter.Body.setPosition(candy.body,{x:50,y:height-90})

    spider1.x=width/2;
    spider1.y=height-195;

    spider2.x=width/2;
    spider2.y=height-300;
    
    spider3.x=width/2;
    spider3.y=height-405;
  }

  if (keyCode===32&&gameState===WON) {
    gameState=PLAY
    Matter.Body.setPosition(candy.body,{x:50,y:height-90})

    spider1.x=width/2;
    spider1.y=height-195;

    spider2.x=width/2;
    spider2.y=height-300;
    
    spider3.x=width/2;
    spider3.y=height-405;
  }

  if(keyCode === 84&&gameState===PLAY){
 gameState=TUT
  }
 
  if(keyCode === 82&&gameState===TUT){
    gameState=PLAY
    Matter.Body.setPosition(candy.body,{x:50,y:height-90})

    spider1.x=width/2;
    spider1.y=height-195;

    spider2.x=width/2;
    spider2.y=height-300;
    
    spider3.x=width/2;
    spider3.y=height-405;
  }
 


  if(keyCode === 32 ){
    Matter.Body.setStatic(candy.body,true) 
  }

  if (keyCode === DOWN_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: 400 })
  }
  if (keyCode === LEFT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: -400, y: null })
  }
  if (keyCode === RIGHT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: 400, y: null })
  }
  //NOTES: to remember about kecodes
  //32=space;  13=enter;    16=shift;     18=alt;
}
function keyReleased() {
  if (keyCode === UP_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: 100 })
  }
  if(keyCode === 32 ){
    Matter.Body.setStatic(candy.body,false) 
  }
  if (keyCode === DOWN_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: -100 })
  }
  if (keyCode === LEFT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: 100, y: null })
  }
  if (keyCode === RIGHT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: -100, y: null })
  }
}
