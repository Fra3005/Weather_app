import React, { useEffect, useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import day from "../assets/day.svg";
import cloudy from "../assets/cloudy.svg";
import rainy from "../assets/rainy-1.svg"
import mist from '../assets/mist-svgrepo-com.svg'

export default function Icons(props) {
  const {time} = props
  const [src, setSrc] = useState("");

  useEffect(()=>{

console.log("props", props)

  }, [props])

  useEffect(() => {
    switch (time) {
      case "Clouds":
        setSrc(cloudy);
        break;
      case "Clear":
        setSrc(day);
        break;
      case "Drizzle": 
        setSrc(rainy)
        break;
      case "Mist":
        setSrc(mist);
        break;
    }
  }, [time]);


  return (
    <div>
      <img src={src} style={{width:"180px"}}></img>
    </div>
  );
}
