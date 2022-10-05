import { CreateComment, EditComment } from '../../store/post'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import "./PicCard.css"

function CommentForm({ comment, post, setShowEditInput }) {
    const [errors, setErrors] = useState([])
    const [commentDesc, setCommentDesc] = useState()
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (comment) {
            setCommentDesc(comment.comment)
        }
    }, [comment])
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const error_arr = []
        if (!commentDesc || commentDesc.trimEnd().length === 0) {
            error_arr.push('Please enter a valid comment')
            setErrors(error_arr)
        } else if (commentDesc.trimEnd().length > 1000) {
            error_arr.push('Comment must be within 1000 characters')
            setErrors(error_arr)
        } else {
            if (!comment) {
                const create_comment_payload = {
                    comment: commentDesc,
                    post_id: post.id,
                    user_id: user.id
                }
                dispatch(CreateComment(create_comment_payload))
                    .catch(async (data) => {
                        if (data && data.errors) {
                            setErrors(data.errors)
                        }
                    })
                setCommentDesc("")
            } else {
                const edit_comment_payload = {
                    user_id: user.id,
                    id: comment.id,
                    post_id: post.id,
                    comment: commentDesc
                }
                dispatch(EditComment(edit_comment_payload))
                    .catch(async (data) => {
                        if (data && data.errors) {
                            setErrors(data.errors)
                        }
                    })
                setShowEditInput(false)
            }
        }
    }





    return <div className='comment_form_container'>
        {errors.length > 0 && <div className='comment_error_message_ul'>
            {errors.map((error, index) => (
                <div key={index}>{error}</div>
            ))}
        </div>}

        <form onSubmit={handleCommentSubmit}>
            {/* <div className='comment_line_container_wrapper'> */}


            <div className="comment_line_container">
                <div>
                    <img className="user_profile_image" src={user.profile_img}></img>
                </div>
                <div className="input_container">
                    <input id={`${post.id}text`}
                        className="comment_input"
                        onChange={(e) => {
                            setCommentDesc(e.target.value)
                            setErrors([])
                        }}
                        placeholder="Write a comment..."
                        value={commentDesc}
                    ></input>
                </div>
                {/* </div> */}
                <div className='button_wrapper'>
                    <button className="save_button" type='submit'>{comment ? "Save" : "Comment"}</button>
                    {comment && <button className="cancel_edit_button" onClick={() => setShowEditInput(false)}>Cancel</button>}
                </div>
            </div>
        </form>
    </div>
}

export default CommentForm