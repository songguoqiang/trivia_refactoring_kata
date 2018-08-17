var Game = require("./game");

// This function is almost same as the original version in
// the kata, except that we introduce a new parameter here
// to control the random number generator, so that we can
// repeatedly generate same test cases.
module.exports = function runGame(random) {
  random = random || Math.random;
  var noWinner = false;

  var game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  do {
    game.roll(Math.floor(random() * 6) + 1);

    if (Math.floor(random() * 10) == 7) {
      noWinner = game.wrongAnswer();
    } else {
      noWinner = game.wasCorrectlyAnswered();
    }
  } while (noWinner);
};
