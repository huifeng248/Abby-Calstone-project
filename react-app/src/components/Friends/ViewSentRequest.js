import { view_sent_request, delete_request_and_friend} from '../../store/friend'
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

    const deleteOnClick = async (frienshipId) => {
        await dispatch(delete_request_and_friend(frienshipId))
    }

    if (!sent_requested_friends.length) {
        return (
            <div className='no_friend_container'>
                {/* <img className="no_friend_avaialble" src="asset/image/no_friend.png" alt="no friend image"></img> */}
                <img className="no_friend_avaialble" src='https://faceta2.s3.amazonaws.com/7507152f397242bc951754f904d9df6e.png' alt="no friend image"></img>
                <div className='no_friend_words'>
                    There is no sent friend request. Go to Suggestions to send request to friends.
                </div>
            </div>
        )
    }
    
    
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
                                    console.log("delete", friend.id);
                                    deleteOnClick(friend.id)
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