class Point {
    constructor(x, y, u, v, size) {
      this.x = x;
      this.y = y;
      this.u = u;
      this.v = v;
      this.size = size;
    }
  
    move() {
      if (this.x > width)
        this.x = 0;
        if (this.y > height)
        this.y = 0;
      this.x += this.u;
      this.y += this.v;
    }

    draw() {
      stroke(255);
      strokeWeight(this.size);
      point(this.x, this.y);
    }
  }  