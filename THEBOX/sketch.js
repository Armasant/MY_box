
let polySynth;
let mass = [];
let positionX = [];
let positionY = [];
let velocityX = [];
let velocityY = [];
let r;
let g;
let b;
let a;
/////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	//fill(164, 255, 55, 192);
  polySynth = new p5.PolySynth();
polySynth.setADSR(0.1, 0.4, .7, 1);
reverb = new p5.Reverb();

reverb.process(polySynth, 60, 13);

delay = new p5.Delay();
}
 
/////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
	background(2);
r = random(100, 255); 
 g = random(100, 255); 
  b = random(100, 255); 
   a = random(200,255);
  
  let dryWet = constrain(map(mouseX, 0, width, 0, 0.5), 0, 0.5);
  // 1 = all reverb, 0 = no reverb
 reverb.drywet(dryWet);
	
for (var particleA = 0; particleA < mass.length; particleA++) {
		let accelerationX = 0, accelerationY = 0;
		
		for (var particleB = 0; particleB < mass.length; particleB++) {
			if (particleA != particleB) {
				let distanceX = positionX[particleB] - positionX[particleA];
				let distanceY = positionY[particleB] - positionY[particleA];

				let distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				let force = (distance - 320) * mass[particleB] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		velocityX[particleA] = velocityX[particleA] * 0.79 + accelerationX * mass[particleA];
		velocityY[particleA] = velocityY[particleA] * 0.59 + accelerationY * mass[particleA];
	}
	
	for (let particle = 0; particle < mass.length; particle++) {
		positionX[particle] += velocityX[particle];
		positionY[particle] += velocityY[particle];
		
		ellipse(positionX[particle], positionY[particle], mass[particle] * 500, mass[particle] * 500);
	}
  
 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function addNewParticle() {
	mass.push(random(0.03, 0.02));
	positionX.push(mouseX);
	positionY.push(mouseY);
	velocityX.push(0.5);
	velocityY.push(0.5);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseClicked() {
	addNewParticle();
  playSynth();
  fill(r, g, b, a);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseDragged() {
	addNewParticle();
  playSynth();
  fill(r, g, b, a);
}


function playSynth() {
  userStartAudio();

  let note = random(600) + 70;
  // note velocity (volume, from 0 to 1)
  let velocity = 0.2;
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = 0.2;
//print (trigger);
//print= (time);
  polySynth.play(note, velocity, time,dur);
}