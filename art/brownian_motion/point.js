class Point {
  constructor(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx
    this.dy = dy
    this.size = size
  }

  move() {
    if (this.x < 0 || this.x > width)
      this.dx *= -1;
      if (this.y < 0 || this.y > height)
      this.dy *= -1;
    this.x += this.dx/this.size;
    this.y += this.dy/this.size;
  }

  draw() {
    stroke(255);
    strokeWeight(this.size);
    point(this.x, this.y);
  }
}
