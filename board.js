var E = 0;

var B_P = 1;
var B_K = 2;

var R_P = 1;
var R_K = 2;


var Board = function () {
	this.cells = [];
	this.active = true;
	
	this.validmoves = null;
	this.op_validmoves = null;

	this.halfmove = 0;
	this.fullmove = 1;
}