// Game of life
// 18.09.2022
// Based on Game of Life by Joan Soler-Adillon.

// Global variables
const width = 600;
const height = 600;
const cellSize = 10 ; // Size of cells
const probabilityOfAliveAtStart = 15; // How likely for a cell to be alive at start (in percentage)

// Derived
const ncols = width / cellSize;
const nrows = height / cellSize;

// Variables for timer
let interval = 50;
let lastRecordedTime = 0;
let fps = 0;

// Colors for active/inactive cells
let alive, dead;

// Array of cells
let cells = []

let pause = false; // Pause

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent("frame");

  // Instantiate arrays
  cells = new Array(ncols);

  for (var i = 0; i < cells.length; i++)
    cells[i] = new Array(nrows);

  alive = color(0);
  dead = color(255);

  // This stroke will draw the background grid
  init();

}

function init() {
  // Initialization of cells
  for (let x=0; x<ncols; x++) {
    for (let y=0; y<nrows; y++) {
      let state = random(100);
      if (state > probabilityOfAliveAtStart) {
        state = 0;
      }
      else {
        state = 1;
      }
      cells[x][y] = state; // Save state of each cell
    }
  }
}

function draw() {

  // if (frameCount === 1) {
  //     const capture = P5Capture.getInstance();
  //     capture.start({
  //       format: "gif",
  //       quality: 1,
  //       duration: 100,
  //       disableUi: true,
  //     });
  // }

  //Draw grid
  for (let x=0; x<ncols; x++) {
    for (let y=0; y<nrows; y++) {
      if (cells[x][y]==1)
        fill(alive); // If alive
      else
        fill(dead); // If dead
      stroke(200);
      noSmooth();
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
  // Iterate if timer ticks
  if ((millis()-lastRecordedTime>interval) && !pause) {
      iteration();
      lastRecordedTime = millis();
      fps = frameRate();
  }

  // FPS
  textSize(10);
  fill(0);
  stroke(255);
  text("FPS: " + int(fps), 11, height - 11);

}

function iteration() { // When the clock ticks


  // Save cells to buffer (so we opeate with one array keeping the other intact)
  let cellsBuffer = new Array(ncols);
  for (let x=0; x<ncols; x++) {
    cellsBuffer[x] = new Array(nrows);
    for (let y=0; y<nrows; y++) {
      cellsBuffer[x][y] = cells[x][y];
    }
  }

  // Visit each cell:
  for (var x=0; x<ncols; x++) {
    for (var y=0; y<nrows; y++) {
      // And visit all the neighbours of each cell
      var neighbours = 0; // We'll count the neighbours
      for (var xx=x-1; xx<=x+1;xx++) {
        for (var yy=y-1; yy<=y+1;yy++) {
          if (((xx>=0)&&(xx<ncols))&&((yy>=0)&&(yy<nrows))) { // Make sure you are not out of bounds
            if (!((xx==x)&&(yy==y))) { // Make sure to to check against self
              if (cellsBuffer[xx][yy]==1){
                neighbours++; // Check alive neighbours and count them
              }
            } // End of if
          } // End of if
        } // End of yy loop
      } //End of xx loop
      // We've checked the neigbours: apply rules!
      if (cellsBuffer[x][y]==1) { // The cell is alive: kill it if necessary
        if (neighbours < 2 || neighbours > 3) {
          cells[x][y] = 0; // Die unless it has 2 or 3 neighbours
        }
      }
      else { // The cell is dead: make it live if necessary
        if (neighbours == 3 ) {
          cells[x][y] = 1; // Only if it has 3 neighbours
        }
      }
    }
  }
}

function keyPressed() {
  console.log(key);
  if (key == 'r' || key == 'R')
    init() // Restart: reinitialization of cells
  else if (key == ' ')
    pause = !pause;
  else if (key == 'ArrowUp')
    interval = max(interval-20, 0);
  else if (key == 'ArrowDown')
    interval += 20;
}
