const GET_POSTS_HomePage = "GET_Post_Homepage"
const Get_POST_UserProfile = "Get_Post_UserProfile"
const ADD_POST = "ADD_Post"
const UPDATE_POST = "UPDATE_Post"
const DELETE_POST = "DELETE_Post"

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
        console.log("!!!!!!!!", new_post)
        return new_post
    }
}

//thunk update a post 
export const EditPost = (post) => async (dispatch) => {
    console.log("goooooooooooooooooo")
    const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
		},
		body: JSON.stringify(post)

    })
    if (response.ok) {
        const updated_image = await response.json()
        console.log("OOOOKKKKKKK", updated_image)
        dispatch(edit_post(updated_image))
        return updated_image
    }
}

//thunk delete a post 
export const DeletePost = (id) => async(dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "Delete"
    })
    console.log("hihihihih")
    if (response.ok) {
        const data = await response.json()
        console.log("99999999", data)
        dispatch(delete_post(id))
        return data
    } else {
        const data = await response.json()
        console.log("99999999", data)
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
            newState = {...state}
            action.posts.forEach(post => {
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
        default:
			return state;
    }
}

export default Posts