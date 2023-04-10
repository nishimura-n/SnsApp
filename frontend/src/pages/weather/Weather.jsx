import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import Grid from '@mui/material/Grid';
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Weather.css"

const Weather = () => {
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
    const baseURL = "https://api.openweathermap.org/data/2.5/forecast?q=Osaka,JP&appid=cdc3eda3d8c884127841705c4d430d09&lang=ja&units=metric";

    const [post, setPost] = useState(null);
    const {user: currentUser} = useContext(AuthContext);
  
    useEffect(() => {
      axios.get(baseURL).then((response) => {
        setPost(response.data);
      });
    }, []);
  
    if (!post) return null;
    
    return (
    <>
     <Topbar/> 
       <div className="Container">
         <Sidebar/>
        {currentUser.isBuyer ? 
          <div className="weather">
            <h2 className="title">大阪の気象情報予報</h2>
            <Grid container direction="row" alignItems="center" justify="center" spacing={2}>
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
            <div>不正にこのページに来ないでください．</div>
            <div>購入者のみこのページを閲覧できます．</div>
          </div>
          }
     <Rightbar/>
       </div>
    </>
    );
  
}

export default Weather