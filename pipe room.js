// pipe room
// this is for p5.js


// GLOBAL VARS

let gameRunning = false;

let waterHeight = 0;

let pipeWaterY = 2;

// miliseconds after new game started
// not equal to millis()
let ms = 0; 

let startTime = 0;



function setup() {
  createCanvas(400, 400,);
  strokeWeight(0);
  textSize(22);
}



function draw() {
  // game starts on a tutorial screen :)
  // click the start button and start the game
  
  if (gameRunning === true) {
  //background(220);
  
  // animates water flowing from first pipe vv
  
  if(pipeWaterY < 400) {
    pipeWaterY +=6.7;
  }
  
  strokeWeight(0);
  fill('blue');
  circle(210, pipeWaterY, 16);
  
  // FIRST PIPE
   
  stroke(0);
  strokeWeight(2);
  fill('gray');
  rect(200, -1, 20, 50);
  strokeWeight(0);
  
  // WATER
  hotWaterRises();
  
  // GAME OVER SCREEN
  let roomFull = waterHeight > height;
  gameOver(roomFull);//game over if room is full
  
  // DRAW RANDOM PIPE
  let pipeX;
  ms = millis() - startTime;
  
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
  }// end of randomPipe maker
    
  } else {
    // runs when gameRunning is false
    //      when starting the game
    newGameButton();
  }

} // end of draw



function gameOver(isRoomFull) {
  if (isRoomFull === true) {
    fill('yellow');
    text('Game Over', 0, 300);
    newGameButton();
  }
}



function newGameButton() {
  // if click then reset all the variables and grib
  fill('limegreen');
  square(100, 50, 200);// changing messes with the if statement with clicking and stuff
  fill('black');
  text('Start New Game?', 110, 150); // offcenter cringe
  
  // shows tutorial at the start of the game
  tutorial = !gameRunning;
  if (tutorial) {
    fill('white');
    textSize(25);
      text(
`Welcome to Pipe Room!
Click the pipes that are filling the 
room with water so you don't drown!`,
        0, 300);
    textSize(22);
  }
  
  //on click, clear the canvas and restart the game
  if (mouseX > 100 && mouseX < 300 && mouseY > 50 && mouseY < 250 && mouseIsPressed === true) {
    gameRunning = true;
    background(0);
    frameCount = 0; // for calcWaterHeight
    waterHeight = 0;
    startTime = millis();
    pipeWaterY = 0;
  }
}



function calculateWaterHeight() {
  let waterGrowthRate; // pixels per frame
  let numOfPipes = 1; //placeholder
  
  waterGrowthRate = numOfPipes;
  
  // FIX later should take numOfPipes into account
  let heightOfWater = waterGrowthRate * frameCount;
  
  return heightOfWater; 
}



// draw water
function hotWaterRises() {
  //starts water rising when the water reaches floor
  let waterStartTime = 900; // miliseconds
  
  if (ms > waterStartTime) {
  let waterWidth = width;
  waterHeight = calculateWaterHeight();
  
  // starts at the bottom of the screen
  stroke("blue")
  fill("blue")
  rect(0, height - waterHeight, waterWidth, waterHeight);
  } else {
    frameCount = 0; // right now waterHeight is calculated using framecount, this if statement will either draw the water or make sure the water starts at zero
  }
}
