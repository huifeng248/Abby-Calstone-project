import { Modal } from '../../context/Modal'
import './PostActionModal.css'
import { NavLink } from 'react-router-dom';

function PostActionModal({user, post, showModal, setShowModal}) {
    return (
        <div>
            {showModal && 
            <Modal onClose={()=>setShowModal(false)}>
                <div className='post_action_button'>
                    <button>Edit Post</button>
                    <button>Delete Post</button>
                    <button onClick={()=> setShowModal(false)}>Cancel</button>
                </div>
                {console.log("#######", user)}
                {console.log("((((((((((((", post)}

            </Modal>}
        </div>
    )
}

export default PostActionModal