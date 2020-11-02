var endPoint = {},
    startPoint = {},
    obstacle,
    creatures = [],
    creaturesNb = 100,
    allFinish = true,
    matingpool = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  startPoint.x = width / 2;
  endPoint.x = width / 2;
  startPoint.y = 800;
  endPoint.y = 100;
  for(let i = 0; i < creaturesNb; i++) creatures.push(new Creature());
  obstacle = new Obstacle(width / 2, height / 2, floor(width / 2.5), floor(height / 10));
}

function draw() {
  background(0);
  obstacle.show();
  fill(0, 255, 0, 127);
  ellipseMode(CENTER);
  ellipse(endPoint.x, endPoint.y, 50);
  allFinish = true;
  for(let i = 0; i < creaturesNb; i++) {
    creatures[i].show();
    if(!creatures[i].crashed && !creatures[i].completed) {
      allFinish = false;
    }
  }
  if(allFinish) {
    evaluate();
    selection();
  }
}



function selection() {
  var newCreatures = [];
  for (let i = 0; i < creaturesNb; i++) {
    // Picks random dna
    var parentA = random(matingpool).dna;
    var parentB = random(matingpool).dna;
    // Creates child by using crossover function
    var child = parentA.crossover(parentB);
    child.mutation();
    newCreatures[i] = new Creature(child);
  }
  creatures = newCreatures;
}


function evaluate() {
  var maxfit = 0;
  // Iterate through all creatures and calcultes their fitness
  for (let i = 0; i < creaturesNb; i++) {
    // Calculates fitness
    creatures[i].calcFitness();
    // If current fitness is greater than max, then make max equal to current
    if (creatures[i].fitness > maxfit) {
      maxfit = creatures[i].fitness;
    }
  }
  // Normalises fitnesses
  for (let i = 0; i < creaturesNb; i++) {
    creatures[i].fitness /= maxfit;
  }

  matingpool = [];
  // Take creatures fitness make in to scale of 1 to 100
  // A creature with high fitness will highly likely will be in the mating pool
  for (let i = 0; i < creaturesNb; i++) {
    var n = creatures[i].fitness * 100;
    for (var j = 0; j < n; j++) {
      matingpool.push(creatures[i]);
    }
  }
}