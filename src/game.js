module.exports = function Game() {
  var players = [];
  var places = [];
  var purses = [];
  var inPenaltyBox = [];

  var popQuestions = [];
  var scienceQuestions = [];
  var sportsQuestions = [];
  var rockQuestions = [];

  const POP_CATEGORY = "Pop";
  const SCIENCE_CATEGORY = "Science";
  const SPORTS_CATEGORY = "Sports";
  const ROCK_CATEGORY = "Rock";

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function() {
    return !(purses[currentPlayer] == 6);
  };

  var currentCategory = function() {
    const currentPlace = places[currentPlayer];
    if (isPopCategory(currentPlace)) return POP_CATEGORY;
    if (isScienceCategory(currentPlace)) return SCIENCE_CATEGORY;
    if (isSportsCategory(currentPlace)) return SPORTS_CATEGORY;
    return ROCK_CATEGORY;
  };

  const isPopCategory = currentPlace => currentPlace % 4 === 0;
  const isScienceCategory = currentPlace => currentPlace % 4 === 1;
  const isSportsCategory = currentPlace => currentPlace % 4 === 2;

  const NUM_OF_QUESTION = 50;
  for (var i = 0; i < NUM_OF_QUESTION; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push("Rock Question " + i);
  }

  this.add = function(playerName) {
    const numOfPlayers = players.push(playerName);
    const currentPlayerIndex = numOfPlayers - 1;

    places[currentPlayerIndex] = 0;
    purses[currentPlayerIndex] = 0;
    inPenaltyBox[currentPlayerIndex] = false;

    log(playerName + " was added");
    log("They are player number " + players.length);

    return true;
  };

  var askQuestion = function() {
    if (currentCategory() == POP_CATEGORY) log(popQuestions.shift());
    if (currentCategory() == SCIENCE_CATEGORY) log(scienceQuestions.shift());
    if (currentCategory() == SPORTS_CATEGORY) log(sportsQuestions.shift());
    if (currentCategory() == ROCK_CATEGORY) log(rockQuestions.shift());
  };
  const NUM_OF_PLACE = 12;
  this.roll = function(roll) {
    log(players[currentPlayer] + " is the current player");
    log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      const isOddNumber = roll % 2 != 0;
      if (isOddNumber) {
        isGettingOutOfPenaltyBox = true;

        log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > NUM_OF_PLACE - 1) {
          places[currentPlayer] = places[currentPlayer] - NUM_OF_PLACE;
        }

        log(
          players[currentPlayer] + "'s new location is " + places[currentPlayer]
        );
        log("The category is " + currentCategory());
        askQuestion();
      } else {
        log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > NUM_OF_PLACE - 1) {
        places[currentPlayer] = places[currentPlayer] - NUM_OF_PLACE;
      }

      log(
        players[currentPlayer] + "'s new location is " + places[currentPlayer]
      );
      log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        log("Answer was correct!!!!");
        purses[currentPlayer] += 1;
        log(
          players[currentPlayer] +
            " now has " +
            purses[currentPlayer] +
            " Gold Coins."
        );

        var winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;
        return true;
      }
    } else {
      log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      log(
        players[currentPlayer] +
          " now has " +
          purses[currentPlayer] +
          " Gold Coins."
      );

      var winner = didPlayerWin();

      currentPlayer += 1;
      if (currentPlayer == players.length) currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function() {
    log("Question was incorrectly answered");
    log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
    return true;
  };
};

function log(message) {
  // eslint-disable-next-line no-console
  console.log(message);
}
