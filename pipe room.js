// pipe room
// this is for p5.js



let ms;



function setup() {
  createCanvas(400, 400,);
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