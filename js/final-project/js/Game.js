var gameState = {};
var prevGameState = {};
var nextGameState = {};
var whoWillMoveNext = 'hammer';


function Game(assets) {
  this.assets = assets;
  var that = this;
  this.canvas;
  this.ctx;
  this.player;
  this.animationFrame;
  this.map;
  this.detectCollision;
  this.baseCollision = false;
  this.key = {
    W: false,
    A: false,
    S: true,
    D: false,
    Space: false
  };

  this.init = function () {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.player = new Player(this.ctx, this.assets);
    this.map = new Map(this.ctx, this.assets);
    this.detectCollision = new DetectCollision(that.ctx, that.map);
    this.addButtonListeners();
    gameOver = false;

    gameState = {
      hasHammerCollided: false,
      hasPlayerCollided: true,
      player: {
        x: 150,
        y: 580,
        top: {
          x: 185,
          y: 580
        },
        bottom: {
          x: 185,
          y: 720
        },
        left: {
          x: 150,
          y: 650
        },
        right: {
          x: 220,
          y: 650
        }
      },
      firstHammer: {
        x: 185,
        y: 630,
        endX: 325,
        endY: 644
      },
      secondHammer: {
        x: 325,
        y: 644,
        endX: 185,
        endY: 630
      },
      hands: {
        x: 140,
        y: 620
      }
    }

    this.addMouseEvent();
    this.gameLoop();
  }

  this.gameLoop = function () {
    that.ctx.clearRect(0, 0, canvas.width, canvas.height);
    that.plot(gameState);

    if (!gameOver) {
      that.animationFrame = requestAnimationFrame(that.gameLoop);
    } else {
      cancelAnimationFrame(that.animationFrame);
      var congrats = that.ctx.createPattern(that.assets.getImage('congrats'), 'no-repeat');
      that.ctx.save();
      that.ctx.beginPath();
      that.ctx.translate(0, 0);
      that.ctx.rect(0, 0, 1600, 800);
      that.ctx.fillStyle = congrats;
      that.ctx.fill();
      that.ctx.closePath();
      that.ctx.restore();
    }
  }

  this.plot = function () {
    that.drawMap();
    that.drawPlayer();
  }

  this.drawPlayer = function () {
    this.player.drawPlayer();
  }

  this.drawMap = function () {
    this.map.draw();
  }

  this.addMouseEvent = function () {
    document.addEventListener('mousemove', this.mouseMovement);
  }

  this.movePlayer = function () {
    that.player.moveHammer();
    that.collisionDetection();
    this.checkHammer();
  }

  this.collisionDetection = function () {

    gameState.hasHammerCollided = this.detectCollision.hammerBaseCollision();
    gameState.hasPlayerCollided = this.detectCollision.playerBaseCollision();

    if (gameState.hasHammerCollided && gameState.hasPlayerCollided) {
      if (!prevGameState.hasHammerCollided && gameState.hasHammerCollided) {
        gameState.firstHammer.y -= 5;
        whoWillMoveNext = 'player';
      } else if (!prevGameState.hasPlayerCollided && gameState.hasPlayerCollided) {
        gameState.player.y -= 5;
        whoWillMoveNext = 'hammer';
      }
    } else if (gameState.hasHammerCollided & !gameState.hasPlayerCollided) {
      whoWillMoveNext = 'player';
    } else if (gameState.hasPlayerCollided && !gameState.hasHammerCollided) {
      whoWillMoveNext = 'hammer';
    }
  }

  this.checkHammer = function () {
    if (whoWillMoveNext === 'hammer') {
      that.player.currentHammer = 'first';
    } else if (whoWillMoveNext === 'player') {
      that.player.currentHammer = 'second';
    }
  }

  this.mouseMovement = function (event) {
    if (!gameOver) {
      var offset = canvas.getBoundingClientRect();
      var dx = event.clientX - (that.player.hammerProperty.x) - (1.2 * offset.left);
      var dy = event.clientY - (that.player.hammerProperty.y);
      that.player.angle = Math.atan2(dy, dx);

      that.movePlayer();
      that.updateGameState();
    }
  }

  this.updateGameState = function () {
    this.calculateNextState();
    if (nextGameState != gameState) {
      prevGameState = gameState;
      gameState = nextGameState;
    }
  }

  this.calculateNextState = function () {
    nextGameState = {
      player: {
        x: that.player.property.x,
        y: that.player.property.y,
        top: {
          x: that.player.property.top.x,
          y: that.player.property.top.y
        },
        bottom: {
          x: that.player.property.bottom.x,
          y: that.player.property.bottom.y
        },
        left: {
          x: that.player.property.left.x,
          y: that.player.property.left.y
        },
        right: {
          x: that.player.property.right.x,
          y: that.player.property.right.y
        }
      },
      firstHammer: {
        x: that.player.hammerProperty.x,
        y: that.player.hammerProperty.y,
        endX: that.player.hammerProperty.endX,
        endY: that.player.hammerProperty.endY
      },
      secondHammer: {
        x: that.player.hammerCollisionProperty.x,
        y: that.player.hammerCollisionProperty.y,
        endX: that.player.hammerCollisionProperty.endX,
        endY: that.player.hammerCollisionProperty.endY
      },
      hands: {
        x: that.player.handsProperty.x,
        y: that.player.handsProperty.y
      }
    }

  }

  this.toggleWhoWillMoveNext = function () {
    if (whoWillMoveNext === 'hammer') {
      whoWillMoveNext = 'player';
    } else if (whoWillMoveNext === 'player') {
      whoWillMoveNext = 'hammer';
    }
  }

  this.addButtonListeners = function () {
    document.addEventListener('keydown', this.keyPressed);
    document.addEventListener('keyup', this.keyReleased);
  }

  this.keyPressed = function (event) {
    switch (event.keyCode) {
      case 87:
        // that.cameraTop();
        break;
      case 83:
        // that.cameraBottom();
        break;
      case 65:
        that.cameraLeft();
        break;
      case 68:
        that.cameraRight();
        break;
      case 32:
        that.reloadGame();
        break;
    }
  }


  this.cameraLeft = function () {
    // if (that.map.mapProperty.x < 4000) {
    that.map.mapProperty.x -= 10;
    that.player.property.x -= 10;
    that.player.hammerProperty.x -= 10;
    that.player.hammerCollisionProperty.endX -= 10;
    that.player.handsProperty.x -= 10;
    mapOffset.x += 10;
    // }
  }

  this.cameraRight = function () {
    if (that.map.mapProperty.x < 0) {
      that.map.mapProperty.x += 10;
      that.player.property.x += 10;
      that.player.hammerProperty.x += 10;
      that.player.hammerCollisionProperty.endX += 10;
      that.player.handsProperty.x += 10;
      mapOffset.x -= 10;
    }
  }

  this.cameraTop = function () {
    if (that.map.mapProperty.y < -800) {
      that.map.mapProperty.y -= 5;
      that.player.property.y -= 5;
      that.player.hammerProperty.y -= 5;
      that.player.hammerCollisionProperty.endY -= 5;
      mapOffset.y += 5;
    }
  }

  this.cameraBottom = function () {
    that.map.mapProperty.y += 5;
    that.player.property.y += 5;
    that.player.hammerProperty.y += 5;
    that.player.hammerCollisionProperty.endY += 5;
    mapOffset.y -= 5;
  }

  this.reloadGame = function () {
    if (gameOver) {
      window.location.reload();
    }
  }

  this.init();
}
