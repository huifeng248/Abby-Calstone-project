import React, { useEffect, useState } from "react";
import PostModal from "../PostModal";



function PostCreateBox({user}) {
    const [showPostModal, setShowPostModal] = useState(false)
    return (
        <div className="create_post_container">
            <div>
                <img className="user_profile_image" src={user.profile_img}></img>
            </div>
            <input className="post_input"
                placeholder={`What's on your mind, ${user.first_name}?`}
                onClick={()=>setShowPostModal(true)}>
            </input>
            {showPostModal && <PostModal user={user} showPostModal={showPostModal} setShowPostModal={setShowPostModal}/>}
            
        </div>
    )
}

export default PostCreateBox