import { Modal } from '../../context/Modal'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { CreatePost, EditPost } from '../../store/post'
import './PostModal.css'


function PostModal({ user, post, setShowPostModal, showPostModal }) {
    const [description, setDescription] = useState()
    const [url, setUrl] = useState()
    const [errors, setErrors] = useState([]);
    const [isValid, setIsValid] = useState(false)

    const dispatch = useDispatch()

    // this will populate the data for the edit
    useEffect(() => {
        if (post) {
            setDescription(post.description)
            setUrl(post.url)
        }
    }, [post])

    function checkImageUrl(post_url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(post_url);
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors_arr = []

        if (!description || description.trimEnd().length === 0) {
            errors_arr.push('Please provide a valid post')
        }
        if (description && description.trimEnd().length > 3000) {
            errors_arr.push('Description must be within 3000 characters')
        }
        if (!url || url.trimEnd().length === 0) {
            errors_arr.push('Please provide a valid image url')
        }
        if (!isValid) {
            errors_arr.push('Please provide a valid image url that ends with jpg, jpeg, png, webp, avif, gif, or svg')
        }
        if (url.includes(' ')) {
			errors_arr.push(
				'Cannot have an empty space in the url!'
			)
		}
        if (url.includes("File:")) {
			errors_arr.push(
				'Invalid URL: URL must not include "File:", Please use original image address'
			);
		}
        if (errors_arr.length > 0) {
            return setErrors(errors_arr)
        }
        // create a post  
        if (!post) {
            const create_post_payload = {
                description,
                url
            }

            dispatch(CreatePost(create_post_payload))
                // .then(() => onClose())
                .catch(async (data) => {
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                })
            setShowPostModal(false)
        } else {
            const edit_post_payload = {
                id: post.id,
                description,
                url
            }
            dispatch(EditPost(edit_post_payload))
                // .then(() => onClose())
                .catch(async (data) => {
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                })
            setShowPostModal(false)
        }
    }

    return (
        <div>
            {showPostModal &&
                <Modal onClose={() => setShowPostModal(false)}>
                    <div className='create_post_form_container'>
                        <div className='post_title_wrapper'>
                            <div className='post_form_title'>{post ? "Edit post" : "Create post"}</div>
                            <i onClick={() => { setShowPostModal(false) }}
                                className="fa-solid fa-x cancel_post_button"></i>
                        </div>

                        {errors.length > 0 && <ul className='Post_error_message_container'>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>}
                        <div className="user_box">
                            <div>
                                <img className="user_profile_image" src={user.profile_img}></img>
                            </div>
                            <div className="user_name">
                                {user.first_name} {user.last_name}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <div className='post_info_container'>
                                <div className='post_info_div'>
                                    <textarea className="post_description"
                                        placeholder="What's on your mind, Hui?"
                                        onChange={(e) => 
                                            {setDescription(e.target.value)
                                            setErrors([])}}
                                        value={description}
                                    >
                                    </textarea>
                                </div>

                                <div className='post_info_div'>
                                    <textarea className="post_url"
                                        placeholder='Image url here...'
                                        onChange={(e) => {
                                            setUrl(e.target.value)
                                            setIsValid(checkImageUrl(e.target.value))
                                            console.log("*******check image url",checkImageUrl(e.target.value) )
                                            setErrors([])}}
                                        value={url}
                                        type="url"
                                    >
                                    </textarea>
                                </div>

                                <div className="post_image_preview_container">
                                    {isValid? 
                                    <img className='post_image_preview_holder' src={url}></img>
                                    : <img className='post_image_preview_holder' src="https://community.clover.com/themes/base/admin/img/default-coverImage.png"></img>}
                                </div>
                            </div>
                            <div className='button_container'>
                            <button className="post_submit_button" type='submit'
                            > {post ? "Save" : "Post"}</button>
                            </div>
                        </form>
                    </div>
                </Modal>}
        </div>
    )
}

export default PostModal