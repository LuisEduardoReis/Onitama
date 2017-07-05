

var Board = function () {
	this.cells = [];
	this.active = true;
	
	this.cards = null;
	this.cards_R = [];
	this.cards_B = [];
	this.board_card = null;
	
	this.validmoves = null;
	this.op_validmoves = null;

	this.halfmove = 0;
	this.fullmove = 1;
}

Board.prototype.init = function() {
	for(var i = 0; i < BOARD_SIZE*BOARD_SIZE; i++)
		this.cells[i] = E;
	
	this.set(0,0,B_P);
	this.set(1,0,B_P);
	this.set(2,0,B_K);
	this.set(3,0,B_P);
	this.set(4,0,B_P);
	
	this.set(0,4,R_P);
	this.set(1,4,R_P);
	this.set(2,4,R_K);
	this.set(3,4,R_P);
	this.set(4,4,R_P);
	
	this.active = true;
	this.halfmove = 0;
	this.fullmove = 1;
	
	this.cards = getRandom(CARDS,5);
	this.cards_R.push(this.cards[0]);
	this.cards_R.push(this.cards[1]);
	this.cards_B.push(this.cards[2]);
	this.cards_B.push(this.cards[3]);
	this.board_card = this.cards[4];
	
	return this;
}

Board.prototype.set = function(x,y,p) { if(x >= 0 && x < BOARD_SIZE && y>=0 && y < BOARD_SIZE) this.cells[y*BOARD_SIZE + x] = p;}
Board.prototype.get = function(x,y) { if(x >= 0 && x < BOARD_SIZE && y>=0 && y < BOARD_SIZE) return this.cells[y*BOARD_SIZE + x]; else return null;}


Board.prototype.draw = function() {
	push();
	
	push();
		translate(70,0);
		drawCard(this.cards_B[0]);
		translate(60,0);
		drawCard(this.cards_B[1]);
	pop();
	
	translate(0,75);

	push();
		var w = 50;
		stroke(0);
		
		// Lines
		for(var i = 0; i <= BOARD_SIZE; i++) {
			line(i*w,0,i*w,BOARD_SIZE*w);
			line(0,i*w,BOARD_SIZE*w,i*w);
		}
		// Pieces
		for(var i = 0; i < BOARD_SIZE; i++)
		for(var j = 0; j < BOARD_SIZE; j++) {
			switch(this.get(j,i)) {
				case B_P: fill(0,0,255); ellipse((j+0.5)*w,(i+0.5)*w,w/2,w/2); break;
				case B_K: fill(0,0,255); ellipse((j+0.5)*w,(i+0.5)*w,w/1.5,w/1.5); break;
				case R_P: fill(255,0,0); ellipse((j+0.5)*w,(i+0.5)*w,w/2,w/2); break;
				case R_K: fill(255,0,0); ellipse((j+0.5)*w,(i+0.5)*w,w/1.5,w/1.5); break;
			}
		}
		
		translate(w*5+10,w*2);
		drawCard(this.board_card);
	pop();
	translate(0,w*5+10);
	
	push();
		translate(70,0);
		drawCard(this.cards_R[0]);
		translate(60,0);
		drawCard(this.cards_R[1]);
	pop();
	
	pop();
}
