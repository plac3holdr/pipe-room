// pipe room
// this is for p5.js


//GLOBAL VARS

let waterHeight = 0;

let pipeWaterY = 2;

let lastPipeTime = 0;

// miliseconds
let ms;

// equals one bc one pipe at start
let numOfPipes = 1;



function setup(){
  createCanvas(400, 400);
}

let pipeX = 0;

function draw() {
  console.log(`${numOfPipes} pipes`);
  
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
  waterHeight = calculateWaterHeight();
  hotWaterRises(waterHeight);
  
  //GAME OVER SCREEN
  let roomFull = waterHeight > height;
  gameOver(roomFull);//game over if room is full

  
  // draws random pipe

  ms = millis();
 
  stroke('blue')
  fill('white')
  
  // displays passing ms (remove later)
  text(`${round(ms, 1)}`, 15, 350, 350)
  
  //also funny i made infinite loop with numOfPipes 
  
// Create a new pipe every 5 seconds
if (ms - lastPipeTime > 5000) {
  randomPipe();
  lastPipeTime = ms; // Update the timestamp
}
  
  // if(ms > 5000 & ms < 5000 + deltaTime){
    
  //randomPipe();    

}


//when a pipe appears, this grows

function randomPipe() {
  pipeX = random(0, width);
  
  stroke(0);
  strokeWeight(2)
  fill('gray');
  rect(pipeX, -1, 20, 50);
  
  numOfPipes += 1;
}



function gameOver(isRoomFull) {
  let condition = isRoomFull;
  
  if (condition === true) {
    textSize(20);
    fill('yellow');
    text('Game Over', 100, 300);
  }
}

//FIX should take in numOfPipes
function calculateWaterHeight() {
  let waterGrowthRate; // pixels per frame
  
  waterGrowthRate = numOfPipes;
  
  // FIX later
  let heightOfWater = waterGrowthRate * frameCount;
  
  return heightOfWater; 
}


// draw water depending on parameter heightWater
function hotWaterRises(h) {
  let waterWidth = width;
  let heightWater = h;
  // draws water starting at the bottom of the screen
  stroke("blue")
  fill("blue")
  rect(0, height - heightWater, waterWidth, heightWater);
}
