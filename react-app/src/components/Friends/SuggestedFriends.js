import { get_suggested_friends} from '../../store/friend'
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
                                    console.log("yes");
                                    // acceptRequestOnclick(friend.friend_id)
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