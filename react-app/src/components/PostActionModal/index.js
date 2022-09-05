import { Modal } from '../../context/Modal'
import './PostActionModal.css'
import PostModal from '../PostModal'
import { useState, useEffect } from 'react';
import { DeletePost } from '../../store/post'
import { useDispatch} from "react-redux";


function PostActionModal({ user, post, ShowPostActionModal, setShowPostActionModal}) {
    const [showPostModal, setShowPostModal] = useState(false)
    const dispatch = useDispatch()


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