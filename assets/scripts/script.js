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

function moveBird(birdEl, pathEl, moveCounter) {
  moveCounter += 0.003;
  var pathLen = pathEl.getTotalLength()
  var ptOnLine = pathEl.getPointAtLength(moveCounter * pathLen)
  var translateCoords = "translate(" + (ptOnLine.x + 15)
    + "," + (ptOnLine.y + 15) + ")";
  birdEl.setAttribute("transform", translateCoords);
  if (moveCounter != 1) {
    requestAnimationFrame(function() {
      moveBird(birdEl, pathEl, moveCounter);
    });
  } else {
    //birdSit()
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
var birdNum = 0;
const BIRD_MAX = 20;
var bird = document.getElementById("bird0");
// main bird must remain in same position so that subsequent birds also start
// from that position
//setTimeout(moveBird(bird, path), 2000);
var birds_and_paths = []
for(var i=0; i < BIRD_MAX; i++){
  ptOnLine = telephoneLines[getRandomInt(0,3)].getPointAtLength(getRandomInt(0,333));
  birds_and_paths.push([makeBird(), makePath(ptOnLine.x, ptOnLine.y)]);
  setTimeout(moveBird, (5000+(i*5000)), birds_and_paths[i][0],
    birds_and_paths[i][1], 0);
}