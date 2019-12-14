function Hammer(ctx, assets) {
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.hammerProperty = {}

  this.init = function () {
    that.hammerProperty = {
      hammerWidth: 60,
      hammerHeight: 260,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 60,
      sourceHeight: 260,
      canvasX: 150,
      canvasY: 640,
      canvasWidth: 60,
      canvasHeight: 260
    }
  }

  this.drawHammer = function () {
    that.ctx.drawImage(that.assets.getImage('hammer'), that.hammerProperty.sourceX, that.hammerProperty.sourceY, that.hammerProperty.sourceWidth, that.hammerProperty.sourceHeight, that.hammerProperty.canvasX, that.hammerProperty.canvasY, that.hammerProperty.canvasWidth, that.hammerProperty.canvasHeight);
  }

  this.init();

}