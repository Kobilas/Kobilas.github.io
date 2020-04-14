svgCanvas = document.getElementById("canvas");
telephoneLines = document.getElementsByClassName("telephoneLineUpper");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function makePath(x, y) {
  var cntrlX = getRandomInt(x/4, (3*x)/4);
  var cntrlY = getRandomInt(y/8, y/4);
  var dAttr = "M0,0 Q" + cntrlX + "," + cntrlY + " " + x + "," + y
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("class", "motionPath");
  path.setAttribute("fill", "none");
  path.setAttribute("d", dAttr);
  svgCanvas.appendChild(path);
  return path;
}

function moveBird() {
  counter += 0.003;
  var translateCoords = "translate(" + (path.getPointAtLength(counter * pathLength).x - 15) + "," + (path.getPointAtLength(counter * pathLength).y - 15) + ")";
  bird.setAttribute("transform", translateCoords);
  if (counter != 1) {
    requestAnimationFrame(moveBird);
  }
}

var ptOnLine = telephoneLines[getRandomInt(0,3)].getPointAtLength(getRandomInt(0,333));
var path = makePath(ptOnLine.x, ptOnLine.y);
var pathLength = path.getTotalLength();
var counter = 0;
var bird = document.getElementById("bird0");
requestAnimationFrame(moveBird);