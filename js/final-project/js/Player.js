function Player(ctx, assets ) {
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.property = {};
  this.hammerProperty = {};
  this.hammerCollisionProperty = {};
  this.angle = 0;
  this.utils = new Utils();
  this.hammerBaseCollision = false;
  this.hammer2Collision = false;
  this.playerBaseCollision = false;
  this.playerImage;
  this.hammerImage;
  this.hammerReverse;
  this.pointOfRotation = {};
  this.currentHammer = 'first';
  this.jumpDist = 5;
  this.gravity = 1;
  this.speed = 2;
 
  this.movementFlag = false;
  this.initialHammerCollision = false;
  this.initialPlayerCollision = false;
  this.liftPlayer = false;

  this.init = function () {
    that.property = {
      playerWidth: 70,
      playerHeight: 140,
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
    }
    that.hammerProperty = {
      width: 140,
      height: 28,
      x: 185,
      y: 630,
      endX: 325,
      endY: 644
    }
    that.hammerCollisionProperty = {
      width: 140,
      height: 28,
      x: 0,
      y: 0,
      endX: 185,
      endY: 630
    }
    that.playerImage = that.ctx.createPattern(that.assets.getImage('player'), 'no-repeat');
    that.hammerImage = that.ctx.createPattern(that.assets.getImage('hammer'), 'no-repeat');
    that.hammerReverse = that.ctx.createPattern(that.assets.getImage('hammer-reverse'), 'no-repeat');

  }

  this.drawPlayer = function () {
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.translate(gameState.player.x, gameState.player.y);
    that.ctx.rect(0, 0, that.property.playerWidth, that.property.playerHeight);
    that.ctx.fillStyle = that.playerImage;
    that.ctx.fill();
    that.ctx.closePath();
    that.ctx.restore();

    this.moveHammer();
  }

  this.moveHammer = function () {
    that.ctx.save();
    that.ctx.beginPath();
    if (that.currentHammer === 'first') {
      that.ctx.translate(gameState.firstHammer.x, gameState.firstHammer.y);
      that.ctx.rotate(that.angle);
      this.getHammerEndpoints();
      that.ctx.rect(0, 0, that.hammerProperty.width, that.hammerProperty.height);
      that.ctx.fillStyle = that.hammerImage;
      that.ctx.fill();
    }
    else if (that.currentHammer === 'second') {
      that.ctx.translate(gameState.secondHammer.x, gameState.secondHammer.y);
      that.ctx.rotate(3.14 + that.angle);
      that.ctx.rect(0, 0, that.hammerProperty.width, that.hammerProperty.height);
      that.ctx.fillStyle = that.hammerReverse;
      that.ctx.fill();

      this.movePlayerModel();
    }
    this.updateHammerPositions();

    that.ctx.closePath();
    that.ctx.restore();
  }

  this.getHammerEndpoints = function () {
    that.hammerProperty.endX = (that.hammerProperty.x) + that.hammerProperty.width * Math.cos(that.angle);
    that.hammerProperty.endY = (that.hammerProperty.y) + that.hammerProperty.width * Math.sin(that.angle);
  }

  this.getHammerInitialpoints = function () {
    that.hammerCollisionProperty.endX = (that.hammerCollisionProperty.x) - that.hammerProperty.width * Math.cos(that.angle);
    that.hammerCollisionProperty.endY = (that.hammerCollisionProperty.y) - that.hammerProperty.width * Math.sin(that.angle);
  }

  this.movePlayerModel = function () {
    this.getHammerInitialpoints();
    that.property.x = that.hammerCollisionProperty.endX - 45;
    that.property.y = that.hammerCollisionProperty.endY - 85;
    camera.x = that.property.x;
    this.updatePlayerCollisionPoints();
  }

  this.updateHammerPositions = function () {
    that.hammerProperty.x = that.hammerCollisionProperty.endX;
    that.hammerProperty.y = that.hammerCollisionProperty.endY;
    that.hammerCollisionProperty.x = that.hammerProperty.endX;
    that.hammerCollisionProperty.y = that.hammerProperty.endY;
  }

  this.updatePlayerCollisionPoints = function () {
    that.property.top.x = that.property.x + (that.property.playerWidth / 2);
    that.property.top.y = that.property.y;
    that.property.bottom.x = that.property.x + (that.property.playerWidth / 2);
    that.property.bottom.y = that.property.y + that.property.playerHeight;
    that.property.left.x = that.property.x;
    that.property.left.y = that.property.y + (that.property.playerHeight / 2);
    that.property.right.x = that.property.x + that.property.playerWidth;
    that.property.right.y = that.property.y + (that.property.playerHeight / 2);
  }

  // this.toggleHammerCollision = function () {
  //   if (that.hammerBaseCollision) {
  //     that.hammerBaseCollision = false;
  //   } else {
  //     that.hammerBaseCollision = true;
  //   }
  // }

  // this.toggleHammerCollision = function () {
  //   if (that.playerBaseCollision) {
  //     that.playerBaseCollision = false;
  //   } else {
  //     that.playerBaseCollision = true;
  //   }
  // }

  this.init();
}

