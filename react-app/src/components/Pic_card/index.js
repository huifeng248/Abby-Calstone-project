import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Load_Posts_Homepage } from '../../store/post'
import Post_Create_Box from './Post_Create_Box'
import CardDetail from './Card_Detail'
import './Pic_Card.css'

function PicCard() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.Posts)
    const post_arr = Object.values(posts)
    console.log("current user!!!!!!!!", user)

    useEffect(() => {
        dispatch(Load_Posts_Homepage())
            .then(() => (setLoaded(true)))
    }, [dispatch, user])

    // return "this is homepage"
    return (
        <div className="outer_container">
            <Post_Create_Box user={user}/>
            {/* <div className="create_post_container">
                <div>
                    <img className="user_profile_image" src={user.profile_img}></img>
                </div>
                <input className="post_input"
                    placeholder={`What's on your mind, ${user.first_name}?`}></input>
            </div> */}
            {loaded && post_arr.map((post, index) => {
                return <div key={index} className="post_card_container">
                    <CardDetail user={user} post={post}/>
                    {/* <div>

                        <div className="user_box">
                            <div>
                                <img className="user_profile_image" src={post.user.profile_img}></img>
                            </div>
                            <div className="user_name">
                                {post.user.first_name} {post.user.last_name}
                            </div>
                        </div>
                        <div> {post.description}</div>
                        <div>
                            <img className='post_image' src={post.url}></img>
                        </div>
                        <div className="below_post_line">
                            <div className="Image_likes">
                                <div>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                </div>
                                <div>Like</div>
                            </div>
                            <div className="Comments_signs">
                                <div>
                                    <i className="fa-regular fa-comment"></i>
                                </div>
                                <div> Comment</div>
                            </div>
                        </div>
                        <div className="comment_line_container">
                            <div>
                                <img className="user_profile_image" src={user.profile_img}></img>
                            </div>
                            <div className="input_container">
                                <input className="comment_input"></input>
                            </div>
                            <button>Comment</button>

                        </div>
                    </div> */}

                </div>
            })}
        </div>
    )

}

export default PicCard