function DetectCollision(ctx, map) {
  var that = this;
  this.ctx = ctx;
  this.map = map;

  this.hammerBaseCollision = function (hammerProperty) {
    var tileX = Math.round(hammerProperty.endX / TILE_SIZE);
    var tileY = Math.round((hammerProperty.endY + 800) / TILE_SIZE);
    // console.log(tileX, tileY);
    for (var row = 0; row < that.map.totalTileRow; row++) {
      for (var col = 0; col < that.map.totalTileColumn; col++) {
        if (that.map.mapArray[tileY][tileX] === 1) {
          console.log('hammer collided!!!');
          return true;
        }
      }
    }
    return false;
  }

  this.playerBaseCollision = function (playerProperty) {
    var playerTileX = Math.round(playerProperty.bottom.x / TILE_SIZE);
    var playerTileY = Math.round((playerProperty.bottom.y + 800) / TILE_SIZE);

    for (var row = 0; row < that.map.totalTileRow; row++) {
      for (var col = 0; col < that.map.totalTileColumn; col++) {
        // console.log(playerTileX, playerTileY);
        if (that.map.mapArray[playerTileY][playerTileX] === 1) {
          console.log('player bottom collided!!!');
          return true;
        }
      }
    }
    return false;
  }

}