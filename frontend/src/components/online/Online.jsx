import React from 'react'

function Online({user}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
       <div className="rightbarProfileImgContaier">
         <img src={PUBLIC_FOLDER+user.profilePicture} alt="" className="rightbarProfileImg"/>
         <span className="rightbarOnline"></span>
       </div>
       <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}

export default Online