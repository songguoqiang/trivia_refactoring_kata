module.exports = function Game() {
  const players = new Array();
  const places = new Array(6);
  const purses = new Array(6);
  const inPenaltyBox = new Array(6);

  const popQuestions = new Array();
  const scienceQuestions = new Array();
  const sportsQuestions = new Array();
  const rockQuestions = new Array();

  let currentPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  const didPlayerWin = function() {
    return !(purses[currentPlayer] == 6);
  };

  const POP_CATEGORY = "Pop";
  const SCIENCE_CATEGORY = "Science";
  const SPORTS_CATEGORY = "Sports";
  const ROCK_CATEGORY = "Rock";

  const currentCategory = function() {
    if (places[currentPlayer] == 0) return POP_CATEGORY;
    if (places[currentPlayer] == 4) return POP_CATEGORY;
    if (places[currentPlayer] == 8) return POP_CATEGORY;
    if (places[currentPlayer] == 1) return SCIENCE_CATEGORY;
    if (places[currentPlayer] == 5) return SCIENCE_CATEGORY;
    if (places[currentPlayer] == 9) return SCIENCE_CATEGORY;
    if (places[currentPlayer] == 2) return SPORTS_CATEGORY;
    if (places[currentPlayer] == 6) return SPORTS_CATEGORY;
    if (places[currentPlayer] == 10) return SPORTS_CATEGORY;
    return ROCK_CATEGORY;
  };

  this.createRockQuestion = function(index) {
    return "Rock Question " + index;
  };

  for (let i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push(this.createRockQuestion(i));
  }

  this.isPlayable = function(howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.add = function(playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    log(playerName + " was added");
    log("They are player number " + players.length);

    return true;
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

  this.roll = function(roll) {
    log(players[currentPlayer] + " is the current player");
    log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
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
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
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

        let winner = didPlayerWin();
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

      let winner = didPlayerWin();

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

function log(output) {
  // eslint-disable-next-line no-console
  console.log(output);
}
