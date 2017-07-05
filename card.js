
var Tiger = [pos(0,2),pos(0,-1)];
var Dragon = [pos(-2,1),pos(2,1),pos(-1,-1),pos(1,-1)];
var Frog = [pos(-2,0),pos(-1,1),pos(1,-1)];
var Rabbit = [pos(2,0),pos(1,1),pos(-1,-1)];
var Crab = [pos(-2,0),pos(0,1),pos(2,0)];
var Elephant = [pos(-1,1),pos(-1,0),pos(1,1),pos(1,0)];
var Goose = [pos(-1,1),pos(-1,0),pos(1,0),pos(1,-1)];
var Rooster = [pos(-1,-1),pos(-1,0),pos(1,0),pos(1,1)];
var Monkey = [pos(-1,-1),pos(-1,1),pos(1,-1),pos(1,1)];
var Mantis = [pos(0,-1),pos(-1,1),pos(1,1)];
var Horse = [pos(-1,0),pos(0,1),pos(0,-1)];
var Ox = [pos(1,0),pos(0,1),pos(0,-1)];
var Crane = [pos(-1,-1),pos(0,1),pos(1,-1)];
var Boar = [pos(-1,0),pos(0,1),pos(1,0)];
var Eel = [pos(-1,-1),pos(-1,1),pos(1,0)];
var Cobra = [pos(-1,0),pos(1,1),pos(1,-1)];

var CARDS = [Tiger,Dragon,Frog,Rabbit,Crab,Elephant,Goose,Rooster,Monkey,Mantis,Horse,Ox,Crane,Boar,Eel,Cobra];

var CARD_NAMES = {};
CARD_NAMES[JSON.stringify(Tiger)] = "Tiger";
CARD_NAMES[JSON.stringify(Dragon)] = "Dragon";
CARD_NAMES[JSON.stringify(Frog)] = "Frog";
CARD_NAMES[JSON.stringify(Rabbit)] = "Rabbit";
CARD_NAMES[JSON.stringify(Crab)] = "Crab";
CARD_NAMES[JSON.stringify(Elephant)] = "Elephant";
CARD_NAMES[JSON.stringify(Goose)] = "Goose";
CARD_NAMES[JSON.stringify(Rooster)] = "Rooster";
CARD_NAMES[JSON.stringify(Monkey)] = "Monkey";
CARD_NAMES[JSON.stringify(Mantis)] = "Mantis";
CARD_NAMES[JSON.stringify(Horse)] = "Horse";
CARD_NAMES[JSON.stringify(Ox)] = "Ox";
CARD_NAMES[JSON.stringify(Crane)] = "Crane";
CARD_NAMES[JSON.stringify(Boar)] = "Boar";
CARD_NAMES[JSON.stringify(Eel)] = "Eel";
CARD_NAMES[JSON.stringify(Cobra)] = "Cobra";

var drawCard = function(card) {
	push();
	var w = 10;
	// Name
	stroke(0); fill(0); textAlign(CENTER,TOP);
	text(CARD_NAMES[JSON.stringify(card)],25,0);
	
	translate(0,15);
	// Lines
	for(var i = 0; i <= BOARD_SIZE; i++) {
		line(i*w,0,i*w,BOARD_SIZE*w);
		line(0,i*w,BOARD_SIZE*w,i*w);
	}
	// Pieces
	fill(128); rect(2*w,2*w,w,w);
	fill(0);
	for(var i = 0; i < card.length; i++)
		rect((card[i].x+2)*w,(4-(card[i].y+2))*w,w,w);
	
	pop();
}