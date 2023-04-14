import React, { useContext, useEffect, useState } from 'react'
import MoreVert from '@mui/icons-material/MoreVert'
import "./Post.css"
import axios from "axios";
import {format} from "timeago.js";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user,setUser] = useState({});
  const [currentUser,setCurrentUser] = useState({});
  const { user: token } = useContext(AuthContext);
  const [beforelg, setBeforelg] = useState('');
  const [afterlg, setAfterlg] = useState('ja');
  //インターネット上で使われている言語Top10 url="https://novanexus.jp/know-how/7446/12/08/2021/"
  //googletranslate関数(スプレッドシート)<LanguageApp(本システム)の方が精度が高い・・・translate.google.com(一般的なGoogle翻訳)の翻訳品質と同じくらい良い
  const lgList = [
    { name: '日本語', lg: 'ja' },//日本語はランキング8位
    { name: 'english', lg: 'en' },
    { name: 'Россия', lg: 'ru' },
    { name: 'Español', lg: 'es' },
    { name: 'Türkçe', lg: 'tr' },
    { name: 'فارسی', lg: 'fa' },
    { name: 'Français', lg: 'fr' },
    { name: 'Deutsch', lg: 'de' },
    { name: 'Tiếng Việt', lg: 'vi' },
    { name: '汉语', lg: 'zh' },
  ];

  //ユーザ情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`/users/jwt`,token);
      setCurrentUser(response.data);
    };
    fetchUser();
  }, [token]);

  //投稿情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      //いいねのAPIを叩いていく
      await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id})
    }catch(err){
      console.log(err);
    }
    setLike(isLiked ? like -1 : like + 1);
    setIsLiked(!isLiked);
  }

  const Fetch = (props) => {
    const [posts, setPosts] = useState([]);
    
      useEffect(() => {
        fetch(process.env.REACT_APP_GAS + 'exec?text=' + props.text +'&source='+ beforelg +'&target='+ afterlg , {method: 'GET'})
        .then(response => {
          return response.json();
        })
        .then(data => {
          setPosts(data);
        })
        .catch(error => {
          console.log("失敗しました");
        })
      },[props.text]);
    return(
      <>
      {posts.text}
      </>
    )
}  

  const handleChange = (e) => {
    setBeforelg('');
    setAfterlg(e.target.value);
  }
  
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                  <Link to={`/profile/${user.username}`}>
                  <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER+"/person/noAvatar.png"} alt ="" className="postProfileImg" />
                  </Link>
                  <span className={user.isBuyer ? "postUserBuyername" : "postUsername"}>{user.username}</span>
                  <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="posTopRight">
                  <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span><br/>
                翻訳：<Fetch text={post.desc}/>
                <select onChange={(e) => handleChange(e)}>
                {lgList.map((value,i)=>
                <option value={value.lg} key={i}>
                 {value.name}
                 </option>)}
   		         </select>
                <img src={post.img ? PUBLIC_FOLDER +"/"+ post.img : ""} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PUBLIC_FOLDER+"/heart.png"} alt="" className="likeIcon" onClick={() => handleLike()} />
                    <span className="postLikeCounter">{like}人がいいねを押しました</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}:コメント</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post