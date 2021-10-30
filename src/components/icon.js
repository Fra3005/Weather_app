import React, { useEffect, useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";

export default function Icons(props) {
  const [time, setTime] = useState(props.time);

  const getIcon = (weather) => {
    weather = time;
    switch (weather) {
      case "Clouds":
        return <CloudIcon />;
        break;
      case "Clear":
        return <WbSunnyIcon />;
    }
  };

  useEffect(() => {
    console.log(time);
  }, [time]);

  return <div></div>;
}
