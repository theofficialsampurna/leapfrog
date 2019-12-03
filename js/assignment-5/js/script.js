var MAX_WIDTH = 750;
var MAX_HEIGHT = 500;
var score = 0;
var highscore = 0;
var counter = 0;

var parentElement = document.getElementsByClassName('app')[0];

var gameStartSign = document.createElement('div');
gameStartSign.style.display = 'block';
gameStartSign.style.width = 184 + 'px';
gameStartSign.style.height = 93 + 'px';
gameStartSign.style.position = 'absolute';
gameStartSign.style.top = 150 + 'px';
gameStartSign.style.left = 154 + 'px';
gameStartSign.style.zIndex = '300';
gameStartSign.style.backgroundImage = "url('images/gameStart.png') ";
parentElement.appendChild(gameStartSign);

var gameOver = document.createElement('div');
gameOver.style.background = "url('images/gameover.png') no-repeat";
gameOver.style.position = 'absolute';
gameOver.style.zIndex = '1';
gameOver.style.display = 'none';
gameOver.style.left = 150 + 'px';
gameOver.style.top = 150 + 'px';
gameOver.style.width = 192 + 'px';
gameOver.style.height = 42 + 'px';
parentElement.appendChild(gameOver);

var scoreBoard = document.createElement('div');
scoreBoard.style.position = 'absolute';
scoreBoard.style.zIndex = '1';
scoreBoard.style.fontWeight = 'bold';
scoreBoard.style.color = 'white';
scoreBoard.style.fontSize = 20 + 'px';
scoreBoard.innerHTML = ["Score: " + score];
parentElement.appendChild(scoreBoard);

var highScore = document.createElement('div');
highScore.style.position = 'absolute';
highScore.style.zIndex = '1';
highScore.style.top = 25 + 'px';
highScore.style.fontWeight = 'bold';
highScore.style.color = 'white';
highScore.style.fontSize = 20 + 'px';

highScore.innerHTML = ["High Score: " + highscore];
parentElement.appendChild(highScore);

var up = false;
var groundArray;
var pipeArray;
var pipeInterval;
var interval;
var gameover = true;

window.addEventListener("keyup", function (event) {
  if (event.keyCode === 32) {
    up = false;
  }
});
window.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    up = true;
  }
  if (event.keyCode === 13 && gameover) {
    startGame();
  }
});

function startGame() {
  game.init();
  gameStartSign.style.display = 'none';
}

function Bird() {
  var that = this;
  this.width = 32;
  this.height = 30;
  this.x = 250;
  this.y = 200;
  this.speed = 0;
  this.down = 0.8;
  this.up = -5;
  this.element;

  this.init = function () {
    this.element = document.createElement('div');
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.background = "url('images/bird.png') no-repeat";
    this.element.style.position = 'absolute';
    parentElement.appendChild(this.element);
    interval = setInterval(this.update, 25);
    gameover = true;
  }

  this.update = function () {
    if (that.speed < -5) {
      that.speed = -5;
    }

    that.checkCollison();

    if (counter < 5) {
      that.element.style.backgroundPosition = 'left';
      counter++;
    } else if (counter < 10) {
      that.element.style.backgroundPosition = 'center';
      counter++;
    } else if (counter < 15) {
      that.element.style.backgroundPosition = 'right';
      counter = 0;
    }

    if (up == true) {
      that.speed += that.up;
      that.y += that.speed;
      that.element.style.top = that.y + 'px';
    } else if (up == false) {
      that.speed += that.down;
      that.speed *= 0.9;
      that.y += that.speed;
      that.element.style.top = that.y + 'px';
    }
  }

  this.checkCollison = function () {
    if (that.y + that.height >= 430 || that.y <= 0) { // (MAX_HEIGHT - HEIGHT OF GROUND = 430)
      that.y = 400;
      that.element.style.top = that.y + 'px';
      clearInterval(interval);
      clearInterval(pipeInterval);
      gameOver.style.display = 'block';
      gameover = true;
    }
    for (var i = 0; i < pipeArray.length; i++) {
      if (that.x + that.width >= pipeArray[i].x && that.x <= pipeArray[i].x + pipeArray[i].width) {
        if (that.y <= pipeArray[i].heightTop || that.y + that.height >= pipeArray[i].yBottom) {
          clearInterval(interval);
          clearInterval(pipeInterval);
          gameOver.style.display = 'block';
          gameover = true;
        }
      }
    }
    gameover = false;
  }
}

