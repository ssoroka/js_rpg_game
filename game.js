Game = function() {
  this.TileSize = 54;
  this.ViewportWidth = 15;
  this.ViewportHeight = 15;
  this.AnimationSpeed = 60; // 60 = roughly 16 fps
  this.canvas = document.getElementById("output");
  this.context = this.canvas.getContext("2d");
  this.context.globalAlpha = 0.0;
  this.lastTick = new Date().getTime();
  this.character = new Character(this);
  this.characterPosition = new Point(0, 0);
  this.keyCodes = {
    ctrl: 17, option: 18, command: 224, shift: 16,
    caps: 20, backspace: 8, tab: 9, esc: 27, enter: 13,
    del: 46, home: 36, end: 35, pgUp: 33, pgDown: 34,
    left: 37, up: 38, right: 39, down: 40,
    nul: 0, f13: 44, f14: 145, f15: 19
  }
  this.currentMap = new Map();
};

Game.prototype = {
  draw: function() {
    // reset canvas
    this.canvas.width = this.ViewportWidth * this.TileSize;
    this.canvas.height = this.ViewportHeight * this.TileSize;
    var tile, tilePointStr, ti;
    
    // draw map layer
    for (var i=0; i < this.ViewportWidth; i++) {
      for (var j=0; j < this.ViewportHeight; j++) {
        this.context.fillStyle = this.randColor();
        tilePointStr = (new Point(i, j)).plus(this.characterPosition).asString();
        tile = this.currentMap.tileHash[tilePointStr];
        if (!tile)
          tile = this.currentMap.defaultTile;
          
        if (typeof(tile) == "object") {
          for (var k=1; k <= 2; k++) {
            tk = tile[k];
            if (tk) {
              this.context.drawImage($('#' + tk)[0], i * this.TileSize, j * this.TileSize, this.TileSize, this.TileSize);
            } else {
              break;
            }
          }
        } else {
          this.context.drawImage($('#' + tile)[0], i * this.TileSize, j * this.TileSize, this.TileSize, this.TileSize);
        }

        if (COORDINATES_ON) {
          this.context.font = 'bold 12px sans-serif';
          this.context.fillStyle = 'white';
          this.context.fillText(tilePointStr, (i * this.TileSize), (j * this.TileSize) + this.TileSize / 2);
        }
        if (GRID_ON) {
          this.context.strokeStyle = 'black';
          this.context.strokeRect(i * this.TileSize, j * this.TileSize, this.TileSize, this.TileSize);
        }
        tile = null;
      };
    };

    // draw character layer
    // this.context.drawImage($('#character')[0], this.characterPosition.x * this.TileSize, this.characterPosition.y * this.TileSize, this.TileSize, this.TileSize);
    this.context.drawImage($('#character')[0], 7 * this.TileSize, 7 * this.TileSize, this.TileSize, this.TileSize);

    // draw fog/filter/transition layer 

  },
  run: function() {
    var self = this;
    this.update(new Date().getTime());
    this.draw();
    setTimeout(function() {
      self.run();
    }, this.AnimationSpeed);
  },
  update: function(newTick) {
    var elapsed = newTick - this.lastTick;
    
    
    
    this.lastTick = newTick;
  },
  rand: function(n) {
    return Math.floor(Math.random() * n);
  },
  randColor: function() {
    return "rgb(" + this.rand(0) + "," + this.rand(256) + "," + this.rand(0) + ")";
  },
  viewportPointToMapPoint: function(point) {
    // x, y means x,y on the viewport, which needs to be translated to map x,y.
    // character is always going to be in the middle position: 7,7
    // figure out where top left is relative to character pos (position -7,-7)
    // do some math to figure out the difference between character position in world and map clicked position.
    return this.characterPosition.plus(point);
  },
  listMaps: function() {
    var maps = [];
    for (map in localStorage) {
      if (map.match(/\.map$/))
        maps.push(map);
    }
    alert(maps);
  }
}
