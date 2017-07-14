var INF = 100000;
var search_time = 60*1000;
var search_start = 0;
var search_accum = 0;
var timedout = false;

function checkTime() {
	if(search_accum++ > 10000) {
		if (new Date().getTime() - search_start > search_time) timedout = true;
		search_accum = 0;
	}
	return timedout;
}

function negaMaxRoot(board, depth) {
	if (checkTime()) return null;
	var alpha = -INF, beta = INF, best = null;
	var moves = board.getValidMoves(board.active);
	for(var i = 0; i < moves.length; i++) {
		var nm = negaMax(new Board().copy(board).makeMove(moves[i]), depth-1, -beta, -alpha);
		if (nm == null) return null;
		var score = -nm;
		if (score > alpha) {
			alpha = score;
			best = moves[i];
		}
	}
	return {max: alpha, max_move: best};
}	
function negaMax(board, depth, alpha, beta) {
	if (checkTime()) return null;
	if (depth == 0) return board.evaluate();
	var max = -INF;
	var moves = board.getValidMoves(board.active);
	for(var i = 0; i < moves.length; i++) {
		var nm = negaMax(new Board().copy(board).makeMove(moves[i]), depth-1, -beta, -alpha);
		if (nm == null) return null;
		var score = -nm;
		if (score >= beta) {
			return beta;
		}
		if (score > alpha) {
			alpha = score;
		}
	}
	return alpha;
}	

function IDNegamax(board) {
	search_time = 100;
	search_start = new Date().getTime();
	search_accum = 0;
	timedout = false;
	
	var most_recent = null;
	for(var depth = 2;; depth+=2) {		
		console.log("Depth "+depth);
		var res = negaMaxRoot(board, depth);
		if (res != null) 
			most_recent = res;
		else 
			break;
		console.log("Res: "+ res.max, res.max_move, (new Date().getTime() - search_start)/1000);
	}
	console.log("Res: "+ most_recent.max, most_recent.max_move, (new Date().getTime() - search_start)/1000);
	return most_recent;
}