function Pipe(initialPosition) {
  var that = this;
  this.width = 58;
  this.headHeight = 27;
  this.heightTop = getRandomNumber(20, 200);
  this.heightBottom = 430 - (this.heightTop + 100);
  this.x = initialPosition;
  this.yTop = 0;
  this.yBottom = 430 - this.heightBottom;
  this.speed = -1;
  this.elementTop = document.createElement('div');
  this.elementTop.style.left = this.x + 'px';
  this.elementTop.style.top = this.yTop + 'px';
  this.elementTop.style.width = this.width + 'px';
  this.elementTop.style.height = this.heightTop + 'px';
  this.elementTop.style.background = "url('images/pipe-background.png') repeat-y";
  this.elementTop.style.backgroundPosition = 'center';
  this.elementTop.style.position = 'absolute';
  parentElement.appendChild(this.elementTop);

  this.elementHeadTop = document.createElement('div');
  this.elementHeadTop.style.left = this.x + 'px';
  this.elementHeadTop.style.top = this.heightTop - this.headHeight + 'px';
  this.elementHeadTop.style.width = this.width + 'px';
  this.elementHeadTop.style.height = this.headHeight + 'px';
  this.elementHeadTop.style.background = "url('images/pipe-head.png') no-repeat";
  this.elementHeadTop.style.position = 'absolute';
  parentElement.appendChild(this.elementHeadTop);

  this.elementBottom = document.createElement('div');
  this.elementBottom.style.left = this.x + 'px';
  this.elementBottom.style.top = this.yBottom + this.headHeight + 'px';
  this.elementBottom.style.width = this.width + 'px';
  this.elementBottom.style.height = this.heightBottom - this.headHeight + 'px';
  this.elementBottom.style.background = "url('images/pipe-background.png') repeat-y";
  this.elementBottom.style.backgroundPosition = 'center';
  this.elementBottom.style.position = 'absolute';
  parentElement.appendChild(this.elementBottom);

  this.elementHeadBottom = document.createElement('div');
  this.elementHeadBottom.style.left = this.x + 'px';
  this.elementHeadBottom.style.top = this.yBottom + 'px';
  this.elementHeadBottom.style.width = this.width + 'px';
  this.elementHeadBottom.style.height = this.headHeight + 'px';
  this.elementHeadBottom.style.background = "url('images/pipe-head.png') no-repeat";
  this.elementHeadBottom.style.position = 'absolute';
  parentElement.appendChild(this.elementHeadBottom);

  this.move = function () {
    this.x += this.speed;
    this.elementTop.style.left = this.x + 'px';
    this.elementHeadTop.style.left = this.x + 'px';
    this.elementBottom.style.left = this.x + 'px';
    this.elementHeadBottom.style.left = this.x + 'px';
  }
  this.remove = function () {
    parentElement.removeChild(this.elementTop);
    parentElement.removeChild(this.elementHeadTop);
    parentElement.removeChild(this.elementBottom);
    parentElement.removeChild(this.elementHeadBottom);
  }

}

function Ground(initialPosition) {
  var that = this;
  this.x = initialPosition;
  this.y = 430;
  this.width = 750;
  this.height = 70;
  this.speed = -1;

  this.element = document.createElement('div');
  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
  this.element.style.background = "url('images/base.png') repeat-x";
  this.element.style.position = 'absolute';
  parentElement.appendChild(this.element);

  this.move = function () {
    this.x += this.speed;
    this.element.style.left = this.x;
  }

  this.remove = function () {
    parentElement.removeChild(this.element);
  }

}

function Score() {
  for (var i = 0; i < pipeArray.length; i++) {
    if (pipeArray[i].x == 190) {
      score += 1;
      scoreBoard.innerHTML = ('Score: ' + score);
      if (score > highscore) {
        window.localStorage.setItem('highscore', score);
      }
    }
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function Game() {
  this.init = function () {
    new Bird().init();
    pipeArray = [new Pipe(600), new Pipe(900), new Pipe(1200)];
    groundArray = [new Ground(0), new Ground(749), new Ground(1499)];
    pipeInterval = setInterval(function () {
      for (var i = 0; i < pipeArray.length; i++) {
        pipeArray[i].move();
        if (pipeArray[i].x <= -50) {
          pipeArray[i].remove();
          pipeArray.shift();
          pipeArray.push(new Pipe(850));
        }
      }
      for (var j = 0; j < groundArray.length; j++) {
        groundArray[j].move();
        if (groundArray[j].x <= -750) {
          groundArray[j].remove();
          groundArray.shift();
          groundArray.push(new Ground(900));
        }
      }
      Score();
    }, 10);
    highscore = window.localStorage.getItem('highscore') || 0;
    highScore.innerHTML = ('Highscore: ' + highscore);
  }
}

var game = new Game();
