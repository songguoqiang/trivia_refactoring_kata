var Game = require("./game");

module.exports = function GameRunner(random) {
  random = random || Math.random;
  var nobodyWins = false;

  var game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  do {
    game.roll(Math.floor(random() * 6) + 1);

    if (Math.floor(random() * 10) == 7) {
      nobodyWins = game.wrongAnswer();
    } else {
      nobodyWins = game.wasCorrectlyAnswered();
    }
    game.nextPlayer();
  } while (nobodyWins);
};
