import React from 'react'
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import LoginPC from "./LoginPC";
import LoginSmartphone from "./LoginSmartphone";

const theme = createTheme({
  breakpoints: {
    values: {
      md: 1000,
    },
  },
});

function Login() {
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
    {onlyMediumScreen ?
    <LoginSmartphone/>
    :
    <LoginPC/>
    }
    </>
  )
}

export default Login