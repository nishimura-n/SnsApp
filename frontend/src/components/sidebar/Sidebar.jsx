import React, { useContext, useEffect, useState } from 'react'
import "./Sidebar.css"
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

function Sidebar() {
  const [user,setUser] = useState({});
  const { user: token } = useContext(AuthContext);

  //ユーザ情報取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`/users/jwt`,token);
      setUser(response.data);
    };
    fetchUser();
  }, [token]);
  const navigate = useNavigate();

  //ログアウト処理
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none",color: "black" }}>
            <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">検索</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">通知</span>
          </li>
          <li className="sidebarListItem">
            <MessageRounded className="sidebarIcon" />
            <span className="sidebarListItemText">メッセージ</span>
          </li> */}
          <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <Link to={'/profile/' + user.username} style={{ textDecoration: "none",color: "black" }}>
            <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <ShoppingCartIcon className="sidebarIcon" />
            <Link to={'/shop '} style={{ textDecoration: "none",color: "black" }}>
            <span className="sidebarListItemText">ショップ</span>
            </Link>
          </li>
          {JSON.parse(localStorage.getItem("Buyer")) ? 
          <li className="sidebarListItem">
            <WbSunnyIcon className="sidebarIcon" />
            <Link to={'/weather '} style={{ textDecoration: "none",color: "black" }}>
            <span className="sidebarListItemText">お天気情報</span>
            </Link>
          </li>
          :
          <li className="sidebarListBuyerItem">
            <WbSunnyIcon className="sidebarIcon" />
            <Link to={'/'} style={{ textDecoration: "none",color: "black" }}>
            <span className="sidebarListItemText">お天気情報</span>
            </Link>
            <HttpsIcon className="sidebarBuyerIcon"/>
          </li>
          }
          {/* <li className="sidebarListItem">
            <Link to={'/setting'} style={{ textDecoration: "none",color: "black" }}>
            <SettingsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">設定</span>
            </Link>
          </li> */}
          <li className="sidebarListItem" onClick={Logout}>
            <LogoutIcon className="sidebarIcon" />
            <span className="sidebarListItemText">ログアウト</span>
          </li>
        </ul>
        {/* <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
          {Users.map((user) => (
          <CloseFriend user={user} key={user.id} />
          ))}
        </ul> */}
      </div>
    </div>
  )
}

export default Sidebar