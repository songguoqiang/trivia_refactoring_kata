module.exports = function Game() {
  const players = [];
  const places = [];
  const purses = [];
  const inPenaltyBox = [];

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  let currentPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  const shouldTheCurrentPlayerAnswerQuestion = function() {
    return !inPenaltyBox[currentPlayer] || isGettingOutOfPenaltyBox;
  };

  this.nextPlayer = function() {
    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
  };

  this.theCurrentPlayerDidNotWin = function() {
    return !(purses[currentPlayer] == 6);
  };

  const POP_CATEGORY = "Pop";
  const SCIENCE_CATEGORY = "Science";
  const SPORTS_CATEGORY = "Sports";
  const ROCK_CATEGORY = "Rock";

  const currentCategory = function() {
    const PLACES_FOR_POP_CATEGORY = [0, 4, 8];
    const PLACES_FOR_SCIENCE_CATEGORY = [1, 5, 9];
    const PLACES_FOR_SPORTS_CATEGORY = [2, 6, 10];

    const currentPlace = places[currentPlayer];

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
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

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

  function advanceTheCurrentPlayer(roll) {
    places[currentPlayer] = places[currentPlayer] + roll;
    if (places[currentPlayer] > 11) {
      places[currentPlayer] = places[currentPlayer] - 12;
    }

    log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
  }

  function tryToGetOutOfPenaltyBox(roll) {
    const anOddNumberOnDice = roll % 2 != 0;
    if (anOddNumberOnDice) {
      isGettingOutOfPenaltyBox = true;
      log(players[currentPlayer] + " is getting out of the penalty box");
    } else {
      log(players[currentPlayer] + " is not getting out of the penalty box");
      isGettingOutOfPenaltyBox = false;
    }
  }

  this.roll = function(roll) {
    log(players[currentPlayer] + " is the current player");
    log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      tryToGetOutOfPenaltyBox(roll);
    }

    if (shouldTheCurrentPlayerAnswerQuestion()) {
      advanceTheCurrentPlayer(roll);
      log("The category is " + currentCategory());
      askQuestion();
    }
  };

  function awardOneCoinToCurrentPlayer() {
    purses[currentPlayer] += 1;
    log(
      players[currentPlayer] +
        " now has " +
        purses[currentPlayer] +
        " Gold Coins."
    );
  }

  this.currentUserAnsweredCorrectly = function() {
    if (!shouldTheCurrentPlayerAnswerQuestion()) {
      return;
    }
    log("Answer was correct!!!!");
    awardOneCoinToCurrentPlayer();
  };

  this.currentPlayerAnsweredWrongly = function() {
    log("Question was incorrectly answered");
    log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;
  };
};

function log(output) {
  // eslint-disable-next-line no-console
  console.log(output);
}
