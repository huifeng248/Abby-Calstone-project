import { Modal } from '../../context/Modal'
import './PostActionModal.css'
import { NavLink } from 'react-router-dom';
import PostModal from '../PostModal'
import { useState } from 'react';
import {DeletePost} from '../../store/post'
import { useDispatch, useSelector } from "react-redux";


function PostActionModal({user, post, ShowPostActionModal, setShowPostActionModal}) {
    const [showPostModal, setShowPostModal] = useState(false)
    const dispatch = useDispatch()

    // const deletePostOnclick = async (post.id) => {
    //     const response = await dispatch(DeletePost(post.id))
    //     if (response.ok) {
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
            <Modal onClose={()=>setShowPostActionModal(false)}>
                <div className='post_action_button'>
                    <button onClick={()=> {
                        setShowPostActionModal(false)
                        setShowPostModal(true)
                        }}>
                            Edit Post</button> 
                    <PostModal user={user} post={post} setShowPostModal={setShowPostModal} showPostModal={showPostModal} />
                    <button onClick={()=> deletePostOnclick()}
                    >Delete Post</button>
                    <button onClick={()=> setShowPostActionModal(false)}>Cancel</button>
                </div>
            </Modal>}
        </div>
    )
}

export default PostActionModal