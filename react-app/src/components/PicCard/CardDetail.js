import { useSelector } from "react-redux"

function CardDetail({ user, post }) {
    const current_user = useSelector(state => state.session.user)
    console.log("ooooooooooooooo", user)
    return (
        <div>
            <div className="user_edit_line">
            <div className="user_box">
                <div>
                    <img className="user_profile_image" src={post.user.profile_img}></img>
                </div>
                <div className="user_name">
                    {post.user.first_name} {post.user.last_name}
                </div>
            </div>
            <div>
            <div className="edit_icon">
                    {current_user.id === post.user.id? <i class="fa-solid fa-ellipsis"></i> : null}
            </div>
            </div>

            </div>
            <div> {post.description}</div>
            <div>
                <img className='post_image' src={post.url}></img>
            </div>
            <div className="below_post_line">
                <div className="Image_likes">
                    <div>
                        <i className="fa-solid fa-thumbs-up"></i>
                    </div>
                    <div>Like</div>
                </div>
                <div className="Comments_signs">
                    <div>
                        <i className="fa-regular fa-comment"></i>
                    </div>
                    <div> Comment</div>
                </div>
            </div>
            <div className="comment_line_container">
                <div>
                    <img className="user_profile_image" src={user.profile_img}></img>
                </div>
                <div className="input_container">
                    <input className="comment_input"></input>
                </div>
                <button>Comment</button>

            </div>
        </div>
    )

}

export default CardDetail