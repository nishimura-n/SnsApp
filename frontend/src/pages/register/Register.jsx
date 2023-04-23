import React from 'react'
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import RegisterPC from "./RegisterPC";
import RegisterSmartphone from "./RegisterSmartphone";

const theme = createTheme({
  breakpoints: {
    values: {
      md: 1000,
    },
  },
});

function Regiter() {
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
    {onlyMediumScreen ?
    <RegisterSmartphone/>
    :
    <RegisterPC/>
    }
    </>
  )
}

export default Regiter;