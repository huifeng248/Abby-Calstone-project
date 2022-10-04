

const LOAD_Friends = "LOAD_Friends"
const GET_Friends_Suggestions = "GET_Friends_suggestions"
const GET_Mutual_Friends = "GET_Mutual_Friends"
const ACCEPT_Request = "ACCEPT_Friend_Request"
const DELETE_Request_and_Friend = "DELETE_Request_and_Friend"
const REJECT_Request = "REJECT_Request"
const SEND_ADD_Friend_Request = "SEND_ADD_Friend_Request"


const load_friends_action = (friends) => ({
    type: LOAD_Friends,
    friends
})

const accept_friend_request_action = (friend) =>({
    type: ACCEPT_Request,
    friend
})

const add_friend_action = (friend) =>({
    type: SEND_ADD_Friend_Request,
    friend
})

const delete_friends_action = (friendshipId) => ({
    type: DELETE_Request_and_Friend,
    friendshipId
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

//thunk: add friends: from suggestion tab
export const send_add_friend_request = (friendId) => async(dispatch) =>{
    
    const response = await fetch(`/api/friends/${friendId}`, {
        method: 'POST',
        headers:{
			"Content-Type": "application/json"
        },
    })
    if (response.ok) {
        const new_friend = await response.json()
        console.log("FFFFFID", friendId)
        dispatch(add_friend_action(new_friend))
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

// thunk: delete: cancel send request 

export const delete_request_and_friend = (friendshipId) => async(dispatch) => {
    console.log("friendshipId++++++++++", friendshipId)
    
    const response = await fetch(`/api/friends/${friendshipId}`, {
        method: 'DELETE',
        headers:{
        "Content-Type": "application/json"
        },
    }  
    )
    console.log("friendshipId -----------", friendshipId)
    if (response.ok) {
        const data = await response.json()
        dispatch(delete_friends_action(friendshipId))
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
            newState = { ...state };
            delete newState[action.friend.id]

            return newState
        }
        case SEND_ADD_Friend_Request: {
            newState = { ...state };
            // console.log("*******", action.friend.friend_id, "+++++ID", action.friend.id)
            delete newState[action.friend.user_id]
            return newState
        }
        case DELETE_Request_and_Friend: {
            newState = {...state}
            // console.log("~~~~~~~~~", action.friendshipId)
            delete newState[action.friendshipId]
            return newState
        }

        default:
            return state
    }
}

export default Friends