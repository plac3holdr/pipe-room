// pipe room
// this is for p5.js


//GLOBAL VARS

let waterHeight = 0;

//miliseconds
let ms;



function setup() {
  createCanvas(400, 400,);
}



function draw() {
  //background(220);

  // WATER
  waterHeight = calculateWaterHeight();
  hotWaterRises(waterHeight);
  
  //GAME OVER SCREEN
  let roomFull = waterHeight > height;
  gameOver(roomFull);//game over if room is full

  
  // DRAW PIPE
  let pipeX;
  ms = millis();
  
  pipeX = random(0, width);
  
  stroke("gray")
  strokeWeight(2.5)
  // rect(pipeX, 0, 20, 50)
  
  text(`${round(ms, 1)}`, 15, 350, 350)
  
  // after 5secs pass, a pipe will appear
  if(ms > 5000 & ms < 5000 + deltaTime){
    rect(pipeX, 0, 20, 50)
  }

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
  let numOfPipes = 1; //placeholder
  
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
