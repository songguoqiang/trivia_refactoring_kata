const NUMBER_OF_VALID_PLACES = 12;

module.exports = class Player {
  constructor(name) {
    this.name = name;
    this.currentPlace = 0;
    this.coinsInPurse = 0;
    this.inPenaltyBox = false;
    this.gettingOutOfPenaltyBox = false;
  }

  move(roll) {
    this.currentPlace += roll;
    if (this.currentPlace >= NUMBER_OF_VALID_PLACES) {
      this.currentPlace -= NUMBER_OF_VALID_PLACES;
    }
  }

  getIntoPenaltyBox() {
    this.inPenaltyBox = true;
    this.gettingOutOfPenaltyBox = false;
  }

  tryToGetOutOfPenaltyBox(roll) {
    if (this.inPenaltyBox) {
      const diceNumberIsOdd = roll % 2 == 1;
      if (diceNumberIsOdd) {
        this.gettingOutOfPenaltyBox = true;
      } else {
        this.gettingOutOfPenaltyBox = false;
      }
    }
  }

  earnCoin() {
    this.coinsInPurse++;
  }

  hasWon() {
    return this.coinsInPurse >= 6;
  }

  hasTheRightToAnswerQuestions() {
    return !this.inPenaltyBox || this.gettingOutOfPenaltyBox;
  }
};
