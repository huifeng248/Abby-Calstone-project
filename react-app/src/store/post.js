const GET_POSTS_HomePage = "GET_Post_Homepage"
const Get_POST_UserProfile = "Get_Post_UserProfile"
const ADD_POST = "ADD_Post"
const UPDATE_POST = "UPDATE_Post"
const DELETE_POST = "DELETE_Post"


const get_posts_action = (posts) =>({
    type: GET_POSTS_HomePage,
    posts
})

const create_post_action = (post)=>({
    type: ADD_POST,
    post

})
// get all post in home page
export const Load_Posts_Homepage = () => async(dispatch) => {
    const response = await fetch('/api/posts')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_posts_action(data))
        return data
    } 
}

// create a post
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

const initialState = {}
const Posts = (state = initialState, action) => {
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
        default:
			return state;
    }
}

export default Posts