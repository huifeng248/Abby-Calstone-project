import { get_suggested_friends, send_add_friend_request} from '../../store/friend'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function SuggestedFriends() {
    const current_user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const friends = useSelector(state => state.Friends)
    const suggested_friends = Object.values(friends)

    useEffect(() => {
        dispatch(get_suggested_friends())
            .then(() => setLoaded(true))

    }, [])
    
    const AddFriendOnclick = async (friendId) => {
        await dispatch(send_add_friend_request(friendId))
    }

    if (!suggested_friends.length) {
        return (
            <div className='no_friend_container'>
                {/* <img className="no_friend_avaialble" src="asset/image/no_friend.png" alt="no friend image"></img> */}
                <img className="no_friend_avaialble" src='https://faceta2.s3.amazonaws.com/7507152f397242bc951754f904d9df6e.png' alt="no friend image"></img>
                <div className='no_friend_words'>
                    Current there is no friend suggestions. You may go to Fiends Request to accept friend's request.
                </div>
            </div>
        )
    }


    return (
        <div className="friend_card_detail_container">
        {loaded && suggested_friends.length && suggested_friends.map((user, index) => {
            return (
                <div className="friend_detail_wrapper">
                    <div className="friend_card_detail" key={index}>
                        <img className="friend_profile_image" src={user.profile_img} alt="profile_image"></img>
                        <div>{user.first_name} {user.last_name}</div>
                        <div className='friends_button_container'>
                            <button className='accept_button'
                                onClick={() => {
                                    console.log("add");
                                    AddFriendOnclick(user.id)
                                    // acceptRequestOnclick(friend.id)

                                }
                                }>Add Friend</button>
                            {/* <button className="reject_button">Delete</button> */}
                        </div>
                    </div>
                </div>
            )
        })
        }
        </div>
    )
}

export default SuggestedFriends