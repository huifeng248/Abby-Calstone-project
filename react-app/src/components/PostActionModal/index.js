import { Modal } from '../../context/Modal'
import './PostActionModal.css'
import PostModal from '../PostModal'
import { useState } from 'react';
import { DeletePost } from '../../store/post'
import { useDispatch} from "react-redux";


function PostActionModal({ user, post, ShowPostActionModal, setShowPostActionModal}) {
    const [showPostModal, setShowPostModal] = useState(false)
    const dispatch = useDispatch()
    

    // const deletePostOnclick = async (postId) => {
    //     const response = await dispatch(DeletePost(postId));
    //     console.log("##########", response)
    //     if (response) {
    //         window.alert('Successfully deleted!')
    //     }
    // }

    // const deletePostOnclick = async (post.id) => {
	// 	if (
	// 		window.confirm(
	// 			"Do you really want to delete this Image? This action can not be undone!"
	// 		)
	// 	) {
	// 		const response = await dispatch(DeleteImage(imageId));
	// 		if (response) {
	// 			window.alert(
	// 				"Successfully deleted the Image, Click OK to bring you back to the home page"
	// 			);
	// 			history.push(`/`);
	// 		}
	// 	}
	// };


    return (
        <div>
            {ShowPostActionModal &&
                <Modal post={post} onClose={() => setShowPostActionModal(false)}>
                    <div className='post_action_button'>
                        <button onClick={() => {
                            setShowPostActionModal(false)
                            setShowPostModal(true)
                        }}>
                            Edit Post</button>
                        <PostModal user={user} post={post} setShowPostModal={setShowPostModal} showPostModal={showPostModal} />
                        <button onClick={()=> {dispatch(DeletePost(post.id))}}
                        >Delete Post</button>
                        <button onClick={() => setShowPostActionModal(false)}>Cancel</button>
                    </div>
                </Modal>}
        </div>
    )
}

export default PostActionModal