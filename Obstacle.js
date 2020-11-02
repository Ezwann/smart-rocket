class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }


  getBoundaries() {
    return {
      left: this.x - this.w / 2,
      right: this.x + this.w / 2,
      top: this.y - this.h / 2,
      bottom: this.y + this.h / 2,
    }
  }

  show() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}