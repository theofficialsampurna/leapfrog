; (function () {
  function Box(parentElement) {
    this.x = 10;
    this.y = 10;
    this.speedX = getRandomArbitrary(1, 2);
    this.speedY = getRandomArbitrary(1, 2);
    this.dX = getRandomArbitrary(1, 5);
    this.dY = getRandomArbitrary(1, 5);
    this.width = 20;
    this.height = 20;
    this.element = null;
    this.parentElement = parentElement;

    this.init = function () {
      var box = document.createElement('div');
      box.style.height = this.height + 'px';
      box.style.width = this.width + 'px';
      box.style.background = "url('images/bug.png')";
      box.style.backgroundSize = 'cover';
      box.classList.add('box');
      this.parentElement.appendChild(box);
      this.element = box;
      // this.element.onClick = this.boxClicked.bind(this);
      this.element.addEventListener('click', this.boxClicked.bind(this));
      this.draw();
      return this;
    }

    this.draw = function () {
      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
    }

    this.boxClicked = function () {
      console.log('boxClicked', this.width);
      this.element.style.display = 'none';
    }

    this.setPosition = function (x, y) {
      this.x = x;
      this.y = y;
    }

    this.move = function () {
      if (this.x < 0 || this.x > 480) { // condition for outer boundary
        this.dX = -this.dX;
      }
      if (this.y < 0 || this.y > 480) {
        this.dY = - this.dY;
      }
      this.x += (this.dX * this.speedX);
      this.y += (this.dY * this.speedY);
      this.draw();
    }

    this.checkCollision = function (boxes) {
      for (var i = 0; i < boxes.length; i++) {
        if (this.x <= (boxes[i].x + boxes[i].width) && (this.x + this.width) >= boxes[i].x && this.y <= (boxes[i].y + boxes[i].height) && (this.y + this.height) >= boxes[i].y) {
          this.dX = -this.dX;
          this.dY = - this.dY;
          boxes[i].dX = -boxes[i].dX;
          boxes[i].dY = -boxes[i].dY;
        }
      }
      return false;
    }
  }

  var parentElement = document.getElementById('app');
  parentElement.classList.add('app');
  new Game(parentElement, 10).startGame();

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Game(parentElement, boxCount) {
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 10;
    var boxes = [];
    var positionsX = [];
    var positionsY = [];

    this.startGame = function () {
      for (var i = 0; i < this.boxCount; i++) {
        var box = new Box(parentElement).init();
        var posX = parseInt(getRandomArbitrary(0, (MAX_WIDTH - 20)));
        var posY = parseInt(getRandomArbitrary(0, (MAX_HEIGHT - 20)));
        var boxOverlap = this.checkPosition(posX, posY);
        if (boxOverlap == 'false') {
          box.setPosition(posX, posY);
          box.draw();
          positionsX.push(posX);
          positionsY.push(posY);
          boxes.push(box);
        }
        else {
          i--;
        }
      }

      setInterval(this.moveBoxes.bind(this), 20);
    }

    this.checkPosition = function (posX, posY) {
      if ((positionsX.length == 0) || (posX == 'undefined') || (posY == 'undefined')) {
        return 'false';
      }
      else {
        for (var i = 0; i < positionsX.length; i++) {
          if (((posX >= (positionsX[i] - 20)) && (posX <= (positionsX[i] + 20))) && ((posY >= (positionsY[i] - 20)) && (posY <= (positionsY[i] + 20)))) {
            return 'true';
          }
          else
            var overlapStatus = 'false';
        }
      }

      return overlapStatus;
    }

    this.moveBoxes = function () {
      for (var i = 0; i < this.boxCount; i++) {
        boxes[i].move();
        boxes[i].checkCollision(boxes);
      }
    }
  }

})();