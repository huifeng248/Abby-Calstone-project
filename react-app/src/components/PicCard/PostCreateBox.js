import React, { useEffect, useState } from "react";
import PostModal from "../PostModal";



function PostCreateBox({user}) {
    // console.log("!!!!!!!!!!!!!user", user)
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="create_post_container">
            <div>
                <img className="user_profile_image" src={user.profile_img}></img>
            </div>
            <input className="post_input"
                placeholder={`What's on your mind, ${user.first_name}?`}
                onClick={()=>setShowModal(true)}>
            </input>
            <PostModal user={user} showModal={showModal} setShowModal={setShowModal} />
            
        </div>
    )
}

export default PostCreateBox