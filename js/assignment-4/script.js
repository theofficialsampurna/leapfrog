var parentElement = document.getElementById('app');
var road1 = new roadFighter(parentElement);
road1.gameInit();


function roadFighter(parentElement) {
  var MAX_WIDTH = 600;
  var MAX_HEIGHT = 480;
  var BG_HEIGHT = 960;
  var x = 0;
  var y = 0;
  var speed = 2;
  var dx = 0;
  var dy = 1;
  var parentElement = parentElement;
  var gameWrapper = document.createElement('div');
  var posLane1 = 140;
  var posLane2 = 200;
  var posLane3 = 260;
  var progress = 60;
  var obstacles = [];
  var obstaclesNo = 5;
  var speedObs = 3;
  var mainCar = new Car();
  var gameOver = document.createElement('div');
  var scoreBoard = document.createElement('div');
  var score = 0;
  var scoreText;
  this.request = 0;
  var scoreBoard = document.createElement('div');

  this.gameInit = function () {
    this.createAll();

  }

  this.createAll = function () {
    //parentElement css
    parentElement.style.height = MAX_HEIGHT + 'px';
    parentElement.style.width = MAX_WIDTH + 'px';
    parentElement.style.position = 'relative';
    parentElement.style.margin = '0 auto';
    parentElement.style.overflow = 'hidden';

    //backgroundWrapper creation and css
    gameWrapper.style.width = 100 + '%';
    gameWrapper.style.height = BG_HEIGHT + 'px';
    gameWrapper.style.position = 'absolute';
    gameWrapper.style.bottom = 0;
    gameWrapper.style.left = 0
    gameWrapper.style.background = "url('images/roadfightergrass.png')";
    gameWrapper.style.backgroundRepeat = 'no-repeat';
    parentElement.appendChild(gameWrapper);

    gameOver.style.background = "url('images/gameover.jpg')";
    gameOver.style.backgroundRepeat = 'no-repeat';
    // gameOver.style.backgroundSize = 'c';
    gameOver.style.position = 'absolute';
    gameOver.style.display = 'none';
    gameOver.style.zIndex = '100';
    gameOver.style.opacity = '0.9';
    gameOver.style.width = 480 + 'px';
    gameOver.style.height = MAX_HEIGHT + 'px';
    parentElement.appendChild(gameOver);

    scoreBoard.style.position = 'absolute';
    scoreBoard.style.zIndex = '100';
    scoreBoard.style.left = 470 + 'px';
    scoreBoard.style.top = 50 + 'px';
    scoreBoard.style.color = 'white';
    parentElement.appendChild(scoreBoard);


    mainCar.init();
    for (var i = 0; i <= (obstaclesNo - 1); i++) {
      generateObstacle(i);
    }

  }

  function generateObstacle(index) {
    var obstacle = new Obstacle();
    obstacle.init();
    var posX = parseInt(getRandomArbitrary(0, 3));
    var posY = parseInt(getRandomArbitrary(-1000, -100));
    var overlapStatus = checkOverlap(posX, posY);
    while (overlapStatus == 'true') {
      posY = parseInt(getRandomArbitrary(-1000, -100));
      overlapStatus = checkOverlap(posX, posY);
    }

    obstacle.setPosition(posX, posY);
    obstacle.drawObstacle();
    obstacles.splice(index, 0, obstacle);

  }

  function checkOverlap(posx, posy) {
    posx = renderXvalue(posx);
    if (obstacles.length == 0) {
      return 'false';
    }
    for (var j = 0; j <= obstacles.length; j++) {
      var a = Math.abs(posx - obstacles[j].x);
      var b = Math.abs(posy - obstacles[j].y);

      if (b <= 150) {
        return 'true';
      }
      else
        return 'false';
    }
  }

  function renderXvalue(x) {
    switch (x) {
      case 0: {
        return posLane1;
        break;
      }
      case 1: {
        return posLane2;
        break;
      }
      case 2: {
        return posLane3;
        break;
      }
      default:
        console.log('error in setting x position');
    }
  }

  //----------------------------------------------gameloop start 
  function draw() {
    moveBg();
    moveObstacles();
    checkCollision();
    previewScore();

    this.request = window.requestAnimationFrame(draw);
  }
  this.request = window.requestAnimationFrame(draw);

  //----------------------------------------------gameloop end 

  function moveBg() {
    y -= speed;
    if (y == -480) {
      y = 0;
    }
    gameWrapper.style.bottom = y + 'px';
  }

  function previewScore() {
    scoreBoard.innerHTML = ('Score: ' + score);
  }

  function moveObstacles() {
    for (var k = 0; k < obstacles.length; k++) {
      obstacles[k].y += speedObs;
      obstacles[k].drawObstacle();

      if (obstacles[k].y > 500) {
        obstacles[k].remove();
        obstacles.splice(k, 1);
        score += 1;
        generateObstacle(k);
      }

    }
  }

  function checkCollision() {
    var collisionState = mainCar.checkCollision(obstacles);
    if (collisionState == 'true') {
      gameOver.style.display = 'block';
      obstacles = [];
      window.cancelAnimationFrame(this.request);
    }
  }

  // --------------------------------------------main Car object
  function Car() {
    that = this;
    this.x = 200;
    this.y = 400;
    this.width = 40;
    this.height = 60;


    this.element;

    this.init = function () {
      this.element = document.createElement('div');
      this.element.style.height = this.height + 'px';
      this.element.style.width = this.width + 'px';
      this.element.classList.add('car');
      this.element.style.position = 'absolute';
      this.element.style.backgroundImage = "url('images/main-car.png') ";
      this.element.style.backgroundPosition = 'center bottom';
      this.element.style.zIndex = '50';
      this.element.style.top = this.y + 'px';
      this.element.style.left = this.x + 'px';
      parentElement.appendChild(this.element);
    }


    this.moveCar = function (event) {
      var key = event.keyCode;
      switch (key) {
        case 37:
        case 65: {
          that.x -= progress;
          that.element.style.left = that.x + 'px';
          break;
        }
        case 39:
        case 68: {
          that.x += progress;
          that.element.style.left = that.x + 'px';
          break;
        }
        default:
          console.log('Press a or d');
      }
      if (that.x > posLane3) {
        that.x = posLane3;
        that.element.style.left = that.x + 'px';
      }
      else if (that.x < posLane1) {
        that.x = posLane1;
        that.element.style.left = that.x + 'px';
      }
    }

    this.checkCollision = function (enemy) {
      for (var i = 0; i < enemy.length; i++) {
        if (this.x <= (enemy[i].x + enemy[i].width) && (this.x + this.width) >= enemy[i].x && this.y <= (enemy[i].y + enemy[i].height) && (this.y + this.height) >= enemy[i].y) {
          console.log('collision!!!');
          this.element.style.display = 'none';
          return 'true';
        }
      }
      return false;
    }
    window.addEventListener("keydown", this.moveCar, false);
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  // -----------------------------------------Obstacles object
  function Obstacle() {
    this.x = 3;
    this.y = 100;
    this.height = 60;
    this.width = 40;

    this.elementObs;

    this.init = function () {
      this.elementObs = document.createElement('div');
      this.elementObs.style.height = this.height + 'px';
      this.elementObs.style.width = this.width + 'px';
      this.elementObs.classList.add('obstacle');
      this.elementObs.style.position = 'absolute';
      this.elementObs.style.backgroundImage = "url('images/enemy-2.png') ";
      this.elementObs.style.zIndex = '50';
      this.elementObs.style.backgroundPosition = 'center bottom';
      // this.setPosition(this.x, this.y);
      parentElement.appendChild(this.elementObs);
    }

    this.setPosition = function (x, y) {
      this.y = y;
      switch (x) {
        case 0: {
          this.x = posLane1;
          break;
        }
        case 1: {
          this.x = posLane2;
          break;
        }
        case 2: {
          this.x = posLane3;
          break;
        }
        default:
          console.log('error in setting x position');
      }
    }

    this.drawObstacle = function () {
      this.elementObs.style.left = this.x + 'px';
      this.elementObs.style.top = this.y + 'px';
    }

    this.remove = function () {
      parentElement.removeChild(this.elementObs);
    }

  }

}

