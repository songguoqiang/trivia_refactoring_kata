const Player = require("../src/player");

function getNewPlayer() {
  return new Player("Chad");
}

function getPlayerInPenaltyBox() {
  const player = getNewPlayer();
  player.getIntoPenaltyBox();
  return player;
}

function getPlayerWithCoins(n) {
  let player = new Player("Chad");
  for (let i = 0; i < n; i++) {
    player.earnCoin();
  }
  expect(player.coinsInPurse).toBe(n);
  return player;
}

describe("Unit tests for Player", () => {
  describe("Players should be initialized properly", () => {
    let player = getNewPlayer();
    it("should have a name", () => {
      expect(player.name).toEqual("Chad");
    });
    it("should be put at place 0 initially", () => {
      expect(player.currentPlace).toBe(0);
    });
    it("should have 0 gold coins in his purse initially", () => {
      expect(player.coinsInPurse).toBe(0);
    });
    it("should not be in penalty box initially", () => {
      expect(player.inPenaltyBox).toBeFalsy();
      expect(player.gettingOutOfPenaltyBox).toBeFalsy();
    });
  });

  describe("Players can move from one place to another", () => {
    it("should move with the given", () => {
      let player = getNewPlayer();
      player.move(5);
      expect(player.currentPlace).toBe(5);
    });
    test("the maximum place number is 11, the player goes back to place 0 after that", () => {
      let player = getNewPlayer();
      player.move(11);
      expect(player.currentPlace).toBe(11);
      player.move(1);
      expect(player.currentPlace).toBe(0);
    });
  });

  describe("Players can be put into penalty box", () => {
    let player;

    beforeEach(() => {
      player = getPlayerInPenaltyBox();
    });

    test("putting a player into penalty box", () => {
      expect(player.inPenaltyBox).toBeTruthy();
      expect(player.gettingOutOfPenaltyBox).toBeFalsy();
    });

    test("player may get out of the box when he rolls an odd number", () => {
      const roll = 1;
      player.tryToGetOutOfPenaltyBox(roll);
      expect(player.inPenaltyBox).toBeTruthy();
      expect(player.gettingOutOfPenaltyBox).toBeTruthy();
    });

    test("player remains in the penalty box when he rolls an even number", () => {
      const roll = 2;
      player.tryToGetOutOfPenaltyBox(roll);
      expect(player.inPenaltyBox).toBeTruthy();
      expect(player.gettingOutOfPenaltyBox).toBeFalsy();
    });

    test("nothing happens if the player is not in penalty box and he tries to get out of penalty box", () => {
      player = getNewPlayer();
      const roll = 1;
      player.tryToGetOutOfPenaltyBox(roll);

      expect(player.inPenaltyBox).toBeFalsy();
      expect(player.gettingOutOfPenaltyBox).toBeFalsy();
    });
  });

  describe("Players cannot answer questions when he is still in penalty box", () => {
    test("A player can answer questions if he/she is not in penalty box", () => {
      let player = getNewPlayer();
      expect(player.hasTheRightToAnswerQuestions()).toBeTruthy();
    });

    test("A player who is in penalty box and is not getting out cannot answer questions", () => {
      let player = getPlayerInPenaltyBox();
      expect(player.hasTheRightToAnswerQuestions()).toBeFalsy();
    });
    test("A player who is in penalty box and is getting out can answer questions", () => {
      let player = getPlayerInPenaltyBox();
      player.tryToGetOutOfPenaltyBox(1);
      expect(player.hasTheRightToAnswerQuestions()).toBeTruthy();
    });
  });

  describe("Players can earn gold coins if they answer questions correctly", () => {
    test("reward players with coins", () => {
      let player = getNewPlayer();
      player.earnCoin();
      expect(player.coinsInPurse).toBe(1);
    });
  });

  describe("Players can win the game", () => {
    test("Nobody wins unless he/she has 6 gold coins", () => {
      let player = getPlayerWithCoins(5);
      expect(player.hasWon()).toBeFalsy();
    });

    test("Players can win the game when they have 6 gold coins", () => {
      let player = getPlayerWithCoins(6);
      expect(player.hasWon()).toBeTruthy();
    });
  });
});
