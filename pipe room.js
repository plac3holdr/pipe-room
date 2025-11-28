// this is for p5.js

// Set difficulty here by editing the numbers (technically these are milliseconds)
//EZ MODE: 20, 1400
//I like 40 and 1200
// HARD 50 1000
// Impossible 100, 800
let difficulty = 40; // bigger makes the end come faster
let gameLengthener = 1200; // bigger makes the start eazier



// Alter size of pipes
let pipeGrower = 0;


let pipeWidth = 20 + pipeGrower; // measured in pixels
let pipeHeight = 50 + pipeGrower;

// room drain
let drainRate = 1 / 2;





// PIPE OBJECT LIT MAKER

let pipeList = [];

function exclusionZone() {
  let x = floor(random(0,2));// fun fact, the numbers are floats so they wont always be exactly one or two, so we make them exact numbers with floor()
  if (x === 0|| x === -1) {
    return random(0, 200-pipeWidth);// from left to firstPipe
  } else if (x === 1 || x === 2) {
    return random(220, width-pipeWidth);// from firstPipe to right
  }
}

function newPipe() {
  pipe = {
    x: exclusionZone(),
    boolIsClicked: function() {
      return mouseX > this.x && mouseX < this.x + pipeWidth && mouseY < pipeHeight
    },
    disappear: function() {
      fill('black');
      rect(this.x, -1, pipeWidth, pipeHeight);
    },
    draw: function() {
      strokeWeight(2);
      fill('gray');
      rect(this.x, -1, pipeWidth, pipeHeight);
    },
    dripY: 0
  };

  return pipe;
}

// GLOBAL VARS
let noTimer = false;

let timeGap;

let pipesClicked = 0;

let timeSurvived = 0;

let firstPipeIsOnScreen = true;

let gameRunning = false;

let waterHeight = 0;

let pipeWaterY = 2;

//determines starting water height, and is altered in calcWaterHeight()
let previousHeightOfWater = 0;


// miliseconds after new game started
// not equal to millis()
let ms = 0; 

let startTime = 0;
let lastPipeTime = 0;

// equals one bc one pipe at start
let numOfPipes = 1;

let noPipes = false;



function setup() {
  createCanvas(400, 400,);
  noStroke();
  textSize(22);
}



function draw() {
  // game starts on a tutorial screen :)
  // click the start button and start the game
 background(0)

  if (gameRunning === true) {
  ms = millis() - startTime;
  console.log(`${numOfPipes} pipes`);
  

  //  water from ALL PIPES 
  // pipeWaterY is the variable for the first pipe, i gave each pipe an attribute called pipe.dripY so when it's drawing pipe water, i can just steal the pipe.x  
  drawPipeWater();
    
  // uhhh RANDOM PIPES  
    
  drawPipes();//before randomPipe so the logic will work, idk why but it works

  // FIRST PIPE
firstPipe();
    
  // WATER
  hotWaterRises();
    
  // timer on bottom in seconds
    if (noTimer === true) {
      //nothing
    } else {
      fill('yellow')
      text(`${round(ms, 0)}`, 5, 400) // for debug
      fill('blue')
      timeSurvived = round(ms / 1000, 2);
    }
  
  // GAME OVER SCREEN
  gameOver();
  
  // ADD RANDOM PIPE TO ARRAY
  // also funny i made infinite loop with numOfPipes 
  // this adds a new pipe every timeGap (if tG = 1000, then it waits a thousand millisecs) to the array
  
  if (ms - lastPipeTime > timeGap) {
    randomPipe();
    lastPipeTime = ms; // Update the timestamp
    timeGap -= difficulty;// makes pipes appear faster by decrementing the gap between pipe placements in miliseconds!
  }
  
  if (numOfPipes < 0) {//avoids negatives
    numOfPipes = 0;
  }
    
  } else {
    // runs when gameRunning is false
    //      when starting the game
    newGameButton();
  }

} // end of draw


function mousePressed() {
  for (let p of pipeList) {
    if(p.boolIsClicked() === true) {
      p.disappear();
      
      let i = pipeList.indexOf(p);
      pipeList.splice(i, 1);// remove pipefrom array so it isn't drawn
      console.log(i)
      pipesClicked++;
      numOfPipes -= 1;
      break;//stop loop after finding the pipe that was clicked
    }
  }
  
  // checkes if the first pipe was clicked bc mousePressed = true wont execute more than once a second
  if (mouseX > 200 && mouseX < 200 + pipeWidth && mouseY > 0 && mouseY < pipeHeight && noPipes !== true) {// there was a bug where you cloud click that spot on the restart screen and get points
  fill('black');
  rect(200, 0, pipeWidth, height - waterHeight)
  firstPipeIsOnScreen = false;
  pipesClicked++;
  numOfPipes = numOfPipes - 1;
  }
}


function drawPipeWater() {
  if(pipeWaterY < height) {
    // not even a timing, just 67
    pipeWaterY +=6.7;
    fill('blue');
    circle(210, pipeWaterY, 16);
  }

  // these are for the other pipes
  for (let p of pipeList) {
    if (p.dripY < height) {
      p.dripY += 16.7; // increments faster bc ill click the pipes before it reaches the water and i figured it would get cluttered with all the random water drops
      fill('blue');
      circle(p.x, p.dripY, 16);
    }
  }
}


function firstPipe() {
  if (firstPipeIsOnScreen) {
  fill('gray');
  strokeWeight(0);
  rect(200, -1, pipeWidth, pipeHeight); 
  }
   noStroke();
}


function randomPipe() {
  strokeWeight(0);
  if (noPipes === true) {
   //dont do anything 
  } else {
  
  let newestPipe = newPipe();
  pipeList.push(newestPipe);//adds a new random pipe to the public array, accessible by the next function
    
  //when a pipe appears, this grows
  numOfPipes += 1;
  }
  noStroke();
}


function drawPipes() {
  for (let p of pipeList) {
      p.draw();
  }
}


function gameOver() {
  let isRoomFull = waterHeight > height;
  if (isRoomFull === true) {
    fill('yellow');
    text('Game Over', 0, 300);
    text(`${timeSurvived} Seconds Survived`, 0, 325);
    text(`${pipesClicked} Pipes Clicked`, 0, 350);
    noPipes = true;
    noTimer = true;
    pipeList = [];
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
    background(0);// clears the screen
    frameCount = 0; // for calcWaterHeight

    timeSurvived = 0;
    pipesClicked = 0;
    waterHeight = 0;
    pipeWaterY = 0;
    numOfPipes = 1;
    noTimer = false;
    lastPipeTime = 0;
    timeGap = gameLengthener;// the initial wait time for the second pipe, also lengthens the game when you mess with the second variable
    firstPipeIsOnScreen = true;
    noPipes = false;// it was drawing pipes on the start new game screen soooooooo
    previousHeightOfWater = 0;
    ms = 0;
    startTime = millis();
    
  }
}



function calculateWaterHeight() {  
  let waterGrowthRate = numOfPipes / 5;
  
  let heightOfWater = waterGrowthRate + previousHeightOfWater - drainRate;
  
  previousHeightOfWater = heightOfWater;
  
  return heightOfWater; 
}



// draw water
function hotWaterRises() {
  //starts water rising when the water reaches floor
  let waterStartTime = 1000; // miliseconds
  
  if (ms > waterStartTime) {
  let waterWidth = width;
  waterHeight = calculateWaterHeight();
  
  // starts at the bottom of the screen
  fill("blue")
  rect(0, height - waterHeight, waterWidth, waterHeight);
  }
}
