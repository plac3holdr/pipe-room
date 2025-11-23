// pipe room
// this is for p5.js
let ms;

function setup() {
  createCanvas(400, 400,);
}

function draw() {
  //background(220);
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
// this is a test of commits and branches and pull requests and grib

