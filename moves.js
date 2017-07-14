

var Move = function(card,from,to) {
	this.card = card;
	this.from = from;
	this.to = to;
}


Board.prototype.makeMove = function(move) {
	console.log(move);
	var c = this.active;
	var mp = move.from ? this.get(move.from.x,move.from.y) : null;
	
	if (mp == null) return;
	// Move piece
	this.set(move.to.x,move.to.y,mp);
	this.set(move.from.x,move.from.y,E);
	
	// Swap card
	var card = this.board_card;
	var card_list;
	if (this.active == BLUE) {
		this.board_card = this.cards_B[move.card];
		this.cards_B[move.card] = card;
	} else {
		this.board_card = this.cards_R[move.card];
		this.cards_R[move.card] = card;
	}
	
	// Pass turn
	this.active = !this.active;
	if (!this.active) this.fullmove++;
	this.halfmove++;
	
	return this;
}