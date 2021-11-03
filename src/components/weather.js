import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Alert,
} from "@mui/material";

import Icons from "./icon";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AirIcon from "@mui/icons-material/Air";
import axios from "axios";

const url = {
  base: process.env.REACT_APP_BASE_URL,
  apiId: process.env.REACT_APP_API_KEY,
};
//TODO inserire vento, data locale e fare controllo sull'orario per l'icona, check su hendling error
export default function Weather() {
  const [api, setApi] = useState(null);
  const [citta, setCitta] = useState("");
  const [condizioni, setCondizioni] = useState("");
  const [noCity, setNoCity] = useState(false);

  const getWeather = async (citta) => {
    try {
      const res = await axios.get(
        url.base + `${citta}` + "&appid=" + `${url.apiId}`
      );
      setApi(res.data);
    } catch (e) {
      setApi(null);
      setNoCity(e?.response?.data?.message === "city not found");
    }
  };

  useEffect(() => {
    if (api != null && api?.weather?.length > 0) {
      setCondizioni(api?.weather[0]?.main);
    }
  }, [api]);

  const converter = (temp) => {
    temp = parseFloat(temp);
    return temp - 273.15;
  };

  return (
    <div className="app">
      <Grid container spacing={3}>
        <Grid item xs={4.5}></Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Insert City"
            variant="outlined"
            value={citta}
            onChange={(e) => {
              setCitta(e.target.value);
            }}
            style={{ backgroundColor: "white" }}
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
        <Grid item xs></Grid>
        <Grid item xs={4.5}></Grid>
        <Grid item xs={6}>
          <Grid item xs>
            <Icons time={condizioni} />
          </Grid>
          {api != null ? (
            <Stack spacing={5}>
              <Typography variant="h4" style={{ color: "white" }}>
                {api?.name}, {api?.sys?.country}
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                Temperatura: {Math.round(converter(api?.main?.temp))}°C
              </Typography>
              <Typography variant="h6" style={{ color: "white" }}>
                <ArrowUpwardIcon /> {Math.round(converter(api?.main?.temp_max))}
                °C <ArrowDownwardIcon />{" "}
                {Math.round(converter(api?.main?.temp_min))}°C
              </Typography>
              <Typography variant="h6" style={{ color: "white" }}>
                <AirIcon /> {Math.round(api?.wind?.speed * 3.6)} Km/h
              </Typography>
              <Typography variant="h6" style={{ color: "white" }}>
                HUM: {Math.round(api?.main?.humidity)}% Pressione:
                {Math.round(api?.main?.pressure)}hPa
              </Typography>
            </Stack>
          ) : noCity ? (
            <Alert severity="error">
              The name of city is wrong! Try again!
            </Alert>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}
