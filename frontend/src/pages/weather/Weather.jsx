import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import Grid from '@mui/material/Grid';
import TopbarSmartphone from '../../components/topbar/TopbarSmartphone'
import Bottombar from '../../components/bottomber/Bottombar.jsx'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Weather.css"
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 700,
      md: 1000,
    },
  },
});

const Weather = () => {
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const Time = (prop) => {
      //JSON形式を文字列に変換
      var propStr = JSON.stringify(prop);
      //スプリットで文字列の無駄な部分を省く
      var result = propStr.split(':');
      //日本時間に変更のために半角スペースで分割
      var hour = result[1].split(' ');
      //文字列の無駄な部分を省く
      var year = hour[0].substring(1);
      //時間を日本時間に変更
      var JapanHour = (Number(hour[1])+9)%24;
      //文字列の無駄な部分を省く
      var second = result[3].substring(0,result[3].length-2);
      return (
        <>
        <p className="info">{year} {JapanHour}:{result[2]}:{second}</p>
        </>
      )
    }
    const baseURL = process.env.REACT_APP_OPENWEATHERMAP;
    const [post, setPost] = useState(null);
    const [currentUser,setCurrentUser] = useState({});
    const { user: token } = useContext(AuthContext);

    useEffect(() => {
      const fetchUser = async () => {
        const response = await axios.post(`/users/jwt`,token);
        setCurrentUser(response.data);
      };
      fetchUser();
    }, [token]);
  
    useEffect(() => {
      axios.get(baseURL).then((response) => {
        setPost(response.data);
      });
    }, [baseURL]);
  
    if (!post) return  (
    <>
    {onlyMediumScreen ?
    <>
      <TopbarSmartphone /> 
       <div className="Container">
         <div className="weatherSmartphone">
          <div className="progress">
           <CircularProgress size="5rem"/>
          </div>
         </div>
        <Bottombar/>
       </div>
    </>
    :
    <>
    <Topbar/> 
     <div className="Container">
      <Sidebar/>
       <div className="weather">
        <div className="progress">
         <CircularProgress size="5rem"/>
        </div>
       </div>
      <Rightbar/>
     </div>
     </>
    }
    </>
    );
    
    return (
    <>
      {onlyMediumScreen ?
      <>
      <TopbarSmartphone /> 
        <div className="Container">
         {currentUser.isBuyer ? 
           <div className="weatherSmartphone">
             <h2 className="title">大阪の気象情報予報</h2>
             <Grid container direction="row" justifyContent="space-around" alignItems="center" spacing={1}>
              <Grid item xs="auto">
               <Time prop={post.list[0].dt_txt}/>
               <p className="info">空模様 : {post.list[0].weather[0].description}</p>
               <p className="info">気温 : {post.list[0].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[0].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[1].dt_txt}/>
               <p className="info">空模様 : {post.list[1].weather[0].description}</p>
               <p className="info">気温 : {post.list[1].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[1].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[2].dt_txt}/>
               <p className="info">空模様 : {post.list[2].weather[0].description}</p>
               <p className="info">気温 : {post.list[2].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[2].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
               <Time prop={post.list[3].dt_txt}/>
               <p className="info">空模様 : {post.list[3].weather[0].description}</p>
               <p className="info">気温 : {post.list[3].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[3].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[4].dt_txt}/>
               <p className="info">空模様 : {post.list[4].weather[0].description}</p>
               <p className="info">気温 : {post.list[4].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[4].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[5].dt_txt}/>
               <p className="info">空模様 : {post.list[5].weather[0].description}</p>
               <p className="info">気温 : {post.list[5].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[5].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
               <Time prop={post.list[6].dt_txt}/>
               <p className="info">空模様 : {post.list[6].weather[0].description}</p>
               <p className="info">気温 : {post.list[6].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[6].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[7].dt_txt}/>
               <p className="info">空模様 : {post.list[7].weather[0].description}</p>
               <p className="info">気温 : {post.list[7].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[7].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[8].dt_txt}/>
               <p className="info">空模様 : {post.list[8].weather[0].description}</p>
               <p className="info">気温 : {post.list[8].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[8].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[9].dt_txt}/>
               <p className="info">空模様 : {post.list[9].weather[0].description}</p>
               <p className="info">気温 : {post.list[9].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[9].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[10].dt_txt}/>
               <p className="info">空模様 : {post.list[10].weather[0].description}</p>
               <p className="info">気温 : {post.list[10].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[10].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs="auto">
              <Time prop={post.list[11].dt_txt}/>
               <p className="info">空模様 : {post.list[11].weather[0].description}</p>
               <p className="info">気温 : {post.list[11].main.temp}度</p>
               <img className="img" src={'http://openweathermap.org/img/w/'+post.list[11].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
            </Grid>
           </div>
                     :
           <div className="weather">
             <div>セッションがタイムアウトしています．</div>
             <div>再度ログインしてください．</div>
             <div>購入者のみこのページを閲覧できます．</div>
           </div>
           }
          <Bottombar/>
        </div>
     </>
      :
    <>
     <Topbar/> 
       <div className="Container">
         <Sidebar/>
        {currentUser.isBuyer ? 
          <div className="weather">
            <h2 className="title">大阪の気象情報予報</h2>
            <Grid container direction="row" alignItems="center" justify="center" spacing={3}>
             <Grid item xs={3}>
              <Time prop={post.list[0].dt_txt}/>
              <p className="info">空模様 : {post.list[0].weather[0].description}</p>
              <p className="info">気温 : {post.list[0].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[0].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[1].dt_txt}/>
              <p className="info">空模様 : {post.list[1].weather[0].description}</p>
              <p className="info">気温 : {post.list[1].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[1].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[2].dt_txt}/>
              <p className="info">空模様 : {post.list[2].weather[0].description}</p>
              <p className="info">気温 : {post.list[2].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[2].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[3].dt_txt}/>
              <p className="info">空模様 : {post.list[3].weather[0].description}</p>
              <p className="info">気温 : {post.list[3].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[3].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs={3}>
              <Time prop={post.list[4].dt_txt}/>
              <p className="info">空模様 : {post.list[4].weather[0].description}</p>
              <p className="info">気温 : {post.list[4].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[4].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[5].dt_txt}/>
              <p className="info">空模様 : {post.list[5].weather[0].description}</p>
              <p className="info">気温 : {post.list[5].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[5].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
              <Grid item xs={3}>
              <Time prop={post.list[6].dt_txt}/>
              <p className="info">空模様 : {post.list[6].weather[0].description}</p>
              <p className="info">気温 : {post.list[6].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[6].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[7].dt_txt}/>
              <p className="info">空模様 : {post.list[7].weather[0].description}</p>
              <p className="info">気温 : {post.list[7].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[7].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[8].dt_txt}/>
              <p className="info">空模様 : {post.list[8].weather[0].description}</p>
              <p className="info">気温 : {post.list[8].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[8].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
             <Grid item xs={3}>
              <Time prop={post.list[9].dt_txt}/>
              <p className="info">空模様 : {post.list[9].weather[0].description}</p>
              <p className="info">気温 : {post.list[9].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[9].weather[0].icon+'.png'} alt="weather"/>
              </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[10].dt_txt}/>
              <p className="info">空模様 : {post.list[10].weather[0].description}</p>
              <p className="info">気温 : {post.list[10].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[10].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
             <Grid item xs={3}>
             <Time prop={post.list[11].dt_txt}/>
              <p className="info">空模様 : {post.list[11].weather[0].description}</p>
              <p className="info">気温 : {post.list[11].main.temp}度</p>
              <img className="img" src={'http://openweathermap.org/img/w/'+post.list[11].weather[0].icon+'.png'} alt="weather"/>
             </Grid>
            </Grid>
          </div>
                    :
          <div className="weather">
            <div>セッションがタイムアウトしています．</div>
            <div>再度ログインしてください．</div>
            <div>購入者のみこのページを閲覧できます．</div>
          </div>
          }
     <Rightbar/>
       </div>
    </>
    }
    </>
    );
  
}

export default Weather