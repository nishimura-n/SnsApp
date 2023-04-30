import React, { useState, useEffect,useContext } from "react";
import { AuthContext } from '../../state/AuthContext';
import TopbarSmartphone from '../../components/topbar/TopbarSmartphone'
import Bottombar from '../../components/bottomber/Bottombar.jsx'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Setting.css"
import axios from "axios";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      md: 1000,
    },
  },
});

export default function Setting() {
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [currentUser,setCurrentUser] = useState({});
  const { user: token } = useContext(AuthContext);
  const lgList = [
    { city: '東京'},
    { city: '大阪府'},
    { city: '名古屋'},
    { city: '福岡'},
    { city: '仙台'},
    { city: '北海道'},
  ];

  //ユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`/users/jwt`,token);
      setCurrentUser(response.data);
    };
    fetchUser();
  }, [token]);

  const handleChange = async (e) => {
    console.log(e)
    await axios.put(`/users/${currentUser._id}`,e);
  }

  return (
    <>
    {onlyMediumScreen ?
      <section>
       <TopbarSmartphone/> 
       <div className="ContainerSmartphone">
        <div className="weatherSmartphone">
          <h2 className="title">設定</h2>
          <div className="info">ユーザー情報</div>
          {currentUser.city ? 
          <div className="info">出身：{currentUser.city}</div>
          :
          <div className="info">出身：未設定</div>
          }
          <select className="select" onChange={(e) => handleChange(e)}>
          {lgList.map((value,i)=>
                <option value={value.name} key={i}>
                 {value.city}
          </option>)}
          </select>
        </div>
        <Bottombar/>
       </div>
      </section>
    :
      <section>
       <Topbar/> 
       <div className="Container">
        <Sidebar/>
        <div className="setting">
          <h2 className="title">設定</h2>
          <div className="info">ユーザー情報</div>
          {currentUser.city ? 
          <div className="info">出身：{currentUser.city}</div>
          :
          <div className="info">出身：未設定</div>
          }
          <select className="select" onChange={(e) => handleChange(e)}>
          {lgList.map((value,i)=>
                <option value={value.name} key={i}>
                 {value.city}
          </option>)}
          </select>
        </div>
        <Rightbar/>
       </div>
      </section>
    }
    </>
  );
}