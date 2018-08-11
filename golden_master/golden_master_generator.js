// Run this script to re-generate all the master records

const gm = require("./golden_master_helper");

for (var seed = 0; seed < gm.NUMBER_OF_MASTER_RECORDS; seed++) {
  const fileName = gm.getMasterRecordFileName(seed);
  gm.recordCurrentBehavior(seed, fileName);
}
