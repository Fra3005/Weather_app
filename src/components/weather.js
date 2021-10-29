import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';

const url = {
  base: "https://api.openweathermap.org/data/2.5/weather?q=London&appid=",
  apiId: "2a0380a6c0cc6fa2a7b4234aa352863a",
};

const citt = [{
  name: "Bari"
}]

export default function Weather() {
  const [api, setApi] = useState([]);
  const [citta, setCitta] = useState([]);

  const getCitta = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json"
      );
      setCitta(response.data.slice(0,99));
      
    } catch (e) {
      console.log(e);
    }
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(url.base + `${url.apiId}`);
      setApi(JSON.stringify(response));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeather().then(() => {
      console.log(api);
    });
    getCitta().then(() => {
      console.log(citta);
    });
  }, []);


  useEffect(()=>{

      console.log("Citta", citta)
  }, [citta])
  return (
    <div>
      <Autocomplete
        
        id="combo-box-demo"
        options={citta}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Selezionare una città" />}
      />
    </div>
  );
}


