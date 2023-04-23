import Search from "@mui/icons-material/Search"
// import Chat from "@mui/icons-material/Chat"
// import Notifications from "@mui/icons-material/Notifications"
import React, { useContext, useEffect, useState } from 'react'
import "./Topbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../state/AuthContext"
import axios from "axios"

export default function Topbar() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState({});
  const { user: token } = useContext(AuthContext);

  //ユーザー情報の取得とトークンの有効期限切れかどうか確認
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/jwt`,token)
      .catch(error => {
        if (error.code === "ERR_BAD_REQUEST" && error.response.data === "Token expired") {
          localStorage.clear();
          // TokenExpiredErrorの場合はトークンが期限切れなので、ログインページにリダイレクトする
          alert("セッションがタイムアウトしました．再度ログインしてください．");
          window.location.href = '/login';
        } else {
          // その他のエラーの場合はアラートを表示する
          alert("エラーが発生しました．再度ログインしてください．");
          window.location.href = '/login';
        }
      });
      setUser(response.data);
    };
    fetchUser();
  }, [token]);

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{ textDecoration:"none" }}>
              <span className="logo">Real SNS</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <Search className="searchIcon"/>
                <input type="text" className="searchInput" placeholder="探し物はなんですか？"/>
            </div>
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
