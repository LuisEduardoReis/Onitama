

var Move = function(card,from,to) {
	this.card = card;
	this.from = from;
	this.to = to;
}


Board.prototype.makeMove = function(move) {
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

Board.prototype.getValidMoves = function() {
	
	var r = [];
	var c = this.active;
	var forward = c ? -1 : 1,
		first_rank = c ? 4 : 0,
		last_rank = c ? 0 : 4,
		card_list = c ? this.cards_R : this.cards_B;
		
	for(var y = 0; y < BOARD_SIZE; y++){
	for(var x = 0; x < BOARD_SIZE; x++){
		var p = this.get(x,y);
		if (p == E) continue;
		var pc = COLOR[p];
		if (pc != c) continue;
		
		
		for(var card_i = 0; card_i < 2; card_i++) {
			var card = card_list[card_i];
			for(var move_i = 0; move_i < card.length; move_i++) {
				var move = card[move_i];
				var tpos = pos(x - forward*move.x, y + forward*move.y)
				var tp = this.get(tpos.x,tpos.y);
				
				if (tp != null && tp != c)
					r.push(new Move(card_i,pos(x,y),tpos));
			}
		}	
	}}
	
	return r;
}