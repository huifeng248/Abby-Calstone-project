
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPostByUser } from '../store/post'
import PostCreateBox from "./PicCard/PostCreateBox";
import CardDetail from "./PicCard/CardDetail";
import './PicCard/PicCard.css'
import { useParams } from 'react-router-dom';
import EmptyPost from './EmptyPost'

const PostByUser = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    const { userId } = useParams()
    const posts = useSelector(state => state.Posts)
    const post_arr = Object.values(posts)
    const temp_posts = post_arr.filter(post => post.user.id === Number(userId))
    const filtered_posts = temp_posts.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
    console.log("FFFFFFFFFFFFFF", post_arr)

    // useEffect(() => {
    //     if(!userId) {
    //         return 
    //     }
    //     (async ()=> {
    //         await dispatch(GetPostByUser(userId))
    //         .then(() => (setLoaded(true)))
    //     })();
    // },[dispatch,userId])

    useEffect(() => {
        dispatch(GetPostByUser(userId))
            .then(() => (setLoaded(true)))
    }, [dispatch, userId])

    // This need to be after the useEffect. AS the result would be filtered by the user id
    return (
        <div className="outer_container">
            {/* {console.log("current user Id", user.id)}
            {console.log("user Params id", userId)} */}
            {Number(user.id) === Number(userId) && <PostCreateBox user={user} />}
            {loaded && filtered_posts.length ?
                filtered_posts.map((post, index) => {
                    return <div key={index} className="post_card_container">
                        <CardDetail user={user} post={post} />
                    </div>
                })
            : <EmptyPost />}
        </div>
    )
}

export default PostByUser


