var E = 0;

var B_P = 1;
var B_K = 2;

var R_P = 3;
var R_K = 4;

var BOARD_SIZE = 5;

function pos(x,y) { return {x: x, y: y};}

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