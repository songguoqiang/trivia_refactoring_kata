var Game = require("./game");

var nobodyWins = false;

var game = new Game();

game.add("Chet");
game.add("Pat");
game.add("Sue");

do {
  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) == 7) {
    nobodyWins = game.wrongAnswer();
  } else {
    nobodyWins = game.wasCorrectlyAnswered();
  }
} while (nobodyWins);
