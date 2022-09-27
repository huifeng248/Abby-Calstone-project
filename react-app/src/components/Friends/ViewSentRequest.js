import { view_sent_request} from '../../store/friend'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function ViewSentRequest() {
    const current_user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const friends = useSelector(state => state.Friends)
    const sent_requested_friends = Object.values(friends)

    useEffect(() => {
        dispatch(view_sent_request())
            .then(() => setLoaded(true))

    }, [])
    
    return (
        <div className="friend_card_detail_container">
        {loaded && sent_requested_friends.length && sent_requested_friends.map((friend, index) => {
            return (
                <div className="friend_detail_wrapper">
                    <div className="friend_card_detail" key={index}>
                        <img className="friend_profile_image" src={friend.accepter.profile_img} alt="profile_image"></img>
                        <div>{friend.accepter.first_name} {friend.accepter.last_name}</div>
                        <div className='friends_button_container'>
                            <button className="reject_button"
                                onClick={() => {
                                    console.log("yes");
                                    // acceptRequestOnclick(friend.friend_id)
                                    // acceptRequestOnclick(friend.id)

                                }
                                }>Cancel Request</button>
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

export default ViewSentRequest