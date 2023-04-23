// import Search from "@mui/icons-material/Search"
// import Chat from "@mui/icons-material/Chat"
// import Notifications from "@mui/icons-material/Notifications"
import React, { useContext, useEffect, useState } from 'react'
import "./TopbarSmartphone.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../state/AuthContext"
import axios from "axios"

export default function TopbarSmartphone() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState({});
  const { user: token } = useContext(AuthContext);

  //ユーザー情報の取得とトークンの有効期限切れかどうか確認
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/jwt`,token);
      setUser(response.data);
    };
    fetchUser();
  }, [token]);

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{ textDecoration:"none" }}>
              <span className="logoSmartphone">Real SNS</span>
            </Link>
        </div>
        <div className="topbarRight">
            <div className="topbarItemIcons">
            {/* <div className="topbarIconItem">
                <Chat />
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <Notifications />
                <span className="topbarIconBadge">2</span>
            </div> */}
            <Link to={`/profile/${user.username}`}>
            <img src= {user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className="topbarImg" />
            </Link>
            </div>
        </div>
    </div>
  )
}
