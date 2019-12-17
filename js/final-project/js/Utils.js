function Utils() {
  this.toDegree = function (radian) {
    return radian * (180 / Math.PI);
  }

  this.toRadian = function (degree) {
    return degree * (Math.PI / 180);
  }
}



