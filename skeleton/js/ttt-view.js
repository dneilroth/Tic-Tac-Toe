var Game = require("../../ttt-core-solution/game.js");

var View = function (game, $el) {
  this.$el = $el;
  this.game = game;
  this.setupBoard();
  this.bindEvents();

};

View.prototype.bindEvents = function () {
  var that = this;
  this.$el.on("click", function(event) {
    try {
      var $li = $(event.target);
      var pos = View.gridify($li.data("id"));
      $li.text(that.game.currentPlayer);
      that.game.playMove(pos);
      $li.attr("style", "background: white");
      if (that.game.isOver()) {
        alert(that.game.winner() + " wins");
        that.setupBoard();
      }
    }
    catch(MoveError) {
      alert("not valid move!");
    }
  });
};

View.prototype.makeMove = function ($square) {
};

View.prototype.setupBoard = function () {
  this.game = new Game();
  this.$el.children().remove();
  var $ul = $("<ul>");
  var counter = 0;
  this.$el.append($ul);
  _(9).times(function(){
    var $li = $("<li></li>");
    $li.data("id", counter);
    $ul.append($li);
    counter += 1;
  });
};

View.gridify = function (num) {
  var col = num % 3;
  var row = Math.floor(num / 3);
  return [row, col];
};

module.exports = View;
