// Game of life
// 18.09.2022
// Based on Game of Life by Joan Soler-Adillon.

// Global variables
let width, height, xmid, ymid, multiplier;

const size = 3;
const PI = Math.PI;
const GA = (3 - Math.sqrt(5)) * PI;

let N = 100;
let factor = 1;

function setup() {
  width = Math.min(windowWidth, windowHeight);
  height = width;
  xmid = windowWidth/2;
  ymid = windowHeight/2;
  multiplier = width / 2 - 10;

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
}

function draw() {
  clear();
  N += 5*Math.sin(frameCount/100, 0.2);

  for (var i=0; i < N; i++) {
    let z = 1/N-1 + i/N;
    let theta = GA * i - N/1000;
    let radius = Math.sqrt(1 - z * z);
    let x = radius * Math.cos(theta) * multiplier;
    let y = radius * Math.sin(theta) * multiplier;
    stroke(255);
    strokeWeight(3);
    point(xmid+x, ymid+y);
  }
}
