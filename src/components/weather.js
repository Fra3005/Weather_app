import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Alert
} from "@mui/material";

import Icons from "./icon";

const url = {
  base: "https://api.openweathermap.org/data/2.5/weather?q=",
  apiId: "2a0380a6c0cc6fa2a7b4234aa352863a",
};

export default function Weather() {
  const [api, setApi] = useState("");
  const [citta, setCitta] = useState("");
  const [condizioni, setCondizioni] = useState("");

  const getWeather = (citta) => {
    try {
      fetch(url.base + `${citta}` + "&appid=" + `${url.apiId}`)
        .then((res) => res.json())
        .then((result) => {
          setApi(result);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (api != "") {
      setCondizioni(api.weather[0].main);
    }
  }, [api]);

  const converter = (temp) => {
    temp = parseFloat(temp);
    return temp - 273.15;
  };

  return (
    <div className="app">
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item xs={4.5}></Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={citta}
            onChange={(e) => {
              setCitta(e.target.value);
            }}
          />
          <Button
            sx={{ height: "100%", marginLeft: "10px" }}
            variant="contained"
            onClick={() => {
              getWeather(citta);
            }}
          >
            Trova
          </Button>
        </Grid>

        <Grid item xs={5.2}></Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4.5}></Grid>
        <Grid item xs={6}>
        <Grid item xs>
          <Icons time={condizioni} />
        </Grid>
          <>
            <>
              {api != "" ? (
                <Stack spacing={5}>
                  <Typography variant="h4" style={{ color: "white" }}>
                    Città: {api.name}, {api.sys.country}
                  </Typography>
                  <Typography variant="h4" style={{ color: "white" }}>
                    Temperatura: {Math.round(converter(api.main.temp))}°C
                  </Typography>
                </Stack>
              ) : <Alert severity="error">The name of city is wrong! Try again!</Alert>}
            </>
          </>
        </Grid>
      </Grid>
    </div>
  );
}
