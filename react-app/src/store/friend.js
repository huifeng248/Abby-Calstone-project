const GET_Friends_Requested = "GET_Friends_requested"
const Get_Friends_Suggestions = "GET_Friends_suggestions"
const Get_Mutual_Friends = "GET_Mutual_Friends"

const get_friends_requested_action = (friends) => ({
    type: GET_Friends_Requested,
    friends
})




// thunk: get all requested friends
export const get_friends_requested = () => async(dispatch) => {
    const response = await fetch('/api/friends/receive')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_friends_requested_action(data))
        return data
    }
}


export const get_sent_requests = () => async(dispatch) => {
    const response = await fetch('/api/friends/request')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_friends_requested_action(data))
        return data
    }
}

const Friends = ( state ={}, action) => {
    let newState = {}
    switch(action.type) {
        case GET_Friends_Requested: {
            action.friends.forEach(friend => {
                newState[friend.friend_id] = friend
            });
            return newState
        }

        default:
            return state
    }
}

export default Friends