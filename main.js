
function setup() {
	createCanvas(windowWidth,windowHeight)
	
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
	background(255,0,255)
	ellipse(mouseX,mouseY,30,30)
}