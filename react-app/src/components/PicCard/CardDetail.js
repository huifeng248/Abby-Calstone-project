import { useState } from "react"
import PostActionModal from "../PostActionModal"
import { DeletePost } from '../../store/post'
import { useDispatch, useSelector } from "react-redux";
import PostModal from '../PostModal'
import { CreateComment, EditComment, Delete_comment } from '../../store/post'
import CommentAction from "../CommentAction";


function CardDetail({ user, post }) {
    const current_user = useSelector(state => state.session.user)
    const [showDiv, setShowDiv] = useState(false)
    const dispatch = useDispatch()
    const [showPostModal, setShowPostModal] = useState(false)
    const [comment, setComment] = useState()
    const [errors, setErrors] = useState([])
    const [showComments, SetShowComments] = useState(false)
    // const [showCommentAction, setShowCommentAction] = useState(false)

    function FocusEventListener() {
        document.getElementById("text").focus();
    }


    const deletePostOnclick = async (postId) => {
        const response = await dispatch(DeletePost(postId));
        if (response) {
            window.alert('Post is successfully deleted!')
        }
    }

    const deleteCommentOnclick = async (post_id, comment_id) => {
        const response = await dispatch(Delete_comment(post_id, comment_id))
        if (response) {
            window.alert('Comment is successfully deleted!')
        }
    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const error_arr = []
        if (!comment || comment.trimEnd().length === 0) {
            error_arr.push('Please enter a valid comment')
            setErrors(error_arr)
        } else if (comment.trimEnd().length > 1000) {
            error_arr.push('Comment must be within 1000 characters')
            setErrors(error_arr)
        } else {

            const create_comment_payload = {
                comment: comment,
                post_id: post.id,
                user_id: current_user.id
            }
            dispatch(CreateComment(create_comment_payload))
                .catch(async (data) => {
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                })
            setComment("")

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
                        onClick={() => setShowPostModal(true)}
                    > Edit post
                    </div>
                    <PostModal user={current_user} post={post} setShowPostModal={setShowPostModal} showPostModal={showPostModal} />
                    <div className='action_div'
                        onClick={() => deletePostOnclick(post.id)}
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
            <div className='counts_container'>
                <div className='like_counts_container'>
                    <i className="fa-solid fa-thumbs-up likecount"></i>
                    <div className="count_number">
                        {post.user_post_likes ? post.user_post_likes : null}
                    </div>
                </div>
                <div onClick={() => SetShowComments(!showComments)}
                    className="comment_counts_container">
                    <div className="count_number">{post.comments.length ? post.comments.length : null}</div>
                    <div className="count_number">Comments</div>
                </div>

            </div>


            <div className="below_post_line">
                <div className="Image_likes">
                    <div>
                        <i className="fa-regular fa-thumbs-up"></i>
                    </div>
                    <div>Like</div>
                </div>
                <div className="Comments_signs" onClick={() => FocusEventListener()}>
                    <div>
                        <i className="fa-regular fa-comment"></i>
                    </div>
                    <div> Comment</div>
                </div>
            </div>
            {showComments &&
                <div >
                    {
                        post.comments.length > 0 && post.comments.map((comment, index) => {
                            return <div className="comment_inner_container">
                                <div>
                                    <img className="user_profile_image" src={post.user.profile_img}></img>
                                </div>
                                <div className="comment_and_user_name">
                                    <div>{comment.user.first_name} {comment.user.last_name}</div>
                                    <div key={index}>{comment.comment}</div>
                                </div>
                                {
                                    current_user.id === comment.user.id &&
                                    <CommentAction PostId={post.id} CommentId={comment.id}/>

                                }
                            </div>
                        })
                    }
                </div>
            }




            {errors.length > 0 && <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>}


            <form onSubmit={handleCommentSubmit}>
                <div className="comment_line_container">
                    <div>
                        <img className="user_profile_image" src={user.profile_img}></img>
                    </div>
                    <div className="input_container">
                        <input id="text"
                            className="comment_input"
                            onChange={(e) => {
                                setComment(e.target.value)
                                setErrors([])
                            }}
                            value={comment}
                        ></input>
                    </div>
                    <button type='submit'>Comment</button>
                </div>
            </form>
            <div>
                Comments: {post.comments.length > 0 ? post.comments[(post.comments.length - 1)].comment : null}
            </div>
        </div>
    )

}

export default CardDetail