// performance tweaks
p5.disableFriendlyErrors = true;

// CONFIG

// math
var fibonacciA         =    8;
var fibonacciB         =   13;
var anglePrecision     =    5;
var angleToGo          = -137.5077640 / anglePrecision;
var distanceToGo       =    0.01      / anglePrecision;
var distanceToGain     =    0.01       / anglePrecision;
var pointsToDraw       =  200         * anglePrecision;

// graphics
var cavasSize          =  600;
var drawingSpeed       =   90;
var showFps            = true;

var showPoints         = true;
var pointSize          = 8;
var pointColor         = [255, 255, 0];

var showSpirals        = true;
var lineSize           = 2;
var lineColor          = [0, 255, 0];
var showCounterSpirals = true;
var counterLineColor   = [0, 255, 255];

var showBaseSpiral     = true;
var baseLineSize       = 1;
var baseLineColor      = [100, 100, 100]


// derived
var center              = [cavasSize / 2, cavasSize / 2];
var currentAngle        = 0;
var lastDistanceA       = 0;
var lastDistanceB       = distanceToGo;
var currentDistance     = 0;
var currentCoord        = center;
var amountSteps         = 0;
var i                   = 0;
var fps                 = 0;
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
var baseSpiralPoints = new Array(8);
baseSpiralPoints[0] = center[0];
baseSpiralPoints[1] = center[1];
baseSpiralPoints[2] = center[0];
baseSpiralPoints[3] = center[1];
baseSpiralPoints[4] = center[0];
baseSpiralPoints[5] = center[1];
baseSpiralPoints[6] = center[0];
baseSpiralPoints[7] = center[1];

function setup() {
	// set up canvas
	createCanvas(cavasSize,cavasSize);
	angleMode(DEGREES);
	frameRate(drawingSpeed);
	background(51);
	noFill();
}

function draw() {
	
	// stepping and end condition
	amountSteps++;
	if (amountSteps == pointsToDraw) {
		frameRate(0);
	}
	
	if (showFps && amountSteps % 20 == 0) {
		fps = frameRate();
		displayText("FPS: " + fps.toFixed(2), 10, 10);
	}

	// -------------------------------------------------------
	// ANGLE for each step
	// -------------------------------------------------------
	currentAngle    += angleToGo;
	
	// -------------------------------------------------------
	// DISTANCE for each step
	// -------------------------------------------------------

	// fibonacci
	// currentDistance = lastDistanceA + lastDistanceB;
	// lastDistanceA = lastDistanceB;
	// lastDistanceB = currentDistance;
	
	// bernd
	currentDistance += distanceToGo + distanceToGain * amountSteps;

	// -------------------------------------------------------
	// Resulting coordinates
	// -------------------------------------------------------
	currentCoord = getXY(currentDistance, currentAngle, center);
	displayText("Distance: " + currentDistance, 10, 30);

	// -------------------------------------------------------
	// Rendering
	// -------------------------------------------------------
	if (showSpirals == true && amountSteps % anglePrecision == 0) {
		for (i = 0; i <= fibonacciA; i++) {
			if ((amountSteps - i) % fibonacciA == 0) {
				drawSpiral(curvePoints[i], lineSize, lineColor);
				curvePoints[i] = cycleDataPoints(curvePoints[i], currentCoord);
			}
		}
	}
	
	if (showCounterSpirals == true && amountSteps % anglePrecision == 0) {
		for (i = 0; i <= fibonacciB; i++) {
			if ((amountSteps - i) % fibonacciB == 0) {
				drawSpiral(curvePointsCounter[i], lineSize, counterLineColor) ;
				curvePointsCounter[i] = cycleDataPoints(curvePointsCounter[i], currentCoord);
			}
		}
	}

	if (showBaseSpiral == true) {
		drawSpiral(baseSpiralPoints, baseLineSize, baseLineColor);
		baseSpiralPoints = cycleDataPoints(baseSpiralPoints, currentCoord);
	}

	if (showPoints == true && amountSteps % anglePrecision == 0) {
		strokeWeight(pointSize);
		stroke(pointColor[0],pointColor[1],pointColor[2]);
		point(currentCoord[0],currentCoord[1]);
	}
}

function drawSpiral(dataPoints, drawLineSize, drawColor) {
	// only draw if enough data for a curve
	if (dataPoints[0] != center[0]) {
		stroke(drawColor[0],drawColor[1],drawColor[2]);
		strokeWeight(drawLineSize);
		curve(
			dataPoints[0],
			dataPoints[1],
			dataPoints[2],
			dataPoints[3],
			dataPoints[4],
			dataPoints[5],
			dataPoints[6],
			dataPoints[7],
		);
	}	
}

function getXY(distance, angle, center) { 
	coordX = distance * cos(angle);
	coordY = distance * sin(angle);
	return [coordX + center[0], coordY + center[1]];
}

function cycleDataPoints(dataPoints, newInput) {
	return [
		dataPoints[2],
		dataPoints[3],
		dataPoints[4],
		dataPoints[5],
		dataPoints[6],
		dataPoints[7],
		newInput[0],
		newInput[1]				
	];
}

function displayText(output, positionX, positionY) {
	fill(51);
	stroke(51);
	rect(positionX, positionY - 10, 500, 10);
	fill(255);
	stroke(0);
	text(output, positionX, positionY);
	noFill();
}