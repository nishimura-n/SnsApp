import React, {useEffect, useState} from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TimeLine from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import "./Profile.css"
import axios from "axios"
import { useParams } from 'react-router-dom';

function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user,setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, [username]);//usernameを追加(udemyではusernameを変えても更新していなかった)
  return (
    <>
    <Topbar/> 
    <div className="profile">
     <Sidebar/>
     <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
                <img src={PUBLIC_FOLDER + "/post/3.jpeg"} alt="" className='profileCoverImg' />
                <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className='profileUserImg'/>
            </div>
            <div className="profileInfo">
                <h4 className={user.isBuyer ? "profileInfoBuyerName" : "profileInfoName"}>{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
        </div>
       <div className="profileRightBottom">
        <TimeLine username={username} />
        <Rightbar user={user} />
       </div>
     </div>
    </div>
    </>
  )
}

export default Profile