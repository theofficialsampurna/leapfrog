function Player(ctx, assets) {
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.property = {};
  this.hammerProperty = {};
  this.hammerCollisionProperty = {};
  this.angle;
  this.utils = new Utils();
  this.hammerBaseCollision = false;
  this.hammer2Collision = false;
  this.playerBaseCollision = false;
  this.playerImage;
  this.hammerImage;
  this.hammerReverse;
  this.pointOfRotation = {};
  this.currentHammer = 0;

  this.init = function () {
    that.property = {
      playerWidth: 140,
      playerHeight: 240,
      x: 600,
      y: 510
    }
    that.hammerProperty = {
      width: 260,
      height: 60,
      x: 645,
      y: 600,
      endX: 0,
      endY: 0
    }
    that.hammerCollisionProperty = {
      width: 260,
      height: 60,
      x: 0,
      y: 0,
      endX: 645,
      endY: 600
    }
    that.pointOfRotation = {
      x: 0,
      y: 0
    }
    that.playerImage = that.ctx.createPattern(that.assets.getImage('player'), 'no-repeat');
    that.hammerImage = that.ctx.createPattern(that.assets.getImage('hammer'), 'no-repeat');
    that.hammerReverse = that.ctx.createPattern(that.assets.getImage('hammer-reverse'), 'no-repeat');
  }

  this.drawPlayer = function () {
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.translate(that.property.x, that.property.y);
    that.ctx.rect(0, 0, that.property.playerWidth, that.property.playerHeight);
    that.ctx.fillStyle = that.playerImage;
    that.ctx.fill();
    that.ctx.closePath();
    that.ctx.restore();
  }


  this.drawHammer = function () {
    that.ctx.save();
    that.ctx.beginPath();

    if (that.currentHammer === 0) {




      that.ctx.translate(that.hammerProperty.x, that.hammerProperty.y);
      that.ctx.rotate(that.angle);
      // console.log(that.angle);
      this.getHammerEndpoints();
      that.ctx.rect(0, 0, that.hammerProperty.width, that.hammerProperty.height);
      that.ctx.fillStyle = that.hammerImage;
      that.ctx.fill();
    }
    else if (that.currentHammer === 1) {
      // that.currentHammer = 1;

      that.ctx.translate(that.hammerCollisionProperty.x, that.hammerCollisionProperty.y);
      that.ctx.rotate(3.14 + that.angle);
      // console.log(that.angle);
      that.ctx.rect(0, 0, that.hammerProperty.width, that.hammerProperty.height);
      that.ctx.fillStyle = that.hammerReverse;
      that.ctx.fill();

      this.movePlayerModel();
    }

    this.updateHammerPositions();

    that.ctx.closePath();
    that.ctx.restore();
    console.log(that.angle);
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
    // console.log(that.hammerCollisionProperty.endX, that.hammerCollisionProperty.endY);
    that.property.x = that.hammerCollisionProperty.endX - 45;
    that.property.y = that.hammerCollisionProperty.endY - 85;
    this.checkPlayerPosition();
  }

  this.updateHammerPositions = function () {
    that.hammerProperty.x = that.hammerCollisionProperty.endX;
    that.hammerProperty.y = that.hammerCollisionProperty.endY;
    that.hammerCollisionProperty.x = that.hammerProperty.endX;
    that.hammerCollisionProperty.y = that.hammerProperty.endY;
  }

  this.checkPlayerPosition = function () {
    if (that.property.y > 510) {
      that.property.y = 510;
    }
    if (that.hammerProperty.y > 600) {
      that.hammerProperty.y = 600;
    }
    if (that.hammerCollisionProperty.endY > 600) {
      that.hammerCollisionProperty.endY = 600;
    }
  }

  this.init();
}

