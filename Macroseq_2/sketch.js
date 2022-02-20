let sound;
let numLines = 10;
let lines = [];
let r;
let g;
let b;
let a;
var slider
function preload() {
  sound = loadSound("glitch1.mp3");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  slider = createSlider(0., 1 , 0.5) 
    for(i = 0; i < numLines; i++) {
    let y = map(i, 0, numLines -1 , 8, height - 8);
    let length = map(i, 0, numLines -1 , 120, width - 8);
    lines.push(new Line(length, y));
   
     
  }
  
}

function draw() {
  background(0);
  r = random(100, 255); 
 g = random(100, 255); 
  b = random(100, 255); 
   a = random(200,255);
   
   let speed = map(mouseX, 0.1,  mouseY, 0, 2);
  speed = constrain(speed,0.01, 4 );
  sound.rate(speed);

 
  for(let line of lines) {
    line.draw();
    
    sound.setVolume(slider.value());
  }

 
  
}

class Line {
  constructor(length, y) {
    this.length = length;
    this.x = 100;
    this.y = y;
    this.dotPosition = 0;
  }
  
  draw(step) {
    stroke(8);
    strokeWeight(2);
    line(this.x, this.y, this.x + this.length, this.y);

    circle(this.x + this.dotPosition, this.y, random(20));
    this.dotPosition ++;
    if(this.dotPosition > this.length) {
      this.dotPosition = 0;
      sound.play();
       fill(r,g,b,a,) }
    

    }
   
 }