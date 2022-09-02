const GET_POSTS_HomePage = "GET_Post_Homepage"
const Get_POST_UserProfile = "Get_Post_UserProfile"
const ADD_POST = "ADD_Post"
const UPDATE_POST = "UPDATE_Post"
const DELETE_POST = "DELETE_Post"


const get_posts_action = (posts) =>({
    type: GET_POSTS_HomePage,
    posts
})

export const Load_Posts_Homepage = () => async(dispatch) => {

    const response = await fetch('/api/posts')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_posts_action(data))
        return data
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
        default:
			return state;
    }
}

export default Posts