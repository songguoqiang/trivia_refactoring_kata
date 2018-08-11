var Game = require("./game");

module.exports = function runGame(random) {
  random = random || Math.random;

  let game = new Game();
  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  let nobodyWins = false;
  do {
    const getNumberFromDice = Math.floor(random() * 6) + 1;
    game.roll(getNumberFromDice);

    const shouldSimulateWrongAnswer = Math.floor(random() * 10) == 7;
    if (shouldSimulateWrongAnswer) {
      game.wrongAnswer();
      nobodyWins = true;
    } else {
      game.wasCorrectlyAnswered();
      nobodyWins = game.theCurrentPlayerDidNotWin();
    }
    game.nextPlayer();
  } while (nobodyWins);
};
