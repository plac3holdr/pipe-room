// pipe room
// this is for p5.js


let pipeWaterY = 2;
let ms;



function setup() {
  createCanvas(400, 400,);
}


function draw() {
  //background(220);
  
  // animates water flowing from first pipe vv
  
  if(pipeWaterY < 400) {
    pipeWaterY +=6.7;
  }
  
  strokeWeight(0)
  fill('blue');
  circle(210, pipeWaterY, 16);
  
  // FIRST PIPE
   
  stroke(0);
  strokeWeight(2);
  fill('gray');
  rect(200, -1, 20, 50);
  
  
  // WATER
  let waterWidth = width;
  let waterHeight = 0;
  let waterGrowthRate; // pixels per frame
  let numOfPipes = 1; //placeholder
  
  waterGrowthRate = numOfPipes / 4;
  
  // starts at zero and increases
  waterHeight = waterGrowthRate * frameCount
  
  fill("blue")
  
  // draws water starting at the bottom of the screen
  rect(0, height - waterHeight, waterWidth, waterHeight);
 
  
  
  // DRAW PIPE
  let pipeX;
  ms = millis();
  
  pipeX = random(0, width);
 
  stroke('blue')
  fill('white')
  text(`${round(ms, 1)}`, 15, 350, 350)
 
  
  // after 5secs pass, a pipe will appear
  
  if(ms > 5000 & ms < 5000 + deltaTime){
    
    stroke(0);
    strokeWeight(2)
    fill('gray');
    rect(pipeX, -1, 20, 50);
    
 // animates water flowing from these^^ pipes
    
    
    
  }
}
