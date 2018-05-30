// user input
var cavasSize          =  500;
var pointSize          =    8;
var lineSize           =    1;
var showPoints         = false;
var pointColor         = [255, 255, 0];
var showSpirals        = true;
var lineColor          = [0, 255, 0];
var showCounterSpirals = true;
var counterLineColor   = [0, 255, 255];

var fibonacciA         =    8;
var fibonacciB         =   13;
var angleToGo          = -137.5;
var distanceToGo       =    1;
var pointsToDraw       =  400;

// not in use
// var drawingSpeed       =  500;


// derived
var center              = [cavasSize / 2,cavasSize / 2];
var currentAngle        = 0;
var currentDistance     = 0;
var currentCoord        = center;
var amountSteps         = 0;
var i                   = 0;
var curvePoints         = new Array(fibonacciA);
for (i = 0; i <= fibonacciA; i++) {
	curvePoints[i] = new Array(fibonacciA);
	curvePoints[i][0] = center[0];
	curvePoints[i][1] = center[1];
	curvePoints[i][2] = center[0];
	curvePoints[i][3] = center[1];
	curvePoints[i][4] = center[0];
	curvePoints[i][5] = center[1];
	curvePoints[i][6] = center[0];
	curvePoints[i][7] = center[1];
}
var curvePointsCounter  = new Array(fibonacciB);
for (i = 0; i <= fibonacciB; i++) {
	curvePointsCounter[i] = new Array(fibonacciB);
	curvePointsCounter[i][0] = center[0];
	curvePointsCounter[i][1] = center[1];
	curvePointsCounter[i][2] = center[0];
	curvePointsCounter[i][3] = center[1];
	curvePointsCounter[i][4] = center[0];
	curvePointsCounter[i][5] = center[1];
	curvePointsCounter[i][6] = center[0];
	curvePointsCounter[i][7] = center[1];
}

function setup() {
	// set up canvas
	createCanvas(cavasSize,cavasSize);
	angleMode(DEGREES);
	// frameRate(drawingSpeed);
	background(51);
	noFill();
}


function draw() {
	
	// stop when done
	amountSteps++;
	if (amountSteps == pointsToDraw) {
		frameRate(0);
	}
	
	// calculate for each step
	currentAngle    += angleToGo;
	currentDistance += distanceToGo;
	currentCoord = getXY(currentDistance, currentAngle, center);
	
	if (showSpirals == true) {
		for (i = 0; i <= fibonacciA; i++) {
			if ((amountSteps - i) % fibonacciA == 0) {
				
				// draw if enough data is there
				if (curvePoints[i][0] != center[0]) {
					stroke(lineColor[0],lineColor[1],lineColor[2]);
					strokeWeight(lineSize);
					curve(
						curvePoints[i][0],
						curvePoints[i][1],
						curvePoints[i][2],
						curvePoints[i][3],
						curvePoints[i][4],
						curvePoints[i][5],
						curvePoints[i][6],
						curvePoints[i][7],
					);
				}
				
				// cycle data points
				curvePoints[i][0] = curvePoints[i][2];
				curvePoints[i][1] = curvePoints[i][3];
				curvePoints[i][2] = curvePoints[i][4];
				curvePoints[i][3] = curvePoints[i][5];
				curvePoints[i][4] = curvePoints[i][6];
				curvePoints[i][5] = curvePoints[i][7];
				curvePoints[i][6] = currentCoord[0];
				curvePoints[i][7] = currentCoord[1];
			}
		}
	}
	
	if (showCounterSpirals == true) {
		for (i = 0; i <= fibonacciB; i++) {
			if ((amountSteps - i) % fibonacciB == 0) {
				
				// draw if enough data is there
				if (curvePointsCounter[i][0] != center[0]) {
					stroke(counterLineColor[0],counterLineColor[1],counterLineColor[2]);
					strokeWeight(lineSize);
					curve(
						curvePointsCounter[i][0],
						curvePointsCounter[i][1],
						curvePointsCounter[i][2],
						curvePointsCounter[i][3],
						curvePointsCounter[i][4],
						curvePointsCounter[i][5],
						curvePointsCounter[i][6],
						curvePointsCounter[i][7],
					);
				}
				// cycle data points
				curvePointsCounter[i][0] = curvePointsCounter[i][2];
				curvePointsCounter[i][1] = curvePointsCounter[i][3];
				curvePointsCounter[i][2] = curvePointsCounter[i][4];
				curvePointsCounter[i][3] = curvePointsCounter[i][5];
				curvePointsCounter[i][4] = curvePointsCounter[i][6];
				curvePointsCounter[i][5] = curvePointsCounter[i][7];
				curvePointsCounter[i][6] = currentCoord[0];
				curvePointsCounter[i][7] = currentCoord[1];
			}
		}
	}

	if (showPoints == true) {
		strokeWeight(pointSize);
		stroke(pointColor[0],pointColor[1],pointColor[2]);
		point(currentCoord[0],currentCoord[1]);
	}
}

function getXY(distance, angle, center) { 
	coordX = distance * cos(angle);
	coordY = distance * sin(angle);
	return [coordX + center[0], coordY + center[1]];
}

