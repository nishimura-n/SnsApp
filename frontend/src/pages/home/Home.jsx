import React from 'react'
import "./Home.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TimeLine from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'

export default function Home() {
  return (
    <>
    <Topbar/> 
    <div className="homeContainer">
    <Sidebar/>
    <TimeLine/>
    <Rightbar/>
    </div>
    </>
  )
}
