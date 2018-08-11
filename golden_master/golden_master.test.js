const fs = require("fs");
const gm = require("./golden_master_helper");

describe("Golden master test", () => {
  it("should match the existing behavior", () => {
    const testOutput = "./golden_master/test_record.txt";
    try {
      for (let seed = 0; seed < gm.NUMBER_OF_MASTER_RECORDS; seed++) {
        let masterRecord = fs.readFileSync(
          gm.getMasterRecordFileName(seed),
          "utf8"
        );
        gm.recordCurrentBehavior(seed, testOutput);
        let newRecord = fs.readFileSync(testOutput, "utf8");

        expect(newRecord).toEqual(masterRecord);
      }
    } finally {
      gm.deleteExistingFile(testOutput);
    }
  });
});
