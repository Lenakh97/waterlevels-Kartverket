import xml2js from "xml2js";

export const parser = new xml2js.Parser();

export const fetchAndGetStationInfo = async (): Promise<{
  tide: { stationinfo: any };
}> => {
  const res = await fetch(
    "http://api.sehavniva.no/tideapi.php?tide_request=stationlist&type=perm"
  );
  const content = await res.text();
  const data = await parser.parseStringPromise(content);
  return data;
};
