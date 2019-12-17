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

  this.init = function () {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.player = new Player(this.ctx, this.assets);
    this.map = new Map(this.ctx, this.assets);
    this.detectCollision = new DetectCollision();

    this.addMouseEvent();
    this.gameLoop();
  }

  this.gameLoop = function () {
    that.ctx.clearRect(0, 0, canvas.width, canvas.height);

    that.drawMap();
    that.drawPlayer();
    that.movePlayer();

    that.animationFrame = requestAnimationFrame(that.gameLoop);
  }

  this.drawPlayer = function () {
    this.player.drawPlayer();
  }

  this.drawMap = function () {
    this.map.drawBase();
  }

  this.addMouseEvent = function () {
    document.addEventListener('mousemove', this.mouseMovement);
  }

  this.movePlayer = function () {
    that.player.drawHammer();
    that.hammerBaseCollision();
    this.checkHammer();
  }

  this.hammerBaseCollision = function () {

    that.player.hammerBaseCollision = this.detectCollision.hammerBaseCollision(that.player.hammerProperty, that.map.baseProperty);
    that.player.hammer2Collision = this.detectCollision.hammer2Collision(that.player, that.map.baseProperty);
    that.player.playerBaseCollision = this.detectCollision.playerBaseCollision(that.player.property, that.map.baseProperty);

  }

  this.checkHammer = function () {

    if (that.player.hammer2Collision && that.player.playerBaseCollision) {
      that.player.currentHammer = 0;
    } else if (that.player.hammerBaseCollision) {
      that.player.currentHammer = 1;
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
