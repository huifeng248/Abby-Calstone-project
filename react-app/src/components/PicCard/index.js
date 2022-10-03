import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Load_Posts_Homepage } from '../../store/post'
import PostCreateBox from './PostCreateBox'
import CardDetail from './CardDetail'
import './PicCard.css'
import SideBar from "../SideBar";
import SideBarWhole from '../SideBarWhole'


function PicCard() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.Posts)
    const temp_arr = Object.values(posts)
    const post_arr = temp_arr.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })


    useEffect(() => {
        dispatch(Load_Posts_Homepage())
            .then(() => (setLoaded(true)))
    }, [dispatch, user])

    // return "this is homepage"
    return (
        <div className="main_page_container">
            <SideBarWhole />

            <div className="outer_container">
                <PostCreateBox user={user} />
                {/* <div className="create_post_container">
                <div>
                    <img className="user_profile_image" src={user.profile_img}></img>
                </div>
                <input className="post_input"
                    placeholder={`What's on your mind, ${user.first_name}?`}></input>
            </div> */}
                {loaded && post_arr.map((post, index) => {
                    return <div key={index} className="post_card_container">
                        <CardDetail user={user} post={post} />
                    </div>
                })}
            </div>
        </div>
    )

}

export default PicCard