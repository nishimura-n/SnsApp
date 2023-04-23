import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./RegisterSmartphone.css"

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
    },
  },
});

function RegiterSmartphone() {
  const onlyMiniScreen = useMediaQuery(theme.breakpoints.down("xs"));
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
    <div className="SmartphoneBack">
     <div className="loginSmartphone">
        <div className="loginWrapperSmartphone">
            <div className="loginLeftSmartphone">
                <h3 className="loginLogoSmartphone">Real SNS</h3>
                { onlyMiniScreen ?
                <span className="loginDescSmartphone">本格的なSNSを，<br/>自分の手で</span>
                :
                <span className="loginDescSmartphone">本格的なSNSを，自分の手で</span>
                }
            </div>
            <div className="loginRightSmartphone">
                <form className="loginBoxSmartphone" onSubmit={(e) => handleSubmit(e)}>
                { onlyMiniScreen ?
                    <p className="loginMsgSmartphoneMini">新規登録はこちら</p>
                    : <p className="loginMsgSmartphone">新規登録はこちら</p>
                    }
                { onlyMiniScreen ?
                  <>
                     <input type="text" className="loginInputSmartphoneMini" placeholder="ユーザー名" required ref={username}/>
                     <input type="email" className="loginInputSmartphoneMini" placeholder="Eメール" required ref={email}/>
                     <input type="password" className="loginInputSmartphoneMini" placeholder="パスワード" required minLength="6" ref={password}/>
                     <input type="password" className="loginInputSmartphoneMini" placeholder="確認用パスワード" required minLength="6" ref={passwordConfirmation}/>
                  </>
                :
                  <>
                    <input type="text" className="loginInputSmartphone" placeholder="ユーザー名" required ref={username}/>
                    <input type="email" className="loginInputSmartphone" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInputSmartphone" placeholder="パスワード" required minLength="6" ref={password}/>
                    <input type="password" className="loginInputSmartphone" placeholder="確認用パスワード" required minLength="6" ref={passwordConfirmation}/>
                  </>
                }
                    <button className="loginButtonSmartphone" type="submit">サインアップ</button>
                    <Link className="loginLinkSmartphone" to={'/login'}>
                    <button className="loginRegisterButtonSmartphone">ログインページへ</button>
                    </Link>
                </form>
            </div>
        </div>
     </div>
    </div>
  )
}

export default RegiterSmartphone;