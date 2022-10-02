import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, CircularProgress, Tab } from "@mui/material";
import React, { useState } from "react";

export default function Content({ countryData }) {
  const { capital, population, latlng, flags } = countryData;
  const [value, setValue] = useState("1");
  const [Weather, setWeather] = useState([]);

  const handleChange = (e) => {
    if (value === "1") {
      setValue("2");
      getWeather();
    } else setValue("1");
  };

  const getWeather = async () => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      const result = await data.json();
      setWeather(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TabContext value={value}>
        <Box
          className="form"
          sx={{
            margin: 3,
            marginTop: 5,
            padding: 3,
            width: 1450,
            height: 400,
          }}
        >
          <TabList onChange={handleChange} centered>
            <Tab label="Details" value="1" />
            <Tab label="Country Weather" value="2" />
          </TabList>

          <TabPanel value="1">
            <Box className="textCenter">
              <img src={flags.png} alt="" height={100} width={200} />
              <h3>Capital : {capital} </h3>
              <h3>population : {population}</h3>
              <h3>LatLng : {`${latlng[0]}, ${latlng[1]}`}</h3>
            </Box>
          </TabPanel>

          <TabPanel value="2">
            {Weather.length === 0 ? (
              <Box className="textCenter">
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Box className="textCenter">
                  <h3>City : {capital} </h3>
                  <h3>Detail : {Weather.weather[0].description} </h3>
                  <h3>Temperature : {Weather.main.temp}</h3>
                  <h3>pressure : {Weather.main.pressure}</h3>
                  <h3>Humidity : {Weather.main.humidity}</h3>
                </Box>
              </Box>
            )}
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
}
