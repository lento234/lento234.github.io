// Rain

// Global variables
let p = [];

function setup() {
  const height = windowHeight;
  const width = windowWidth;
  let canvas = createCanvas(width, height);
  canvas.parent("canvas");
  let n_particles = min(int(width * height * 0.001), 1000);
  for (let i = 0; i < n_particles; i++) {
    let x = random(width);
    let y = random(height);
    let u = random(1)+0.1;
    let v = random(1)+3;
    let size = random(2)+1;
    p.push(new Point(x, y, u, v, size));
  }
}

function draw() {
  clear();
  for (let i=0; i < p.length; i++) {
    p[i].move();
    p[i].draw();
  }
}