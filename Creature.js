class Creature {
  constructor(dna) {
    this.pos = createVector(startPoint.x, startPoint.y);
    this.vel = createVector(0,0);
    this.acc = createVector();
    this.crashed = false;
    this.completed = false;
    this.fitness = 0;
    if(dna) {
      this.dna = dna;
    } else {
      this.dna = new Dna();
    }
    this.genes = [...this.dna.genes];
  }
  
  show() {
    this.update();
    let theta = this.vel.heading() + radians(90);
    push();
    stroke(0);
    fill(255, 0, 0, 255);
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    // rectMode(CENTER);
    // rect(0,0,10,50);
    beginShape();
    vertex(0, -10 * 2);
    vertex(-10, 10 * 2);
    vertex(10, 10 * 2);
    endShape(CLOSE);
    pop();
  }

  applyForce = function(force) {
    this.acc.add(force);
  }

  update = function() {
    this.crashed = this.isCrashed();
    this.completed = this.isCompleted();
    if(!this.crashed && !this.completed) {
      let t = this.genes.shift();
      if(t !== undefined) this.applyForce(t);
      else this.crashed = true;
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }

  isCrashed() {
    if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      return true;
    } else {
      var bnd = obstacle.getBoundaries();
      if((this.pos.x >= bnd.left && this.pos.x <= bnd.right) && (this.pos.y >= bnd.top && this.pos.y <= bnd.bottom)) {
        return true;
      }
    }
    return false;
  }

  isCompleted() {
    return((this.pos.x >= endPoint.x - 25 && this.pos.x <= endPoint.x + 25) && (this.pos.y >= endPoint.y - 25 && this.pos.y <= endPoint.y + 25));
  }

  calcFitness() {
    // Takes distance to target
    var d = dist(this.pos.x, this.pos.y, endPoint.x, endPoint.y);

    // Maps range of fitness
    this.fitness = map(d, 0, width, width, 0);
    // If rocket gets to target increase fitness of rocket
    if (this.completed) {
      this.fitness *= 10;
    }
    // If rocket does not get to target decrease fitness
    if (this.crashed) {
      this.fitness /= 10;
    }
  }
}