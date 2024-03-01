## Getting water levels using Kartverket API

Kartverket has different stations for measuring the water levels and tides at the Norwegian coast. These stations are shown in the image below.

![Map showing the measuring stations](/images/stations.png)

By utilizing their [API](https://api.sehavniva.no/tideapi_no.html) it is possible to get information about the different stations, historical data, predictions, current water levels etc. Information about the API and how to use it can be found [here](https://api.sehavniva.no/tideapi_protocol.pdf).

Terms of use can be found [here](https://kartverket.no/en/api-and-data/terms-of-use).

Kartverket has a [page](https://kartverket.no/en/at-sea/se-havniva/result?id=558690&location=Trondheim) where you can see the different measurements they provide for different locations.

### List stations

It is possible to get the stations by sending the following GET request to their API:

http://api.sehavniva.no/tideapi.php?tide_request=stationlist&type=perm

The type is optional, and can be PERM for permanent water level stations, CURRENT is for ocean current stations, TEMP is used for stations containing temperature series and PUBLIC is all available water level stations.

This request will give you the locations name, code, latitude, longitude and type, as shown in the [example](/testData/locationInfo.xml).

```xml
<location
      name="Andenes"
      code="ANX"
      latitude="69.326067"
      longitude="16.134848"
      type="PERM"
    />
```

### Historical data

It is possible to get historical data by sending the following request to their API:

http://api.sehavniva.no/tideapi.php?tide_request=stationlevels&lang=en&refcode=cd&stationcode=OSL

In this request you need to specify the locations code to get data for the correct location. Example data from this request can be found in the [example](/testData/historicalData.xml).

### Water level

You can get the water levels by sending the following request to their API:

http://api.sehavniva.no/tideapi.php?tide_request=locationdata&lat=69.326067&lon=16.134848&datatype=PRE&lang=en&place=&dst=1&refcode=CD&fromtime=2024-03-01T09:00&totime=2024-03-01T11:00&interval=10

You get the location by giving the latitude and longitude in this request and timeframe by specifying the time interval you want. Example data from this request can be found [here](/testData/waterlevel.xml) and has the following format:

```xml
 <waterlevel value="81.6" time="2024-03-01T09:00:00+01:00" flag="pre"/>
 <waterlevel value="79.1" time="2024-03-01T09:10:00+01:00" flag="pre"/>
```

This is predicted values for a timeframe, you can also get tide table, observations or all(observation, prediction, weathereffect & forecast).
