import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

const url = {
  base: "https://api.openweathermap.org/data/2.5/weather?q=",
  apiId: "2a0380a6c0cc6fa2a7b4234aa352863a",
};

export default function Weather() {
  const [api, setApi] = useState();
  const [citta, setCitta] = useState("");

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
    console.log(api);
  }, [api]);

  const converter = (temp) => {
    temp = parseFloat(temp);
    return temp - 273.15;
  };

  return (
    <div className="app">
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={5}></Grid>
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
        <Grid item xs={1}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          {api != undefined ? (
            <Card>
              <CardContent>
                {" "}
                <Typography>
                  LOCATION: {api.name}, {api.sys.country}
                </Typography>
                <Typography>
                  TEMPERATURA: {Math.round(converter(api.main.temp))}°C
                </Typography>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}
