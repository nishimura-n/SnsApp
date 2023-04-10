import React, { useState, useEffect,useContext } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext';
import { useNavigate } from "react-router-dom";
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Shop.css"

export default function Shop() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [message, setMessage] = useState("");
  const {user: currentUser} = useContext(AuthContext);
  console.log(currentUser._id);
  const navigate = useNavigate();

  const Logout = () => {//ログアウトAPI作る必要がある．
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
      <h1>注意！：再度ログイン後購入が反映されます．</h1>
      <h1>お急ぎの方は，ログアウトボタンを押し，再度ログインしてください．</h1>
    <Link to={'/'}>
     <button>
       ホームに戻る
     </button>
    </Link>
     <button onClick={Logout}>ログアウト</button>
    </section>
  );

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
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
            <form action="http://localhost:5005/api/stripe/create-checkout-session" method="POST">
             <input type='hidden' name='userId' value={currentUser._id} /> 
             <button type="submit">購入ページに進む</button>
            </form>
             </div>
          </div>
        <Rightbar/>
       </div>
      </section>
  );
}