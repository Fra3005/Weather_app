import React, { useEffect, useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import day from "../assets/day.svg";
import cloudy from "../assets/cloudy.svg";
import rainy from "../assets/rainy-1.svg"
import mist from '../assets/mist-svgrepo-com.svg'
import rainy1 from '../assets/rainy-5.svg';

export default function Icons(props) {
  const {time} = props
  const [src, setSrc] = useState("");

  useEffect(()=>{

console.log("props", props)

  }, [props])

  useEffect(() => {
    const body = document.body;

    switch (time) {
      case "Clouds":
        setSrc(cloudy);
        body.className = "cloudy";
        break;
      case "Clear":
        setSrc(day);
        body.className = "clear";
        break;
      case "Drizzle": 
        setSrc(rainy)
        body.className = "drizzle";
        break;
      case "Mist":
        setSrc(mist);
        body.className = "mist";
        break;
      case "Rain":
        setSrc(rainy1)
        body.className = "rain";
        break;
      default:
        body.className = "clear";
        break;
    }
  }, [time]);


  return (
    <div>
      <img src={src} style={{width:"180px"}}></img>
    </div>
  );
}
