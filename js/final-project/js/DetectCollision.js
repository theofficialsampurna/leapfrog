var gameOver = false;
function DetectCollision(ctx, map) {
  var that = this;
  this.ctx = ctx;
  this.map = map;

  this.hammerBaseCollision = function () {
    var tileX = Math.round((gameState.firstHammer.endX + mapOffset.x) / TILE_SIZE);
    var tileY = Math.round((gameState.firstHammer.endY + mapOffset.y) / TILE_SIZE);
    // console.log(tileX, tileY);
    if (tileX > 350) {
      gameOver = true;
    }
    for (var row = 0; row < that.map.totalTileRow; row++) {
      for (var col = 0; col < that.map.totalTileColumn; col++) {
        if (that.map.mapArray[tileY][tileX] === 1) {
          // console.log('hammer collided!!!');
          return true;
        }
      }
    }
    return false;
  }

  this.playerBaseCollision = function () {
    var playerTileX = Math.round((gameState.player.bottom.x + mapOffset.x) / TILE_SIZE);
    var playerTileY = Math.round((gameState.player.bottom.y + mapOffset.y) / TILE_SIZE);

    for (var row = 0; row < that.map.totalTileRow; row++) {
      for (var col = 0; col < that.map.totalTileColumn; col++) {
        // console.log(playerTileX, playerTileY);
        if (that.map.mapArray[playerTileY][playerTileX] === 1) {
          // console.log('player bottom collided!!!');
          return true;
        }
      }
    }
    return false;
  }

}