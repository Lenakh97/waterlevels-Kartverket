import assert from "node:assert";
import { describe, it } from "node:test";
import xml2js from "xml2js";
import { getLocations } from "./getLocations";

export const parser = new xml2js.Parser();

describe("getStations()", () => {
  it("should return a list of the different stations", async () => {
    const expectedRes = [
      ["69.326067", "16.134848"],
      ["60.398046", "5.320487"],
      ["67.292330", "14.399770"],
      ["60.492094", "6.893949"],
    ];
    const getLoc = getLocations({
      fetchAndGetStationInfo: () =>
        Promise.resolve({
          tide: {
            stationinfo: [
              {
                location: [
                  {
                    $: {
                      name: "Andenes",
                      code: "ANX",
                      latitude: "69.326067",
                      longitude: "16.134848",
                      type: "PERM",
                    },
                  },
                  {
                    $: {
                      name: "Bergen",
                      code: "BGO",
                      latitude: "60.398046",
                      longitude: "5.320487",
                      type: "PERM",
                    },
                  },
                  {
                    $: {
                      name: "Bodø",
                      code: "BOO",
                      latitude: "67.292330",
                      longitude: "14.399770",
                      type: "PERM",
                    },
                  },
                  {
                    $: {
                      name: "Bruravik",
                      code: "BRJ",
                      latitude: "60.492094",
                      longitude: "6.893949",
                      type: "PERM",
                    },
                  },
                ],
              },
            ],
          },
        }),
    });
    assert.deepEqual(await getLoc(), expectedRes);
  });
});

/*
[
      [ '69.326067', '16.134848' ], [ '60.398046', '5.320487' ],
      [ '67.292330', '14.399770' ], [ '60.492094', '6.893949' ],
      [ '70.664750', '23.678690' ], [ '68.801261', '16.548236' ],
      [ '63.425224', '9.101504' ],  [ '58.995212', '9.856379' ],
      [ '70.980318', '25.972697' ], [ '68.212639', '14.482149' ],
      [ '63.113859', '7.734352' ],  [ '59.766394', '5.503670' ],
      [ '63.869331', '8.665231' ],  [ '61.933776', '5.113310' ],
      [ '68.428286', '17.425759' ], [ '78.928545', '11.938015' ],
      [ '59.678073', '10.604861' ], [ '59.908559', '10.734510' ],
      [ '64.859456', '11.230107' ], [ '58.868232', '5.746613' ],
      [ '58.505200', '5.791602' ],  [ '59.710622', '10.273018' ],
      [ '58.974339', '5.730121' ],  [ '58.006377', '7.554759' ],
      [ '69.646110', '18.954790' ], [ '63.436484', '10.391669' ],
      [ '66.496624', '12.088633' ], [ '70.374978', '31.104015' ],
      [ '59.036046', '10.949769' ], [ '62.469414', '6.151946' ]
    ]
*/
