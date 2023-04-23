import React, { useContext, useEffect, useState } from 'react'
import "./Bottombar.css"
import Home from '@mui/icons-material/Home'
// import Search from '@mui/icons-material/Search'
// import Notifications from '@mui/icons-material/Notifications'
// import MessageRounded from '@mui/icons-material/MessageRounded'
import Person from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
// import CloseFriend from '../closeFriend/CloseFriend'
import SettingsIcon from '@mui/icons-material/Settings';
import HttpsIcon from '@mui/icons-material/Https';
import { useNavigate } from "react-router-dom";
// import { Users } from '../../dummyDate'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext'
import axios from 'axios'


export default function Bottombar() {
  const [user,setUser] = useState({});
  const { user: token } = useContext(AuthContext);

  //ユーザ情報取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/jwt`,token);
      setUser(response.data);
    };
    fetchUser();
  }, [token]);
  const navigate = useNavigate();

  //ログアウト処理
  const Logout = () => {
    navigate("/login");
    window.location.reload();
  }
    return(
    <div className="Bottombar">
      <div className="BottomWrapper">
        <ul className="BottomList">
          <li className="BottomListItem">
            <Link to={'/'} style={{color: "white" }}>
            <Home className="BottomIcon" />
            </Link>
          </li>
          <li className="BottomListItem">
            <Link to={'/profile/' + user.username} style={{color: "white" }}>
            <Person className="BottomIcon" />
            </Link>
          </li>
          <li className="BottomListItem">
            <Link to={'/shop '} style={{color: "white" }}>
            <ShoppingCartIcon className="BottomIcon" />
            </Link>
          </li>
          {JSON.parse(localStorage.getItem("Buyer")) ? 
          <li className="BottomListItem">
            <Link to={'/weather '} style={{color: "white" }}>
            <WbSunnyIcon className="BottomIcon" />
            </Link>
          </li>
          :
          <li className="BottomListItem">
            <Link to={'/'}>
            <WbSunnyIcon className="BottomBuyerIcon" style={{color: "gray" }}/>
            <HttpsIcon className="BottomBuyerIconKey" style={{color: "black" }}/>
            </Link>
          </li>
          }
          <li className="BottomListItem">
            <SettingsIcon className="BottomIcon" style={{color: "white" }}/>
          </li>
          <li className="BottomListItem" onClick={Logout}>
            <LogoutIcon className="BottomIcon" style={{color: "white" }}/>
          </li>
        </ul>
      </div>
    </div>
    )
}