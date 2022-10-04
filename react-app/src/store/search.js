const SEARCH_USER = 'session/SEARCH_USER'


const searchUser = (users) => ({
    type: SEARCH_USER,
    users
})



export const search_user_by_name = (searchItem) => async (dispatch) => {
    const response = await fetch('/api/users/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(searchItem)
    })
    if (response.ok) {
        const search_result = await response.json()
        dispatch(searchUser(search_result))
        return search_result
    }
}

const Search = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case SEARCH_USER:
            action.users.forEach(user => {
                newState[user.id] = user
            });
            return newState
        default:
            return state;
    }
}

export default Search