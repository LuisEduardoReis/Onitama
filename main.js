
var board;
var hoverCard = null;
var hoverCell = null;
var selectedCard = null;
var selectedOriginCell = null;


function setup() {
	createCanvas(windowWidth,windowHeight);	
	
	board = new Board().init();
	board.active = RED;
	board.validmoves = board.getValidMoves();
	
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


function mouseMoved() {
	// Card Hover
	if (between2d(mouseX,mouseY, 25+70,0, 25+70+50,60)) {
		hoverCard = {player:BLUE, card: 0}
	} else 
	if (between2d(mouseX,mouseY, 25+70,0, 25+70+60+50,60)) {
		hoverCard = {player:BLUE, card: 1}
	} else
	if (between2d(mouseX,mouseY, 25+70,75+50*5+10, 25+70+50,75+50*5+10+60)) {
		hoverCard = {player:RED, card: 0}
	} else 
	if (between2d(mouseX,mouseY, 25+70,75+50*5+10, 25+70+60+50,75+50*5+10+60)) {
		hoverCard = {player:RED, card: 1}
	} else
		hoverCard = null;

	// Cell Hover
	if (between2d(mouseX,mouseY, 25,75,  25+50*5-1, 75+50*5-1)) {
		hoverCell = pos(Math.floor((mouseX - 25)/50), Math.floor((mouseY - 75)/50));
	} else 
		hoverCell = null;
}

function mouseClicked() {
	// Select Card
	if (hoverCard && board.active == hoverCard.player) {
		selectedCard = hoverCard;
		selectedOriginCell = null;
	// Select Origin Cell
	} else if (hoverCell && selectedCard 
		&& selectedCard.player == board.active 
		&& COLOR[board.get(hoverCell.x,hoverCell.y)] == board.active) {
		selectedOriginCell = hoverCell;	
	} else if (hoverCell && selectedCard && selectedOriginCell
		&& COLOR[board.get(hoverCell.x,hoverCell.y)] != board.active) {
		var move = new Move(selectedCard.card, selectedOriginCell, hoverCell);
		board.makeMove(move);	
		selectedCard = null;
		selectedOriginCell = null;
	} else {
		selectedCard = null;
		selectedOriginCell = null;
	}
	
}

function draw() {
	background(255);
	translate(25,0);
	
	textAlign(CENTER,TOP); noStroke(); strokeWeight(0); fill(0);
	if (hoverCell!=null)text(JSON.stringify(hoverCell),250,10);
	
	// Blue Side
	push();
		translate(70,0);
		drawCard(board.cards_B[0]);
		translate(60,0);
		drawCard(board.cards_B[1]);		
	pop();
	if (selectedCard && selectedCard.player == BLUE) {
		stroke(0,128,0); strokeWeight(4); noFill();
		rect(70+60*selectedCard.card,0,50,70);
	}
	if (hoverCard && hoverCard.player == BLUE) {
		stroke(0,255,0); strokeWeight(4); noFill();
		rect(70+60*hoverCard.card,0,50,70);
	}
	
	translate(0,75);
	
	push();
		// Valid Moves
		if (hoverCell) {
			for(var i = 0; i < board.validmoves.length; i++) {
				var move = board.validmoves[i];
				if (selectedCard && move.card != selectedCard.card) continue;
				if (!(move.from.x == hoverCell.x && move.from.y == hoverCell.y))continue;
				
				stroke(0,255,0); strokeWeight(3); fill(0);
				line((move.from.x+0.5)*50,(move.from.y+0.5)*50,(move.to.x+0.5)*50,(move.to.y+0.5)*50);
			}
		}
	
		// Board
		board.draw();
		
		
		// Hover & Selected Cell
		if (selectedOriginCell) {
			stroke(0,128,0); strokeWeight(4); noFill();
			rect(50*selectedOriginCell.x,50*selectedOriginCell.y,50,50);
		}
		if (hoverCell) {
			stroke(0,255,0); strokeWeight(4); noFill();
			rect(50*hoverCell.x,50*hoverCell.y,50,50);
		}
		
		translate(50*5+10,50*1);
		stroke(0); strokeWeight(1); fill(0);
		textAlign(CENTER,TOP); text("Turn",25,0);
		fill(board.active == RED ? "#FF0000" : "#0000FF");
		ellipse(25,35,30,30);
		
		translate(0,50*1.5);
		drawCard(board.board_card);
	pop();
	
	translate(0,50*5+10);
	
	// Red Side
	push();
		translate(70,0);
		drawCard(board.cards_R[0]);
		translate(60,0);
		drawCard(board.cards_R[1]);
	pop();
	if (selectedCard && selectedCard.player == RED) {
		stroke(0,128,0); strokeWeight(4); noFill();
		rect(70+60*selectedCard.card,0,50,70);
	}
	if (hoverCard && hoverCard.player == RED) {
		stroke(0,255,0); strokeWeight(4); noFill();
		rect(70+60*hoverCard.card,0,50,70);
	}
	
	/*
	for(var i = 0; i < 4; i++)
	for(var j = 0; j < 4; j++) {
		push();
			translate(60*j,75*i);
			drawCard(CARDS[j+4*i]);
		pop();		
	}*/
}