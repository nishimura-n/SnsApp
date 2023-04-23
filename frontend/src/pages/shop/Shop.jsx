import React, { useState, useEffect,useContext } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext';
import TopbarSmartphone from '../../components/topbar/TopbarSmartphone'
import Bottombar from '../../components/bottomber/Bottombar.jsx'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Shop.css"
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

export default function Shop() {
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [message, setMessage] = useState('');
  const [currentUser,setCurrentUser] = useState({});
  const { user: token } = useContext(AuthContext);

  //ユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/jwt`,token);
      setCurrentUser(response.data);
    };
    fetchUser();
  }, [token]);

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    <Link to={'/'}>
     <button>
       ホームに戻る
     </button>
    </Link>
    </section>
  );

  useEffect(() => {
    // チェックアウトから戻るリダイレクトかどうかを確認する。
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("ご注文をいただきました！確認メールが届きます。");
    }

    if (query.get("canceled")) {
      setMessage(
        "あなたはこの商品を購入済みです．"
        +"もし，購入済みでない場合は，注文がキャンセルされた可能性があります．もう一度購入を試みてください．"
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <>
    {onlyMediumScreen ?
      <section>
       <TopbarSmartphone/> 
       <div className="ContainerSmartphone">
          <div className="shopSmartphone">
            <div className="imageSmartphone">
             <img
               src={PUBLIC_FOLDER+"/shop/weatherItem.jpeg"}
               alt="お天気情報拡張機能"
             />
            </div>
            <div className="shopSmartphoneText">
             <h3>お天気情報拡張機能</h3>
             <h5>100円</h5>
             <div className="info">
            <form action={`${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`} method="POST">
             <input type='hidden' name='userId' value={currentUser._id || "" } /> 
             <button type="submit">購入ページに進む</button>
            </form>
            </div>
             </div>
          </div>
        <Bottombar/>
       </div>
      </section>
    :
      <section>
       <Topbar/> 
       <div className="Container">
         <Sidebar/>
          <div className="shop">
            <div className="image">
             <img
               src={PUBLIC_FOLDER+"/shop/weatherItem.jpeg"}
               alt="お天気情報拡張機能"
             />
            </div>
             <h3>お天気情報拡張機能</h3>
             <h5>100円</h5>
             <div className="info">
            <form action={`${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`}  method="POST">
             <input type='hidden' name='userId' value={currentUser._id || "" } /> 
             <button type="submit">購入ページに進む</button>
            </form>
             </div>
          </div>
        <Rightbar/>
       </div>
      </section>
    }
    </>
  );
}