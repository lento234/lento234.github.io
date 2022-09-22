// Game of life
// 18.09.2022
// Based on Game of Life by Joan Soler-Adillon.

// Global variables
const width = 600;
const height = width;

const xmid = width / 2;
const ymid = height / 2;

const size = 3;
const PI = Math.PI;
const GA = (3 - Math.sqrt(5)) * PI;

let N = 100;
let factor = 1;
let multiplier = width / 2 - 10;

function setup() {
  let canvas = createCanvas(width, height);
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
