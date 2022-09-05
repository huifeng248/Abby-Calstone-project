import { EditComment, Delete_comment } from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"




function CommentAction({ PostId, CommentId, comment }) {
    const dispatch = useDispatch()
    const [showCommentAction, setShowCommentAction] = useState(false)
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const [commentDesc, setCommentDesc] = useState()
    const [showEditInput, setShowEditInput] = useState(false)


    const deleteCommentOnclick = async (post_id, comment_id) => {
        const response = await dispatch(Delete_comment(post_id, comment_id))
        if (response) {
            window.alert('Comment is successfully deleted!')
        }
    }

    // useEffect(() => {
    //     if (comment) {
    //         setCommentDesc(comment.comment)
    //     }
    // }, [comment])

    useEffect(() => {
        if (!showCommentAction) return;
        const closeCommentDivMenu = () => setShowCommentAction(false);
        document.addEventListener("click", closeCommentDivMenu);
        return () => document.removeEventListener("click", closeCommentDivMenu);
    }, [showCommentAction]);

    // const handleCommentSubmit = async (e) => {
    //     e.preventDefault()
    //     let error_arr = []
    //     if (!commentDesc || commentDesc.trimEnd().length === 0) {
    //         error_arr.push('Please provide a valid comment')
    //         setErrors(error_arr)
    //     } else if (commentDesc.trimEnd().length > 1000) {
    //         error_arr.push('Comment must be within 1000 characters')
    //         setErrors(error_arr)
    //     } else {

    //         const edit_comment_payload = {
    //             user_id: user.id,
    //             id: CommentId,
    //             post_id: PostId,
    //             comment: commentDesc
    //         }
    //         dispatch(EditComment(edit_comment_payload))
    //             .catch(async (data) => {
    //                 if (data && data.errors) {
    //                     setErrors(data.errors)
    //                 }
    //             })
    //         setShowEditInput(false)
    //     }
    // }



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
                        <button onClick={() => setShowEditInput(!showEditInput)}>Edit</button>
                        <button onClick={() => deleteCommentOnclick(PostId, CommentId)} >Delete</button>
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