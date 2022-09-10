const GET_POSTS_HomePage = "GET_Post_Homepage"
const Get_POST_UserProfile = "Get_Post_UserProfile"
const ADD_POST = "ADD_Post"
const UPDATE_POST = "UPDATE_Post"
const DELETE_POST = "DELETE_Post"

const ADD_COMMENT = "ADD_Comment"
const UPDATE_COMMENT = "UPDATE_Comment"
const DELETE_COMMENT = "DELETE_Comment"

// action: get all post in home page
const get_posts_action = (posts) =>({
    type: GET_POSTS_HomePage,
    posts
})
// action: create a post
const create_post_action = (post)=>({
    type: ADD_POST,
    post
})
const get_profile_post_action = (posts) => ({
    type: Get_POST_UserProfile,
    posts
})
//action: edit a post 
const edit_post = (post) => ({
    type: UPDATE_POST,
    post
})

//action delete a post
const delete_post = (id) =>({
    type: DELETE_POST,
    id
}) 

// action create a comment
const create_comment_action = (comment) =>({
    type: ADD_COMMENT,
    comment
})
//action edit a comment
const edit_comment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

//action delete a comment
const delete_comment = (post_id, comment_id) => ({
    type: DELETE_COMMENT,
    post_id,
    comment_id
})

// thunk: get all post in home page
export const Load_Posts_Homepage = () => async(dispatch) => {
    const response = await fetch('/api/posts')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_posts_action(data))
        return data
    } 
}

// thunk: create a post
export const CreatePost = (post) => async(dispatch) => {
    const response = await fetch('/api/posts/new', {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(post)
    })
    if (response.ok) {
        const new_post = await response.json()
        dispatch(create_post_action(new_post))
        return new_post
    }
}

// thunk: create a comment
export const CreateComment = (comment) => async(dispatch) => {
    const response = await fetch(`/api/posts/${comment.post_id}/comments/new`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(comment)
    })
    if (response.ok) {
        const new_comment = await response.json()
        dispatch(create_comment_action(new_comment))
        return new_comment
    }
}



//thunk update a post 
export const EditPost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
		},
		body: JSON.stringify(post)

    })
    if (response.ok) {
        const updated_image = await response.json()
        dispatch(edit_post(updated_image))
        return updated_image
    }
}

//thunk update a comment 
export const EditComment = (comment) => async (dispatch) => {
    const response = await fetch (`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
		},
		body: JSON.stringify(comment)   
    })
    if (response.ok) {
        const updated_comment = await response.json()
        dispatch(edit_comment(updated_comment))
        return updated_comment
    }

}

//thunk delete a post 
export const DeletePost = (id) => async(dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(delete_post(id))
        return data
    } 
}

// thunk delete a comment 
export const Delete_comment = (post_id, comment_id) => async (dispatch) => {
    const response = await fetch (`/api/comments/${comment_id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(delete_comment(post_id, comment_id))
        return data
    } 

}



//thunk: get all posts for a user
export const GetPostByUser = (id) => async(dispatch) =>{
    const response = await fetch(`/api/posts/users/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get_profile_post_action(data))
        return data
    }
}

// const initialState = {}
const Posts = (state = {}, action) => {
    let newState ={}
    switch(action.type) {
        case GET_POSTS_HomePage :{
            // console.log("go herer in the reducer", action.posts[0])
            action.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState
        }
        case ADD_POST:
            newState = {...state}
            newState[action.post.id] = action.post
            return newState
        case Get_POST_UserProfile:
            // newState = {...state} // this one just adding more post to the state
            newState={} //this would clear the state and have a new stare by the data fetch back
            action.posts.length && action.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState
        case UPDATE_POST:
            newState = {...state}
            newState[action.post.id] = action.post
            return newState
        case DELETE_POST:
            newState = {...state}
            delete newState[action.id]
            return newState
        case ADD_COMMENT:
            newState = {...state}
                    // need to revisit the data structure and see if the update one has the user info
            newState[action.comment.post_id].comments.push(action.comment)
            return newState
        case UPDATE_COMMENT:
            newState = {...state}
            newState[action.comment.post_id].comments.forEach((comment, index) => {
                if (comment.id === action.comment.id) {
                    // need to revisit the data structure and see if the update one has the user info
                    newState[action.comment.post_id].comments[index] = action.comment
                }
            })
            return newState
        case DELETE_COMMENT:
            newState = {...state}
            newState[action.post_id].comments.forEach((comment, index)=> {
                if (comment.id === action.comment_id) {
                    newState[action.post_id].comments.splice(index,1)
                }
            })
            return newState
        default:
			return state;
    }
}

export default Posts