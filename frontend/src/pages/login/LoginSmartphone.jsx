import React, {useContext, useEffect, useRef} from 'react'
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
import { Link } from 'react-router-dom'
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import "./LoginSmartphone.css"

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
    },
  },
});

function LoginSmartphone() {
  const onlyMiniScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const email = useRef();
  const password = useRef();
  const {dispatch} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    )
  }

  //ログインページでは，ローカルストレージをリセットする．
  useEffect(() => {
    localStorage.clear();
  }, []);

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
                    <p className="loginMsgSmartphoneMini">ログインはこちら</p>
                    : <p className="loginMsgSmartphone">ログインはこちら</p>
                    }
                { onlyMiniScreen ?
                  <>
                      <input type="email" className="loginInputSmartphoneMini" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInputSmartphoneMini" placeholder="パスワード" required minLength="6" ref={password}/>
                  </>
                :
                  <>
                    <input type="email" className="loginInputSmartphone" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInputSmartphone" placeholder="パスワード" required minLength="6" ref={password}/>
                  </>
                }
                    <button className="loginButtonSmartphone">ログイン</button>
                    <Link className="registerLinkSmartphone" to={'/Register'}>
                    <button className="loginRegisterButtonSmartphone">アカウント作成へ</button>
                    </Link>
                </form>
            </div>
        </div>
     </div>
    </div>
  )
}

export default LoginSmartphone