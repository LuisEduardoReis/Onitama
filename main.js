
var board;

function setup() {
	createCanvas(windowWidth,windowHeight);	
	
	board = new Board().init();
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);
	translate(25,0);
	board.draw();
	
	/*
	for(var i = 0; i < 4; i++)
	for(var j = 0; j < 4; j++) {
		push();
			translate(60*j,75*i);
			drawCard(CARDS[j+4*i]);
		pop();		
	}*/
}