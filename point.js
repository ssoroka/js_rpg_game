Point = function(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype = {
  asString: function() {
    return "" + this.x + "," + this.y;
  },
  plus: function(point) {
    return new Point(this.x + point.x, this.y + point.y);
  },
  minus: function(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }
}
