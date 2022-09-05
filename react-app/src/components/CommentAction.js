import { EditComment, Delete_comment } from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"




function CommentAction({ PostId, CommentId }) {
    const dispatch = useDispatch()
    const [showCommentAction, setShowCommentAction] = useState(false)


    const deleteCommentOnclick = async (post_id, comment_id) => {
        const response = await dispatch(Delete_comment(post_id, comment_id))
        if (response) {
            window.alert('Comment is successfully deleted!')
        }
    }

    return (
        <div className="dot_div"
        onClick={() => {
            // console.log(index)
            setShowCommentAction(!showCommentAction)
        }}>
        <i className="fa-solid fa-ellipsis"></i>
        {showCommentAction &&
            <div className="comment_buttons">
                <button>Edit</button>
                <button onClick={() => deleteCommentOnclick(PostId, CommentId)} >Delete</button>
            </div>}
    </div>
    )
}

export default CommentAction