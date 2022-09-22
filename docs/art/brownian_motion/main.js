//Browning motion
// Description: Particle system browning motion
// Date: 22.09.2022

// Global variables
const width = 600;
const height = 600;

const xmid = width / 2;
const ymid = height / 2;

const n_particles = 100;

let p = [];

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent("canvas");

  for (let i = 0; i < n_particles; i++) {
    let x = random(width);
    let y = random(height);
    let dx = random(-5, 5);
    let dy = random(-5, 5);
    let size = random(1, 5);
    p.push(new Point(x, y, dx, dy, size));
  }

}

function draw() {
  clear();
  for (let i=0; i < n_particles; i++) {
    p[i].move();
    p[i].draw();
  }
}
