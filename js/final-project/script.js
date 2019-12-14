var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var tileW = 80;
var tileH = 80;
var mapW = 10;
var mapH = 10;

var gameMap = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 2, 4, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 5, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

window.onload = function () {
  requestAnimationFrame(drawGame);
}

function drawGame() {
  if (ctx == null) return;

  for (var col = 0; col < mapH; col++) {
    for (var row = 0; row < mapW; row++) {
      switch (gameMap[((col * mapW) + row)]) {
        case 1: {
          ctx.fillStyle = '#000000';
          break;
        }
        case 2: {
          var img = new Image();
          img.src = 'images/rock1.png';
          ctx.drawImage(img, row * mapW, col * mapH);
          break;
        }

      }

      // ctx.fillRect(row * tileW, col * tileH, tileW, tileH);
    }
  }

  requestAnimationFrame(drawGame);
}

// function rock1(){
//   this.height = 100;
//   this.width = 100;
//   this.element;

//   this.init = function() {
//     var rock = document.createElement('div');
//     this.element = rock;
//     this.element.style.width = this.width + '%';
//     this.element.style.height = this.height + '%';
//     this.element.style.backgroundImage = "url('images/rock1.png')";
//   }
// }































































// function rock1(ctx) {
//   this.x = 0;
//   this.y = 0;
//   this.height = 40;
//   this.width = 90;
//   this.ctx = ctx;
//   this.element;

//   this.rockMap = {

//   }

//   this.init = function () {

//     this.draw();
//   }

//   this.setPosition = function (x, y) {
//     this.x = x;
//     this.y = y;
//   }
// }