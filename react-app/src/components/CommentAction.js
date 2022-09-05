import { EditComment, Delete_comment } from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"




function CommentAction({ PostId, CommentId, comment }) {
    const dispatch = useDispatch()
    const [showCommentAction, setShowCommentAction] = useState(false)
    const [commentDesc, setCommentDesc] = useState()
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const [showEditInput, setShowEditInput] = useState(false)


    const deleteCommentOnclick = async (post_id, comment_id) => {
        const response = await dispatch(Delete_comment(post_id, comment_id))
        if (response) {
            window.alert('Comment is successfully deleted!')
        }
    }

    useEffect(() => {
        if (comment){
            setCommentDesc(comment.comment)
        }
    }, [comment])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        let errors_arr = []
        if (!commentDesc) {
            errors_arr.push('Please provide a valid comment')
        }
        if (errors_arr.length > 0) {
            return setErrors(errors_arr)
        }
        const edit_comment_payload = {
            user_id: user.id,
            id: CommentId,
            post_id: PostId,
            comment: commentDesc
        }
        dispatch(EditComment(edit_comment_payload))
            .catch(async (data) => {
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })
    }



    return (
        <div>
            <div className="dot_div"
                onClick={() => {
                    // console.log(index)
                    setShowCommentAction(!showCommentAction)
                }}>
                <i className="fa-solid fa-ellipsis"></i>
                {showCommentAction &&
                    <div className="comment_buttons">
                        <button onClick={()=> setShowEditInput(!showEditInput)}>Edit</button>
                        <button onClick={() => deleteCommentOnclick(PostId, CommentId)} >Delete</button>
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
                                setCommentDesc(e.target.value)
                                setErrors([])
                            }}
                            value={commentDesc}
                        ></input>
                    </div>
                    <button type='submit'>Comment</button>
                </div>
            </form>}
        
        </div>
    )
}

export default CommentAction