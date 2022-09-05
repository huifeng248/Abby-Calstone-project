import { EditComment, Delete_comment } from '../store/post'
import { useDispatch, useSelector } from "react-redux";



function CommentAction({ PostId, CommentId,showCommentAction }) {
    const dispatch = useDispatch()

    const deleteCommentOnclick = async (post_id, comment_id) => {
        const response = await dispatch(Delete_comment(post_id, comment_id))
        if (response) {
            window.alert('Comment is successfully deleted!')
        }
    }

    return (
      
        showCommentAction && 
            <div className="comment_buttons">
                <button>Edit</button>
                <button onClick={() => deleteCommentOnclick(PostId, CommentId)} >Delete</button>
            </div>
        

    )
}

export default CommentAction