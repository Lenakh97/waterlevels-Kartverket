import assert from "node:assert";
import { describe, it } from "node:test";
import { writeToSSM } from "./writeToSSM";

describe("getWaterLevelInfo()", () => {
  it("should write to SSM", async () => {
    assert.deepEqual(await writeToSSM(), 0);
  });
});
