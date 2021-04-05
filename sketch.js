var bg
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var death=0;
var gameState = 0;
var hero;
var x;

function preload()
{
c1i=loadImage("images/c1.png")
c2i=loadImage("images/c2.png")
c3i=loadImage("images/c3.png")
di=loadImage("images/d.jpg")
diamondi=loadImage("images/dia.png")
lavai=loadImage("images/lava.jpg")
ni=loadImage("images/n.jpg")
wini=loadImage("images/win bg.jpg")
rti=loadImage("images/rt.png")
lti=loadImage("images/lt.png")
gb();

}

function setup() 
{
	createCanvas(1500, 700);
  lavaGroup=new Group();
	engine = Engine.create();
	world = engine.world;

  x1 = createSprite(200,300,20,20);
  x1.addImage(c1i);
  x1.visible = false;
  

  x2 = createSprite(500,300,20,20);
  x2.addImage(c2i);
  x2.visible = false;

  x3 = createSprite(800,300,20,20);
  x3.addImage(c3i);
  x3.visible = false;
  
  ld = createSprite(1400,300,20,20);
  ld.addImage(lti);
  ld.visible = false; 
  
  rd = createSprite(60,600,20,20);
  rd.addImage(rti);
  rd.visible = false;
  rd.scale=0.3
  
  dii = createSprite(1000,600,50,50);
  dii.addImage(diamondi);
  dii.visible = false;
  dii.scale=0.2



  w = createSprite(750,350,1500,700);
  w.addImage(wini);
  w.visible = false;
  
}


function draw() 
{
  background(bg);

  drawSprites();

  if(gameState === 0)
  {
    chooseCharacter();  
  }
  if(gameState === 1)
  {
    fill("black");
    textSize(20)
    text("deaths :" +death ,400,50);
    dii.visible=true;
    ld.visible = true;
    rd.visible = true;
    hero.scale=0.4
    controlling(); 
    spawnlavas();
    if(hero.isTouching(lavaGroup))
    {
      death=death+1
      gameState=2
      console.log(death)
    }
    if(hero.isTouching(dii))
    {
      gameState=3
    }
  }
  if(gameState===2){
    lavaGroup.destroyEach();
    hero.x=350
    hero.y=50
    gameState=1;
   
  }
  if(gameState===3)
  {
//background("black")
w.visible=true
 fill("black")
textSize(50);
  text("the pirate died "+ death + " times",750,200);
  ld.visible=false
    lavaGroup.destroyEach
  rd.visible=false
  dii.visible=false
  hero.visible=false

  }
 
}
function chooseCharacter()
{
  x1.visible = true;
  x2.visible = true;
  x3.visible = true;
  if(mousePressedOver(x1))
  {
    hero = x1;
    console.log("hello");
    x2.destroy();
    x3.destroy();
    gameState= 1;
  }
  else if(mousePressedOver(x2))
  {
    hero = x2;
    console.log("hello");
    x1.destroy();
    x3.destroy();
    gameState= 1;
  }
  else if(mousePressedOver(x3))
  {
    hero = x3;
    console.log("hello");
    x1.destroy();
    x2.destroy();
    gameState= 1;
  }
}
function spawnlavas()
 {
  if (frameCount % 60 === 0)
   {
    var lava= createSprite(100,500,40,10);
    lava.addImage(lavai);
    lava.scale = 0.2;
    lava.velocityX = 10;
    lava.lifetime = 1000; 
     
    var lava2= createSprite(1250,200,40,10);
    lava2.addImage(lavai);
    lava2.scale = 0.2;
    lava2.velocityX = -10;
    lava2.lifetime = 1000; 
  
    lavaGroup.add(lava);
    lavaGroup.add(lava2);
    
    lava.depth=1;
    ld.depth= lava.depth+1;

    lava2.depth=1;
    rd.depth= lava2.depth+1;

  }
}

 function controlling()
 {
  if(keyDown(UP_ARROW))
  {
    hero.y-=3;
  }
  if(keyDown(DOWN_ARROW))
  {
    hero.y +=3;
  }
  if(keyDown(LEFT_ARROW))
  {
    hero.x -=3;
  }
  if(keyDown(RIGHT_ARROW))
  {
    hero.x +=3;
    
  }
 }

 function gb(){
   var datetime = new Date();
   var hour = datetime.getHours();

   if(hour>6&&hour<19){
     x="images/d.jpg "
   }
   else
   {
    x="images/n.jpg "
   }
   bg=loadImage(x);
 }

