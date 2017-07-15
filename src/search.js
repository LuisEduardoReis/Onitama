var INF = 100000;
var search_time = 1000;
var search_start = 0;
var search_accum = 0;
var search_count = 0;
var timedout = false;
var cut = false;

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
	if (board.ended()) return board.value;
	if (depth == 0) {		
		cut = true;
		return board.value;		
	}
	
	var max = -INF;
	var moves = board.getValidMoves(board.active);
	for(var i = 0; i < moves.length; i++) {
		search_count++;
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

function IDNegamax(board, time) {
	search_time = time || 100;
	search_start = new Date().getTime();
	search_accum = 0;
	search_count = 0;
	timedout = false;
	
	var result = null;
	var reached_depth = 0;
	for(var depth = 2;; depth+=2) {		
		//console.log("Depth "+depth);
		cut = false;
		var res = negaMaxRoot(board, depth);
		if (res != null) {
			result = res;
			reached_depth = depth;
		} else 
			break;
		if (!cut) break;
		if (result.max > 10) break;
		//console.log("Res: "+ res.max, res.max_move, (new Date().getTime() - search_start)/1000);
	}
	
	if (result != null && result.max_move != null) result.max_move.debug = 
		"( D: " + reached_depth + 
		" | S: " + numberWithCommas(search_count) +
		" | O: " + result.max + 
		" | T: " + ((new Date().getTime() - search_start)/1000) + " seconds)";
	
	return result;
}
