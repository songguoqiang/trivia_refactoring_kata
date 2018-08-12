const Player = require("./player");

module.exports = function Game() {
  const players = [];
  let currentPlayer = 0;

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  function getCurrentPlayer() {
    return players[currentPlayer];
  }

  this.nextPlayer = function() {
    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
  };

  this.theCurrentPlayerDidNotWin = function() {
    return !getCurrentPlayer().hasWon();
  };

  const POP_CATEGORY = "Pop";
  const SCIENCE_CATEGORY = "Science";
  const SPORTS_CATEGORY = "Sports";
  const ROCK_CATEGORY = "Rock";

  const currentCategory = function() {
    const PLACES_FOR_POP_CATEGORY = [0, 4, 8];
    const PLACES_FOR_SCIENCE_CATEGORY = [1, 5, 9];
    const PLACES_FOR_SPORTS_CATEGORY = [2, 6, 10];

    const currentPlace = getCurrentPlayer().currentPlace;

    if (PLACES_FOR_POP_CATEGORY.includes(currentPlace)) return POP_CATEGORY;
    if (PLACES_FOR_SCIENCE_CATEGORY.includes(currentPlace))
      return SCIENCE_CATEGORY;
    if (PLACES_FOR_SPORTS_CATEGORY.includes(currentPlace))
      return SPORTS_CATEGORY;
    return ROCK_CATEGORY;
  };

  this.initQuestionBank = function() {
    for (let i = 0; i < 50; i++) {
      popQuestions.push("Pop Question " + i);
      scienceQuestions.push("Science Question " + i);
      sportsQuestions.push("Sports Question " + i);
      rockQuestions.push("Rock Question " + i);
    }
  };

  this.isPlayable = function(howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.addPlayer = function(playerName) {
    const player = new Player(playerName);
    players.push(player);

    log(playerName + " was added");
    log("They are player number " + players.length);
  };

  this.howManyPlayers = function() {
    return players.length;
  };

  const askQuestion = function() {
    if (currentCategory() == POP_CATEGORY) log(popQuestions.shift());
    if (currentCategory() == SCIENCE_CATEGORY) log(scienceQuestions.shift());
    if (currentCategory() == SPORTS_CATEGORY) log(sportsQuestions.shift());
    if (currentCategory() == ROCK_CATEGORY) log(rockQuestions.shift());
  };

  function advanceTheCurrentPlayer(player, roll) {
    player.move(roll);

    log(player.name + "'s new location is " + player.currentPlace);
  }

  function tryToGetOutOfPenaltyBox(player, roll) {
    player.tryToGetOutOfPenaltyBox(roll);
    if (player.gettingOutOfPenaltyBox) {
      log(player.name + " is getting out of the penalty box");
    } else {
      log(player.name + " is not getting out of the penalty box");
    }
  }

  this.roll = function(roll) {
    const player = getCurrentPlayer();
    log(player.name + " is the current player");
    log("They have rolled a " + roll);

    if (player.inPenaltyBox) {
      tryToGetOutOfPenaltyBox(player, roll);
    }

    if (player.hasTheRightToAnswerQuestions()) {
      advanceTheCurrentPlayer(player, roll);
      log("The category is " + currentCategory());
      askQuestion();
    }
  };

  function awardOneCoinToCurrentPlayer(player) {
    player.earnCoin();
    log(player.name + " now has " + player.coinsInPurse + " Gold Coins.");
  }

  this.currentUserAnsweredCorrectly = function() {
    const player = getCurrentPlayer();
    if (!player.hasTheRightToAnswerQuestions()) {
      return;
    }
    log("Answer was correct!!!!");
    awardOneCoinToCurrentPlayer(player);
  };

  function putCurrentPlayerToPenaltyBox(player) {
    log(player.name + " was sent to the penalty box");
    player.getIntoPenaltyBox();
  }

  this.currentPlayerAnsweredWrongly = function() {
    const player = getCurrentPlayer();
    log("Question was incorrectly answered");
    putCurrentPlayerToPenaltyBox(player);
  };
};

function log(output) {
  // eslint-disable-next-line no-console
  console.log(output);
}
