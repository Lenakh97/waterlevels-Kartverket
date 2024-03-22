
export const getLocations =
  ({
    fetchAndGetStationInfo,
  }: {
    fetchAndGetStationInfo: () => Promise<{
      tide: {
        stationinfo: [
          {
            location: {
              $: {
                name: string;
                code: string;
                latitude: string;
                longitude: string;
                type: string;
              };
            }[];
          }
        ];
      };
    }>;
  }) =>
  async (): Promise<Array<string[]>> => {
    const data = await fetchAndGetStationInfo();
    let locations: Array<string[]> = [];
    const stations = data.tide.stationinfo[0].location;
    for (const station of stations) {
      locations.push([station.$.latitude, station.$.longitude]);
    }
    return locations;
  };
