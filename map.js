// DefaultMap = '{"2,6":"brick","2,7":"brick","2,8":"brick","3,8":"brick","4,8":"brick","2,5":"brick","3,5":"brick","3,4":"brick","3,3":"brick","3,2":"brick","3,1":"floor1","3,0":"floor1","5,8":"brick","6,8":"brick","6,9":"brick","6,10":"brick","6,11":"brick","6,12":"path","6,13":"path","6,14":"path","7,12":"path","7,13":"path","7,14":"path","5,12":"path","5,13":"path","5,14":"path","2,1":"floor1","4,1":"floor1","4,0":"floor1","2,0":"floor1","7,8":"brick","8,8":"brick","9,8":"brick","10,8":"brick","11,8":"brick","12,8":"brick","13,8":"brick","14,8":"brick","11,4":"floor1","11,5":"floor1","12,5":"floor1","13,5":"floor1","13,4":"floor1","12,4":"floor1","12,7":"brick","12,6":"brick","11,3":"floor1","12,3":"floor1","13,3":"floor1"}';

Map = function() {
  // this.topLeft = new Point(0,0);
  this.defaultTile = 'grass';
  this.tileHash = {};
  this.currentBrush = 'grass';
  this.currentLayer = 1;
}

Map.prototype = {
  paintTile: function(point) {
    var tile = this.tileHash[point.asString()];
    if (tile) {
      if (typeof(tile) == "object") {
        tile[this.currentLayer] = this.currentBrush;
      } else {
        var newTile = {};
        newTile[1] = tile;
        tile = newTile;
        tile[this.currentLayer] = this.currentBrush;
      }
    } else {
      tile = this.currentBrush;
    }
    this.tileHash[point.asString()] = tile;
  },
  load: function(mapName) {
    var loadmap = mapName + '.map';
    var input;
    if (localStorage)
      input = localStorage[loadmap];
    if (!input && mapName == 'default')
      input = DefaultMap;
    if (input)
      this.tileHash = JSON.parse(input);
    else
      this.tileHash = {};
    console.log('loaded map ' + loadmap);
  },
  save: function(mapName) {
    var savemap = mapName + '.map';
    var out = JSON.stringify(this.tileHash);
    if (console) console.log(out);
    if (localStorage) localStorage[savemap] = out;
    console.log('saved map ' + savemap);
  }
}
