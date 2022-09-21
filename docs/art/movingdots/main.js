// Moving dot example

let max_distance = 0;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("frame");
    noStroke();
    max_distance = dist(0, 0, width, height);
}

function draw() {
  background(0);

  for(let i = 0; i <= width; i += 20) {
    for(let j = 0; j <= height; j += 20) {
      let size = dist(mouseX, mouseY, i, j);
      size = size/max_distance * 100;
      ellipse(i, j, size, size);
    }
  }
}
