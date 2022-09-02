import { Modal } from '../../context/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {CreatePost} from '../../store/post'
import './PostModal.css'


function PostModal({user, showModal, setShowModal}) {
    const [description, setDescription] = useState()
    const [url, setUrl] = useState()
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    // console.log("@@@@@ at the modal", user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors_arr = []

        if (!description) {
            errors_arr.push('Please provide a valid post')
        }
        if (!url) {
            errors_arr.push('Please provide a valid image url')
        }
        if (errors_arr.length > 0) {
            return setErrors(errors_arr)
        }
        const create_post_payload = {
            description,
            url
        }
        dispatch(CreatePost(create_post_payload))
            .catch(async (data) => {
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })
        setShowModal(false)
    }

    return (
        <div>
            {showModal &&
                <Modal onClose={()=>setShowModal(false)}>
                    <div className='create_post_container'>
                        <div>Create post</div>
                        {errors.length > 0 && (
                            <ul>
                            {console.log("error here")}
                                {errors.map((error, index) => (
                                    <li key={index}>
                                        {error}
                                    </li>
                                ))}
                            </ul>)}
                        <div className="user_box">
                            <div>
                                <img className="user_profile_image" src={user.profile_img}></img>
                            </div>
                            <div className="user_name">
                                {user.first_name} {user.last_name}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>


                            <input className="post_description"
                                placeholder="What's on your mind, Hui?"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            >
                            </input>
                            <input className="post_url"
                                placeholder='Image url here...'
                                onChange={(e) => setUrl(e.target.value)}
                                value={url}
                            >
                            </input>
                            {/* <div> need to change the image size
                                <img className='post_image_preview_holder' src={url}></img>
                            </div> */}
                            <button type='submit'
                            // onClick={()=> setShowModal(false)}
                            > Post</button>
                        </form>
                    </div>
                </Modal>}
        </div>
    )
}

export default PostModal