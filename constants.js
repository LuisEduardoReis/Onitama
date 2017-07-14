var E = 0;

var RED = true;
var BLUE = false;

var B_P = 1;
var B_K = 2;

var R_P = 3;
var R_K = 4;

var BOARD_SIZE = 5;

var COLOR = {};
COLOR[B_P] = BLUE;
COLOR[B_K] = BLUE;

COLOR[R_P] = RED;
COLOR[R_K] = RED;

var PIECE_NAMES = {};
PIECE_NAMES[E] = "E";

PIECE_NAMES[B_P] = "B_P";
PIECE_NAMES[B_K] = "B_K";

PIECE_NAMES[R_P] = "R_P";
PIECE_NAMES[R_K] = "R_K";

function pos(x,y) { return {x: x, y: y};}

function between(x,a,b) {return x >= a && x <= b;}
function between2d(x,y, ax,ay, bx,by) {return x >= ax && x <= bx && y >= ay && y <= by;}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}