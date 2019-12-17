function Map(ctx, assets) {
  var that = this;
  this.ctx = ctx;
  this.assets = assets;

  this.mapProperty = {};
  this.baseProperty = {};

  this.init = function () {
    that.mapProperty = {
      mapWidth: 5000,
      mapHeight: 3000
    }
    that.baseProperty = {
      height: 50,
      width: 5000,
      x: 0,
      y: 750
    }
  }

  this.drawBase = function () {
    var base = that.ctx.createPattern(that.assets.getImage('base'), 'repeat-x');
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.translate(that.baseProperty.x, that.baseProperty.y);
    that.ctx.rect(0, 0, that.baseProperty.width, that.baseProperty.height);
    that.ctx.fillStyle = base;
    that.ctx.fill();
    that.ctx.closePath();
    that.ctx.restore();
  }

  this.init();
}