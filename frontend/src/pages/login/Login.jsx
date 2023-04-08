import React, {useContext, useRef} from 'react'
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
import { Link } from 'react-router-dom'
import "./Login.css"

function Login() {
  const email = useRef();
  const password = useRef();
  const {user, dispatch} = useContext(AuthContext);
  //const {user, isFetching, error, dispatch} = useContext(AuthContext); isFetchingやerrorを使う場合は<-を使う(エラーを消すために↑を使用)

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    // console.log(password.current.value);
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    )
  }

  console.log(user);

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Real SNS</h3>
                <span className="loginDesc">本格的なSNSを，自分の手で</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    <p className="loginMsg">ログインはこちら</p>
                    <input type="email" className="loginInput" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInput" placeholder="パスワード" required minLength="6" ref={password}/>
                    <button className="loginButton">ログイン</button>
                    <Link className="registerLink" to={'/Register'}>
                    <button className="loginRegisterButton">アカウント作成へ</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login