Character = function(game) {
  this.steps = 0;
  this.game = game;
}

Character.prototype = {
  moveRight: function() {
    this.game.characterPosition.x += 1;
    this.steps += 1;
  },
  moveLeft: function() {
    this.game.characterPosition.x -= 1;
    this.steps += 1;
  },
  moveUp: function() {
    this.game.characterPosition.y -= 1;
    this.steps += 1;
  },
  moveDown: function() {
    this.game.characterPosition.y += 1;
    this.steps += 1;
  }
  
}
