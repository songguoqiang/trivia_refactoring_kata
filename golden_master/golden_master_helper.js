const Game = require("../src/game");
const fs = require("fs");

// This GameRunner is almost same as the original version in
// game_runner.js, except that we introduce a new parameter here
// to control the random number generator, so that we can
// repeatedly generate same test cases.
function GameRunner(random) {
  random = random || Math.random;
  var nobodyWins = false;

  var game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  do {
    game.roll(Math.floor(random() * 6) + 1);

    if (Math.floor(random() * 10) == 7) {
      nobodyWins = game.wrongAnswer();
    } else {
      nobodyWins = game.wasCorrectlyAnswered();
    }
    game.nextPlayer();
  } while (nobodyWins);
}

// We need to control the random number generation function
// so that we can generate the same sequences of numbers for a given
// seed
Math.seededRandom = function(max, min) {
  max = max || 1;
  min = min || 0;

  Math.seed = (Math.seed * 9301 + 49297) % 233280;
  var rnd = Math.seed / 233280;

  return min + rnd * (max - min);
};

function getMasterRecordFileName(seed) {
  return `./golden_master/master_record_${seed}.txt`;
}

function deleteExistingFile(fileName) {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
}

function redirectConsoleLogToFile(fileName) {
  // eslint-disable-next-line no-console
  console.log = function(str) {
    fs.appendFileSync(fileName, str + "\r\n");
  };
}

function recordCurrentBehavior(seed, fileName) {
  deleteExistingFile(fileName);
  redirectConsoleLogToFile(fileName);

  Math.seed = seed;
  new GameRunner(Math.seededRandom);
}

const NUMBER_OF_MASTER_RECORDS = 10;

module.exports = {
  recordCurrentBehavior,
  getMasterRecordFileName,
  deleteExistingFile,
  NUMBER_OF_MASTER_RECORDS
};
