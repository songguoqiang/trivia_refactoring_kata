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

  const didCurrentPlayerWin = function() {
    return purses[currentPlayer] == 6;
  };

  const POP_CATEGORY = "Pop";
  const SCIENCE_CATEGORY = "Science";
  const SPORTS_CATEGORY = "Sports";
  const ROCK_CATEGORY = "Rock";

  const PLACES_FOR_POP_QUESTIONS = [0, 4, 8];
  const PLACES_FOR_SCIENCE_QUESTIONS = [1, 5, 9];
  const PLACES_FOR_SPORTS_QUESTIONS = [2, 6, 10];

  function currentCategory() {
    const currentPlace = places[currentPlayer];
    if (PLACES_FOR_POP_QUESTIONS.includes(currentPlace)) {
      return POP_CATEGORY;
    }
    if (PLACES_FOR_SCIENCE_QUESTIONS.includes(currentPlace)) {
      return SCIENCE_CATEGORY;
    }
    if (PLACES_FOR_SPORTS_QUESTIONS.includes(currentPlace)) {
      return SPORTS_CATEGORY;
    }
    return ROCK_CATEGORY;
  }

  this.initQuestionBank = function() {
    for (let i = 0; i < 50; i++) {
      popQuestions.push("Pop Question " + i);
      scienceQuestions.push("Science Question " + i);
      sportsQuestions.push("Sports Question " + i);
      rockQuestions.push("Rock Question " + i);
    }
  };

  this.addPlayer = function(playerName) {
    const playersCount = players.push(playerName);
    places[playersCount - 1] = 0;
    purses[playersCount - 1] = 0;
    inPenaltyBox[playersCount - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  const askQuestion = function() {
    if (currentCategory() == POP_CATEGORY) console.log(popQuestions.shift());
    if (currentCategory() == SCIENCE_CATEGORY)
      console.log(scienceQuestions.shift());
    if (currentCategory() == SPORTS_CATEGORY)
      console.log(sportsQuestions.shift());
    if (currentCategory() == ROCK_CATEGORY) console.log(rockQuestions.shift());
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(
          players[currentPlayer] + " is getting out of the penalty box"
        );
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(
          players[currentPlayer] + "'s new location is " + places[currentPlayer]
        );
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        console.log(
          players[currentPlayer] + " is not getting out of the penalty box"
        );
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(
        players[currentPlayer] + "'s new location is " + places[currentPlayer]
      );
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        purses[currentPlayer] += 1;
        console.log(
          players[currentPlayer] +
            " now has " +
            purses[currentPlayer] +
            " Gold Coins."
        );

        let noWinner = !didCurrentPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;

        return noWinner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(
        players[currentPlayer] +
          " now has " +
          purses[currentPlayer] +
          " Gold Coins."
      );

      let noWinner = !didCurrentPlayerWin();

      currentPlayer += 1;
      if (currentPlayer == players.length) currentPlayer = 0;

      return noWinner;
    }
  };

  this.wrongAnswer = function() {
    console.log("Question was incorrectly answered");
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
    return true;
  };
};
