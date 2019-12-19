var gameState = {};
function Game(assets) {
  this.assets = assets;
  var that = this;
  this.canvas;
  this.ctx;
  this.player;
  this.animationFrame;
  this.map;
  this.detectCollision;
  this.camera;
  this.baseCollision = false;

  this.init = function () {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.camera = new Camera(this.ctx);
    this.player = new Player(this.ctx, this.assets, this.camera);
    this.map = new Map(this.ctx, this.assets);
    this.detectCollision = new DetectCollision(that.ctx, that.map);

    this.gameState = {
      //should the hammer be moved
      moveHammer: false,
      //should the player be moved
      movePlayer: false,
      //has the player collided
      playerCollision: false,
      //has the hammer collided
      hammerCollision: false,
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
      map: {
        x: 0,
        y: -800
      }
    }

    this.addMouseEvent();
    this.gameLoop();
  }

  this.gameLoop = function () {
    that.ctx.clearRect(0, 0, canvas.width, canvas.height);
    that.drawMap();
    that.adjustMap();
    that.drawPlayer();
    that.movePlayer();


    that.animationFrame = requestAnimationFrame(that.gameLoop);
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
    that.player.drawHammer();
    that.collisionDetection();
    this.checkHammer();
  }

  this.collisionDetection = function () {
    // if (!that.player.movementFlag) {
    //   console.log('checking hammer collision');
    //   that.player.saveInitialHammerState();
    that.player.hammerBaseCollision = this.detectCollision.hammerBaseCollision(that.player.hammerProperty);
    if (that.player.hammerBaseCollision) {
      // that.player.hammerBaseCollision = false;
      that.player.movementFlag = true;
    }
    // } else {
    console.log('checking player collision');
    that.player.saveInitialPlayerState();
    that.player.playerBaseCollision = this.detectCollision.playerBaseCollision(that.player.property);
    if (that.player.playerBaseCollision) {
      // that.player.playerBaseCollision = false;
      that.player.movementFlag = false;
    }
    // }
  }

  this.checkHammer = function () {
    // console.log(that.player.movementFlag, that.player.initialHammerCollision, that.player.hammerBaseCollision);
    // if (that.player.movementFlag) {
    if (that.player.hammerBaseCollision && that.player.playerBaseCollision) {
      that.player.currentHammer = 1;
    }
    if (that.player.hammerBaseCollision) {
      that.player.currentHammer = 1;
    }
    else if (that.player.playerBaseCollision) {
      that.player.currentHammer = 0;
    }
  }

  this.adjustMap = function () {
    if (!that.player.movementFlag) {
      if (that.player.property.x > that.ctx.canvas.width * 0.6) {
        that.map.mapProperty.x -= 5;
        that.player.property.x -= 5;
        that.player.hammerCollisionProperty.endX -= 5;
        that.player.hammerProperty.x -= 5;
      }
      that.map.draw();
    }
  }

  this.mouseMovement = function (event) {
    var offset = canvas.getBoundingClientRect();
    var dx = event.clientX - (that.player.hammerProperty.x) - (1.2 * offset.left);
    var dy = event.clientY - (that.player.hammerProperty.y);
    that.player.angle = Math.atan2(dy, dx);
  }

  this.init();
}
