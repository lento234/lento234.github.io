//Browning motion
// Description: Particle system browning motion
// Date: 22.09.2022

// Global variables
let p = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
  let n_particles = int(windowHeight * windowHeight * 0.001);
  for (let i = 0; i < n_particles; i++) {
    let x = random(windowWidth);
    let y = random(windowHeight);
    let dx = random(-10, 10);
    let dy = random(-10, 10);
    let size = random(1, 5);
    p.push(new Point(x, y, dx, dy, size));
  }
}

function draw() {
  clear();
  for (let i=0; i < p.length; i++) {
    p[i].move();
    p[i].draw();
  }
}
