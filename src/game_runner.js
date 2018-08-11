var Game = require("./game");

module.exports = function runGame(random) {
  random = random || Math.random;
  var nobodyWins = false;

  var game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  do {
    game.roll(Math.floor(random() * 6) + 1);

    if (Math.floor(random() * 10) == 7) {
      game.wrongAnswer();
      nobodyWins = true;
    } else {
      game.wasCorrectlyAnswered();
      nobodyWins = game.theCurrentPlayerDidNotWin();
    }
    game.nextPlayer();
  } while (nobodyWins);
};
