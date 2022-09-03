import { useState } from "react"
import PostActionModal from "../PostActionModal"
import {DeletePost} from '../../store/post'
import { useDispatch, useSelector } from "react-redux";
import PostModal from '../PostModal'


function CardDetail({ user, post }) {
    const current_user = useSelector(state => state.session.user)
    const [showDiv, setShowDiv] = useState(false)
    const dispatch = useDispatch()
    const [showPostModal, setShowPostModal] = useState(false)



    const deletePostOnclick = async (postId) => {
        const response = await dispatch(DeletePost(postId));
        console.log("##########", response)
        if (response) {
            window.alert('Successfully deleted!')
        }
    }

    return (
        <div>
            <div className="user_edit_line">
                <div className="user_box">
                    <div>
                        <img className="user_profile_image" src={post.user.profile_img}></img>
                    </div>
                    <div className="user_name">
                        {post.user.first_name} {post.user.last_name}
                    </div>
                </div>
                <div className='dropdown'> {/* dropdown   */}
                    <div className="edit_icon"> {/* dropbtn   */}
                        {current_user.id === post.user.id ?
                            <i className="fa-solid fa-ellipsis"
                                onClick={() => { setShowDiv(!showDiv) }}
                            ></i> : null}
                    </div>
                </div>
                {showDiv && <div className='dropdown-content"'>
                    <div className='action_div'
                        onClick={()=>setShowPostModal(true)}
                        > Edit post
                    </div>
                    <PostModal user={current_user} post={post} setShowPostModal={setShowPostModal} showPostModal={showPostModal} />
                    <div className='action_div'
                        onClick={()=>deletePostOnclick(post.id)}
                        > Delete Post
                    </div>
                    <div className='action_div'
                        onClick={() => { setShowDiv(false) }}
                        > Cancel 
                    </div>

                </div>}

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
        </div>
    )

}

export default CardDetail