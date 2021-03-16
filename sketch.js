var font;
var vehicles = [];
var pointLocation = [];

var nextT = 0;
var maxChangeForce = 20;

// var instructions = [];
// var insText = 'Click anywhere to change the Text';

function preload() {
	font = loadFont('AkayaTelivigala-Regular.ttf');
}

function setup() {
	createCanvas(1000, 500);

	textAlign(CENTER, CENTER);
	textFont(font);


	var points = gridPoints();

	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y, piDigit(i, points.length, 0), 8);
		vehicles.push(vehicle);
	}

	// var boundsIns = font.textBounds(insText, 0, 0, 30);
	// var posxIns = width / 2 - boundsIns.w / 2;
	// var posyIns = height / 6 + boundsIns.h / 2;

	// var insAr = split(insText, ' ');

	// for (var i = 0; i < insAr.length; i++) {
	// var bounds2 = font.textBounds(insAr[i], 0, 0, 30);
	// var posx2 = posxIns;
	// var posy2 = posyIns;

	// posxIns += bounds2.w + 10;

	// var points2 = font.textToPoints(insAr[i], posx2, posy2, 30, {
	// sampleFactor: 0.3
	// });

	// for (var j = 0; j < points2.length; j++) {
	// 	var pt = points2[j];
	// 	var v = new Vehicle(pt.x, pt.y, 3);
	// 	instructions.push(v);
	// }
	// }
}

function draw() {
	background(51);

	// for (var i = 0; i < instructions.length; i++) {
	// 	var v = instructions[i];
	// 	v.behaviors();
	// 	v.update();
	// 	v.show();
	// }

	for (var i = 0; i < vehicles.length; i++) {
		var v = vehicles[i];
		v.behaviors();
		v.update();
		v.show();
	}
}

function mouseClicked() {
	// nextT++;

	// nextT %= text.length;
	gridSetup = !gridSetup;

	// var points = font.textToPoints(texts[nextT], posx, posy, 192, {
	// sampleFactor: 0.1
	// });

	var points = gridSetup ? gridPoints() : piPoints();

	var font_size = gridSetup ? 8 : 4;

	var movedSpaces = gridSetup ? 0 : 65;

	if (points.length < vehicles.length) {
		// If new word requires less points than previous
		var toSplice = vehicles.length - points.length;
		vehicles.splice(points.length - 1, toSplice);
		// Cut out the excess
		for (var i = 0; i < points.length; i++) {
			vehicles[i].target.x = points[i].x;
			vehicles[i].target.y = points[i].y;
			vehicles[i].txt = piDigit(i, points.length, movedSpaces);
			vehicles[i].r = font_size;
			vehicles[i].hue = points.length - i;
			// Reassing the targets of every point
			var force = p5.Vector.random2D();
			force.mult(random(maxChangeForce));
			vehicles[i].applyForce(force);
			// Randomize the force to make them look natural
		}
	} else if (points.length > vehicles.length) {
		// Else if new word requires more points than previous
		for (var i = vehicles.length; i < points.length; i++) {
			var v = vehicles[i - vehicles.length].clone();
			vehicles.push(v);
			// We add clones to the list to fill up empty space
		}

		for (var i = 0; i < points.length; i++) {
			vehicles[i].target.x = points[i].x;
			vehicles[i].target.y = points[i].y;
			vehicles[i].txt = piDigit(i, points.length, movedSpaces);
			vehicles[i].r = font_size;
			vehicles[i].hue = i;
			// Reassign the targets for every point
			var force = p5.Vector.random2D();
			force.mult(random(maxChangeForce));
			vehicles[i].applyForce(force);
			// Randomize the force to make them look natural
		}

	} else {
		// However, if we don't need more or less points
		for (var i = 0; i < points.length; i++) {
			vehicles[i].target.x = points[i].x;
			vehicles[i].target.y = points[i].y;
			vehicles[i].txt = piDigit(i, points.length, movedSpaces);
			vehicles[i].r = font_size;
			vehicles[i].hue = i;

			var force = p5.Vector.random2D();
			force.mult(random(maxChangeForce));
			vehicles[i].applyForce(force);
		}
	}
}
