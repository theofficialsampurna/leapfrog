var parentElement = document.getElementById('app');
var road1 = new roadFighter(parentElement);
road1.gameInit();

function roadFighter(parentElement) {
  var MAX_WIDTH = 440;
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
  var obstaclesNo = 10;
  var speedObs = 3;


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

    var mainCar = new Car();
    mainCar.init();
    for (var i = 0; i < obstaclesNo; i++) {
      generateObstacles(i);
      // var obstacleOverlap = generateObstacles(i);
      // if (obstacleOverlap == 'true')
      //   i--;
    }

  }

  function generateObstacles(i) {
    var obstacle = new Obstacles();
    obstacle.init();
    var posX = parseInt(getRandomArbitrary(0, 3));
    var posY = parseInt(getRandomArbitrary(-1000, -100));
    // var obstacleOverlap = checkPosition(posX, posY);
    // if (obstacleOverlap == 'false') {
      obstacle.setPosition(posX, posY);
      obstacle.drawObstacle();
      obstacles.splice(i, 0, obstacle);
    // }
    // return obstacleOverlap;
  }

  function checkPosition(posX, posY) {
    if ((obstacles.length == 0) || (posX == 'undefined') || (posY == 'undefined')) {
      return 'false';
    }
    else {
      posX = renderXvalue(posX);
      for (var i = 0; i < obstacles.length; i++) {
        if (((posX >= (obstacles[i].x - 60)) && (posX <= (obstacles[i].x + 60))) && ((posY >= (obstacles[i].y - 120)) && (posY <= (obstacles[i].y + 120)))) {
          return 'true';
        }
        else
          var overlapStatus = 'false';
      }
    }
    return overlapStatus;

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

  //gameloop start //
  function draw() {
    moveBg();
    moveObstacles();

    window.requestAnimationFrame(draw);
  }

  window.requestAnimationFrame(draw);
  //gameloop end //

  function moveBg() {
    y -= speed;
    if (y == -480) {
      y = 0;
    }
    gameWrapper.style.bottom = y + 'px';
  }

  function moveObstacles() {
    for (var i = 0; i < obstaclesNo; i++) {
      obstacles[i].y += speedObs;
      obstacles[i].drawObstacle();

      if (obstacles[i].y > 500) {
        obstacles.splice(i, 1);
        generateObstacles(i);
      }
      console.log(obstacles);
    }
  }

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

    window.addEventListener("keydown", this.moveCar, false);
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Obstacles() {
    this.x = 3;
    this.y = 100;
    this.height = 60;
    this.width = 40;

    this.elementObs;

    this.init = function () {
      this.elementObs = document.createElement('div');
      this.elementObs.style.height = this.height + 'px';
      this.elementObs.style.width = this.width + 'px';
      this.elementObs.classList.add('obstacles');
      this.elementObs.style.position = 'absolute';
      this.elementObs.style.backgroundImage = "url('images/enemy-2.png') ";
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

  }

}

