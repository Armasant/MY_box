let polySy;
// Position Variables
//let posiniz = random(0, windowWidth)
let x = 100;
let y = 80;
//let trigger = false ;

// Speed - Velocity
let vx = 100;
let vy = 50;

// Acceleration
let ax = 100;
let ay = 50;

let vMultiplier = .9;
let bMultiplier = .9
;


let r;
let g;
let b;
let a;


    
    
function setup() {
//let x = float(random(0.0, 0.12));
 //y = 80;
 let cnv = createCanvas(windowWidth,windowHeight);
  
//fill('rgb(0,255,10)');
 polySy = new p5.PolySynth();
polySy.setADSR(0.07, 0.4, .7, 1);

  delay = new p5.Delay();
 
 reverb = new p5.Reverb();

reverb.process(polySy, 60, 13);
  
  distortion = new p5.Distortion( 0.90,'2x');

  distortion.process(polySy,mouseY, '4x');
 

  
}

function draw() {
r = random(100, 255); 
 g = random(100, 255); 
  b = random(100, 255); 
   a = random(200,255);

  let dryWet = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
  // 1 = all reverb, 0 = no reverb
 reverb.drywet(dryWet);
background(5);
 ballMove();
  noStroke();
   ellipse(x, y, 30, 30);

  let time = float(random(0.0, 0.12)); 
 let Fr = map(mouseY, 0, width, 0, 5000);
//let time = map(mouseX, 0, width, 0, 1.0);
  delay.process(polySy, 0.23 , .5, Fr); 
  
  
  if (trigger == true) {
    playSynth();
  } 
}
       
function ballMove() {
  ax = accelerationX; 
  ay = accelerationY;

  vx = vx + ay;
  vy = vy + ax;
  y = y + vy * vMultiplier;
  x = x + vx * vMultiplier;
  
  trigger = false;
  
  // Bounce when touch the edge of the canvas
  if (x < 20 ) {
    x = 20;
    vx = -vx * bMultiplier;
  
  fill(r, g, b, a);
    trigger = true;
  } else {

          if (y < 20) {
          y = 20;
          vy = -vy * bMultiplier;
            
  fill(r, g, b, a);
          trigger = true;
        } else{ 

        if (x > width - 20) {
          x = width - 20;
          vx = -vx * bMultiplier;
           trigger = true; 
          
  fill(r, g, b, a);
        } else {
         if (y > height - 20) {
          y = height - 20;
          vy = -vy * bMultiplier;
          
  fill(r, g, b, a);
         trigger = true; }
  }
 }
}   
}
function playSynth() {
  userStartAudio();

 
  let note = random(2000) + 70;
  // note velocity (volume, from 0 to 1)
 let velocity = 0.2;
  // time from now (in seconds)
  let time = 0;
   let length = map(mouseY,0,300,0,5);
  // note duration (in seconds)
  let dur = 1/32;
print (trigger);
print (time);
  polySy.play(note, velocity, time,dur);
  
 
  
}
