var font;
var vehicles = [];

function preload() {
	font = loadFont('AkayaTelivigala-Regular.ttf');
}

function setup() {
	createCanvas(600,300);
	background(51);
	// textFont(font);
	// textSize(192);
	// fill(255);
	// noStroke();
	// text('train', 100, 200);

	var points = font.textToPoints('train', 100, 200, 192);

	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y);
		vehicles.push(vehicle);
	}
}

function draw() {
	background(51);
	for (var i = 0; i < vehicles.length; i++) {
		var v = vehicles[i];
		v.behaviors();
		v.update();
		v.show();
	}
	
}