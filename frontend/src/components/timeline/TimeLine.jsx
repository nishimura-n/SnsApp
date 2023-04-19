import React, { useContext, useEffect, useState } from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
import "./TimeLine.css"
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';

function TimeLine({ username }) {
  const [posts,setPosts] = useState([]);
  const [user,setUser] = useState({});
  const { user: token } = useContext(AuthContext);
  
  //ユーザ情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/jwt`,token);
      setUser(response.data);
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user._id) return
      const response = username 
      ? await axios.get(`${process.env.REACT_APP_API_URL}/posts/profile/${username}`)//プロフィールの場合
      : await axios.get(`${process.env.REACT_APP_API_URL}/posts/timeline/${user._id}`)//ホームの場合
      setPosts(
        response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      })
      );
    };
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post)=>(
          <Post post={post} key={post._id}/>
        ))}
      </div>
    </div>
  )
}

export default TimeLine