import thunk from "redux-thunk"

const LOAD_Friends = "LOAD_Friends"
const GET_Friends_Suggestions = "GET_Friends_suggestions"
const GET_Mutual_Friends = "GET_Mutual_Friends"
const ACCEPT_Request = "ACCEPT_Friend_Request"
const REJECT_Request = "REJECT_Request"


const load_friends_action = (friends) => ({
    type: LOAD_Friends,
    friends
})

const accept_friend_request_action = (friend) =>({
    type: ACCEPT_Request,
    friend
})





// thunk: get all requested friends
export const get_friends_requested = () => async(dispatch) => {
    const response = await fetch('/api/friends/receive')
    if (response.ok) {
        const data = await response.json()
        dispatch(load_friends_action(data))
        return data
    }
}

// thunk: all request sent by current users
export const get_sent_requests = () => async(dispatch) => {
    const response = await fetch('/api/friends/request')
    if (response.ok) {
        const data = await response.json()
        dispatch(load_friends_action(data))
        return data
    }
}

//thunk: accept friend request
export const accept_friend_request = (id) => async(dispatch) =>{
    const response = await fetch(`/api/friends/${id}`, {
        method: "PUT",
        headers:{
			"Content-Type": "application/json"
        },
    })
    // console.log("___________thunk", id)
    if (response.ok) {
        const data = await response.json()
        dispatch(accept_friend_request_action(data))
    }
}

// thunk: get all mutual friends
export const get_all_friends = () => async(dispatch) => {
    const response = await fetch('/api/friends')
    if (response.ok) {
        const data = await response.json()
        dispatch(load_friends_action(data))
        return data
    }
}

// thunk: get all suggested friends
export const get_suggested_friends = () => async(dispatch) => {
    const response = await fetch('/api/friends/suggest')
    if (response.ok) {
        const data = await response.json()
        dispatch(load_friends_action(data))
        return data
    }
}
//thunk: view all sent request
export const view_sent_request = () => async(dispatch) => {
    const response = await fetch('/api/friends/request')
    if (response.ok) {
        const data = await response.json()
        dispatch(load_friends_action(data))
        return data
    }
}

const Friends = ( state ={}, action) => {
    let newState = {}
    switch(action.type) {
        case LOAD_Friends: {
            action.friends.forEach(friend => {
                // newState[friend.friend_id] = friend
                newState[friend.id] = friend

            });
            return newState
        }
        case ACCEPT_Request: {
            // newState[action.friend.friend_id] = action.friend
            newState[action.friend.id] = action.friend

            return newState
        }

        default:
            return state
    }
}

export default Friends