import PicCard from "./PicCard"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPostByUser } from '../store/post'
import PostCreateBox from "./PicCard/PostCreateBox";
import CardDetail from "./PicCard/CardDetail";
import './PicCard/PicCard.css'

const PostByUser = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    console.log("$$$$$$$", user.id, user.first_name)
    
    useEffect(() => {
        dispatch(GetPostByUser(user.id))
        .then(() => (setLoaded(true)))
    }, [dispatch, user])
    
    // This need to be after the useEffect. AS the result would be filtered by the user id
    const posts = useSelector(state => state.Posts)
    const post_arr = Object.values(posts)
    return (
        <div className="outer_container">
            <PostCreateBox user={user} />
            {loaded && post_arr.map((post, index) => {
                return <div key={index} className="post_card_container">
                    <CardDetail user={user} post={post} />
                </div>
            })}
        </div>
    )
}

export default PostByUser


