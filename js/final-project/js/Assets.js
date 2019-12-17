var assets;

function Assets() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var that = this;
  this.images = [];
  this.imagesLoaded = 0;


  this.init = function () {
    this.loadImage('player', './images/player.png');
    this.loadImage('hammer', './images/hammer.png');
    this.loadImage('base', './images/base.png');
    this.loadImage('hammer-reverse','./images/hammer-reverse.png');




    this.loadInterval = setInterval(function () {
      clearInterval(that.loadInterval);
      new Game(assets);
    }, 2000);
  }

  this.loadImage = function (filename, source) {
    var image = new Image();
    image.src = source;
    image.onload = function () {
      that.imagesLoaded += 1;
    }
    that.images[filename] = image;
  }

  this.getImage = function (filename) {
    return that.images[filename];
  }
  this.init();
}

window.onload = function () {
  assets = new Assets();
}
