import { readFile } from "fs/promises";
import path from "path";
import { parser } from "./fetchAndGetStationInfo";

export const getWaterLevelInfo = async (stations: string[][]) => {
  let waterLevelInfo: Array<Waterlevel> = [];
  for (const station of stations) {
    /*const waterLevel = await fetch(
      `http://api.sehavniva.no/tideapi.php?tide_request=locationdata&lat=${station[0]}&lon=${station[1]}&datatype=OBS&lang=en&place=&dst=1&refcode=CD&fromtime=2024-03-01T09:00&totime=2024-03-01T11:00&interval=10`
    );*/
    const waterLevel = await readFile(path.join("testData", "waterlevel.xml"));
    //const content = await waterLevel.text();
    const content = waterLevel.toString();
    const data = await parser.parseStringPromise(content);
    const locationData = data.tide.locationdata[0].location[0].$;
    const waterLevelData = data.tide.locationdata[0].data[0].waterlevel[0].$;
    waterLevelInfo.push({
      stationCode: locationData.code,
      latitude: Number(locationData.latitude),
      longitude: Number(locationData.longitude),
      waterLevel: Number(waterLevelData.value),
      time: new Date(waterLevelData.time),
    });
  }
  return waterLevelInfo;
};

export type Waterlevel = {
  stationCode: string;
  latitude: number;
  longitude: number;
  waterLevel: number;
  time: Date;
};
