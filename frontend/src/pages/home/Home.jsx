import React from 'react'
import "./Home.css"
import TopbarSmartphone from '../../components/topbar/TopbarSmartphone'
import Bottombar from '../../components/bottomber/Bottombar.jsx'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TimeLine from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      md: 1000,
    },
  },
});

export default function Home() {
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
    {onlyMediumScreen ?
    <>
    <TopbarSmartphone/> 
    <div className="homeContainer">
    <TimeLine/>
    </div>
    <Bottombar/>
    </>
    :
    <>
    <Topbar/> 
    <div className="homeContainer">
    <Sidebar/>
    <TimeLine/>
    <Rightbar/>
    </div>
    </>
    }
    </>
  )
}
