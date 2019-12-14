function Game(assets) {
  this.assets = assets;
  var that = this;
  this.canvas;
  this.ctx;
  this.player;

  this.init = function () {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.player = new Player(this.ctx, this.assets, that);
    this.hammer = new Hammer(this.ctx, this.assets);

    this.drawPlayer();
  }

  this.drawPlayer = function () {
    this.player.draw();
    this.player.drawHammer();
  }

  this.init();
}
