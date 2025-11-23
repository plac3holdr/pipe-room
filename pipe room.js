// pipe room
// this is for p5.js

function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background(220);
  
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
  
}

// this is a test of commits and branches and pull requests and gribf
