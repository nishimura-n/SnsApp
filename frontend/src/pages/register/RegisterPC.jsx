import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./RegisterPC.css"

function RegiterPC() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const navigate = useNavigate();

  //登録ページでもローカルストレージをリセットする．
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async(e) => {
      e.preventDefault();

      //パスワードと確認用のパスワードがあっているかどうかを確認
      if(password.current.value !== passwordConfirmation.current.value) {
        passwordConfirmation.current.setCustomValidity("パスワードが違います．");
      }else {
        try {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            //registerApiを叩く
            await axios.post("/auth/register", user);
            navigate("/login");
        }catch (err){
            console.log(err);
        }
      }
    }

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Simple SNS</h3>
                <span className="loginDesc">つながって，共有しよう</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    <p className="loginMsg">新規登録はこちら</p>
                    <input type="text" className="loginInput" placeholder="ユーザー名" required ref={username}/>
                    <input type="email" className="loginInput" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInput" placeholder="パスワード" required minLength="6" ref={password}/>
                    <input type="password" className="loginInput" placeholder="確認用パスワード" required minLength="6" ref={passwordConfirmation}/>
                    <button className="loginButton" type="submit">サインアップ</button>
                    <Link className="loginLink" to={'/login'}>
                    <button className="loginRegisterButton">ログインページへ</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegiterPC;