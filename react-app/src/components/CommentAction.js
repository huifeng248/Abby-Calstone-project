import { Delete_comment, ToggleCommentLike } from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import CommentForm from './PicCard/CommentForm'
import "./CommentAction.css"




function CommentAction({ post, comment }) {
    const current_user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [showCommentAction, setShowCommentAction] = useState(false)
    const [commentLikeStatus, setCommentLikeStatus] = useState(false)
    const [showEditInput, setShowEditInput] = useState(false)


    useEffect(()=>{
        comment.user_comment_likes.forEach(user_ele => {
            if (user_ele.id === current_user.id){
                setCommentLikeStatus(true)
            } 
        }) 
    }, [])


    const deleteCommentOnclick = async (post_id, comment_id) => {
        const response = await dispatch(Delete_comment(post_id, comment_id))
        if (response) {
            window.alert('Comment is successfully deleted!')
        }
    }

    const toggleACommentLike = async (comment) => {
        await dispatch(ToggleCommentLike(comment))
    }



    useEffect(() => {
        if (!showCommentAction) return;
        const closeCommentDivMenu = () => setShowCommentAction(false);
        document.addEventListener("click", closeCommentDivMenu);
        return () => document.removeEventListener("click", closeCommentDivMenu);
    }, [showCommentAction]);



    return (
        <div>

            <div className="comment_info_box">
                {!showEditInput && <div className='wrapper_comment'>
                    <div>
                        <img className="user_profile_image" src={post.user.profile_img} alt="profile_image"></img>
                    </div>
                    <div className='comment_like_wrapper'>
                        <div className="comment_and_user_name">
                            <div>{comment.user.first_name} {comment.user.last_name}</div>
                            <div className='comment_disc_container'>{comment.comment}</div>
                        </div>
                        <div className='like-wrapper'>
                            <div className='like_character_pointer'
                                onClick={()=>{
                                    toggleACommentLike(comment)
                                    setCommentLikeStatus(!commentLikeStatus)
                                }}>{comment.total_comment_likes} Like</div>

                            {/* {commentLikeStatus? 
                                    <i className="fa-solid fa-thumbs-up margin-top"></i>
                                :
                                <i className="fa-regular fa-thumbs-up likecount margin-top"></i>
                            } */}
                            {commentLikeStatus &&
                                    <i className="fa-solid fa-thumbs-up margin-top"></i>}
                           
                        </div>
                    </div>

                    {
                        current_user.id === comment.user.id &&
                        <div className="dot_div_container"
                            onClick={() => {
                                // console.log(index)
                                setShowCommentAction(!showCommentAction)
                            }}>
                            <i className="fa-solid fa-ellipsis"></i>
                            {showCommentAction &&
                                <div className="comment_buttons_container">
                                    <div className='button-wrapper'
                                        onClick={() => setShowEditInput(!showEditInput)}
                                    >
                                        <button className="comment_edit_delete_buttons"
                                        >Edit</button>
                                    </div>
                                    <div className='button-wrapper'
                                        onClick={() => deleteCommentOnclick(post.id, comment.id)}
                                    >
                                        <button className="comment_edit_delete_buttons"
                                        >Delete</button>
                                    </div>
                                </div>}

                        </div>

                    }
                </div>}
                {showEditInput &&
                    <div className='edit_comment_container'>
                        <CommentForm comment={comment} post={post} setShowEditInput={setShowEditInput} showEditInput={showEditInput} />
                        {/* <button className="cancel_edit_button" onClick={() => setShowEditInput(false)}>Cancel</button> */}
                    </div>}
            </div>










            {/* {errors.length > 0 && <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>} */}

            {/* {showEditInput && <form onSubmit={handleCommentSubmit}>
                <div className="comment_line_container">
                    <div>
                        <img className="user_profile_image" src={user.profile_img}></img>
                    </div>
                    <div className="input_container">
                        <input id="text"
                            className="comment_input"
                            onChange={(e) => {
                                setCommentDesc(e.target.value)
                                setErrors([])
                            }}
                            value={commentDesc}
                        ></input>
                    </div>
                    <button type='submit'>Comment</button>
                </div>
            </form>} */}

        </div>
    )
}

export default CommentAction