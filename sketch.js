var Back, tower, door, dI, rail, rI, ghost, gI, block, ss
var gameState="play"
var score=0

function preload(){
  tower=loadImage("tower.png")
  dI=loadImage("door.png")
  rI=loadImage("climber.png")
  gI=loadImage("ghost-standing.png")
  ss=loadSound("spooky.wav")
  
}

function setup(){
  createCanvas(600,600)
  Back=createSprite(300,300,10,10)
  Back.addImage("Background",tower)
  Back.velocityY=3
  ghost=createSprite(300,300,10,10)
  ghost.addImage("ghost",gI)
  ghost.scale=0.3
  //ss.loop()
  
  doorgroup=new Group();
  railgroup=new Group();
  blockgroup=new Group();
  
}
  function draw(){
    if (gameState==="play"){
      score=score+Math.round(getFrameRate()/10)
    if (Back.y>400){
      Back.y=300
    }
    if (keyDown("Space")){
      ghost.velocityY=-5
    }
     if (keyDown("right_arrow")){
      ghost.x=ghost.x+4
    }
    if (keyDown("left_arrow")){
      ghost.x=ghost.x-4
    }
    ghost.velocityY=ghost.velocityY+0.5
    if (railgroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if (blockgroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end"
    }
    spawndoor()
    drawSprites()
      textSize(20)
      text("Score  "+score,300,100)
    }
    if (gameState==="end"){
      background(0)
      fill("yellow")
      textSize(28)
      text("Game Over",200,200)
    }
  }
function spawndoor(){
  if (frameCount%100===0){
  var door=createSprite(Math.round(random(100,500)),0,10,10)
  var rail=createSprite(door.x,50,10,10)
  var block=createSprite(door.x,60,50,3)
  door.velocityY=3
    rail.velocityY=3
    block.velocityY=3
    door.addImage("door",dI)
    rail.addImage("rail",rI)
    door.lifetime=600
    rail.lifetime=600
    block.lifetime=600
    doorgroup.add(door)
    railgroup.add(rail)
    blockgroup.add(block)
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    block.visible=false
  }
}










