function Player(ctx, assets, game) {
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.game = game;
  this.property = {};
  this.hammerProperty = {};

  this.init = function () {
    that.property = {
      playerWidth: 140,
      playerHeight: 240,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 140,
      sourceHeight: 240,
      canvasX: 100,
      canvasY: 520,
      canvasWidth: 140,
      canvasHeight: 240
    }
    that.hammerProperty = {
      hammerWidth: 60,
      hammerHeight: 260,
      hammerX: (that.property.canvasX + (that.property.playerWidth / 3.2)),
      hammerY: (that.property.canvasY + (that.property.playerHeight / 2))
    }
  }

  this.draw = function () {
    that.ctx.drawImage(that.assets.getImage('player'), that.property.sourceX, that.property.sourceY, that.property.sourceWidth, that.property.sourceHeight, that.property.canvasX, that.property.canvasY, that.property.canvasWidth, that.property.canvasHeight);
  }

  this.drawHammer = function () {
    that.ctx.drawImage(that.assets.getImage('hammer'), that.hammerProperty.hammerX, that.hammerProperty.hammerY);
  }

  this.init();
}

