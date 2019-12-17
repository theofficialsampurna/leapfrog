function DetectCollision(ctx) {
  var that = this;
  this.ctx = ctx;

  this.hammerBaseCollision = function (hammerProperty, baseProperty) {
    // if ((player.property.canvasX + player.hammerProperty.x) <= (baseProperty.x + baseProperty.width) && (player.property.canvasX + player.hammerProperty.x + player.hammerProperty.width) >= baseProperty.x && (player.property.canvasY + player.hammerProperty.y) <= (baseProperty.y + baseProperty.height) && (player.property.canvasY + player.hammerProperty.y + player.hammerProperty.height) >= baseProperty.y) {
    //   console.log('collision: hammer with base !!!');
    // }
    if (hammerProperty.endY >= baseProperty.y) {
      console.log('collision: hammer with base !!!');
      return true;
    }
    return false;
  }

  this.playerBaseCollision = function (playerProperty, baseProperty) {
    if ((playerProperty.y + playerProperty.playerHeight) >= baseProperty.y) {
      console.log('collision: player with base !!!');
      return true;
    }
    return false;
  }

  this.hammer2Collision = function (player, baseProperty) {
    if (player.angle >= 2.35 || player.angle <= 0.79) {
      console.log('collision: hammer2 with base !!!');
      return true;
    }
    return false;
  }
}