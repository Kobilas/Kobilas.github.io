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

function moveBird(birdEl, pathEl) {
  counter += 0.003;
  var translateCoords = "translate(" + (pathEl.getPointAtLength(counter * pathLength).x + 15) + "," + (pathEl.getPointAtLength(counter * pathLength).y + 15) + ")";
  birdEl.setAttribute("transform", translateCoords);
  if (counter != 1) {
    requestAnimationFrame(function() {
      moveBird(birdEl, pathEl);
    });
  } else {

  }
}

function makeBird() {
  newBird = bird.cloneNode(true)
  newBird.setAttribute("id", "bird"+birdNum++)
  svgCanvas.appendChild(newBird)
  return newBird
}

function birdSit(birdEl) {

}

var svgCanvas = document.getElementById("canvas");
var telephoneLines = document.getElementsByClassName("telephoneLineUpper");
var randIntOne = getRandomInt(0,3);
var randIntTwo = getRandomInt(0,333);
var ptOnLine = telephoneLines[randIntOne].getPointAtLength(randIntTwo);
var path = makePath(ptOnLine.x, ptOnLine.y);
var pathLength = path.getTotalLength();
var counter = 0;
var birdNum = 1;
var bird = document.getElementById("bird0");
moveBird(bird, path);
var birds = []
for(var i=0; i < 20; i++){
  birds.push(makeBird());
  var ptOnLine = telephoneLines[getRandomInt(0,3)].getPointAtLength(getRandomInt(0,333));
  var path = makePath(ptOnLine.x, ptOnLine.y);
  moveBird(birds[i], path);
}