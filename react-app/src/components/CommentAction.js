import { EditComment, Delete_comment, Load_Posts_Homepage } from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { useEffect } from "react";



function CommentAction({ edit_comment, post }) {
    const PostId = edit_comment.post_id
    const CommentId = edit_comment.id
    const comment_desc = edit_comment.comment


    const dispatch = useDispatch()
    const [showCommentAction, setShowCommentAction] = useState(false)
    const [showEditInput, setShowEditInput] = useState(false)
    const [comment, setComment] = useState(comment_desc)
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user)




    const deleteCommentOnclick = async (post_id, comment_id) => {
        const response = await dispatch(Delete_comment(post_id, comment_id))
        if (response) {
            window.confirm('Are you sure you want to delete this comment?')
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

            const edit_comment_payload = {
                id: CommentId,
                comment: comment,
                post_id: PostId,
                user_id: user.id
            }
            dispatch(EditComment(edit_comment_payload))
                .catch(async (data) => {
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                })

        }
    }

    return (
        <div>

            <div className="comment_inner_container">
                <div>
                    <img className="user_profile_image" src={post.user.profile_img}></img>
                </div>
                <div className="comment_and_user_name">
                    <div>{edit_comment.user.first_name} {edit_comment.user.last_name}</div>
                    <div>{edit_comment.comment}</div>
                </div>

                {
                    user.id === edit_comment.user.id &&


                    <div className="dot_div">
                        <i onClick={() => {
                            // console.log(index)
                            setShowCommentAction(!showCommentAction)
                        }}
                            className="fa-solid fa-ellipsis"></i>
                        {showCommentAction &&
                            <div className="comment_buttons">
                                <button
                                    onClick={() => {
                                        setShowEditInput(!showEditInput)
                                        setShowCommentAction(false)
                                    }
                                    }>Edit</button>


                                <button onClick={() => deleteCommentOnclick(PostId, CommentId)} >Delete</button>
                            </div>}
                    </div>}
            </div>

            {showEditInput && <form onSubmit={handleCommentSubmit}>
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
            </form>}

        </div>
    )
}

export default CommentAction