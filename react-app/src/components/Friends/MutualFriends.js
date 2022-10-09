import { get_all_friends, delete_request_and_friend } from '../../store/friend'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import no_friend_image from "../../image/no_friend.png"




function MutualFriends() {
    const current_user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const friends = useSelector(state => state.Friends)
    const all_friends = Object.values(friends)

    useEffect(() => {
        dispatch(get_all_friends())
            .then(() => setLoaded(true))

    }, [])

    const deleteOnClick = async (frienshipId) => {
        await dispatch(delete_request_and_friend(frienshipId))
    }

    if (!all_friends.length) {
        return (
            <div className='no_friend_container'>
                {/* <img className="no_friend_avaialble" src='https://faceta2.s3.amazonaws.com/7507152f397242bc951754f904d9df6e.png' alt="no friend image"></img> */}
                <img className="no_friend_avaialble" src={no_friend_image} alt="no friend image"></img>

                <div className='no_friend_words'>
                    There is no friend yet. Go to Suggestions to send request to friends.
                </div>
            </div>
        )
    }

    return (
        <div className="friend_card_detail_container">
            {loaded && all_friends.length && all_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            {friend.requester.id !== current_user.id ?
                                <div>

                                    <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                                    <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                                </div>
                                : <div>
                                    <img className="friend_profile_image" src={friend.accepter.profile_img} alt="profile_image"></img>
                                    <div>{friend.accepter.first_name} {friend.accepter.last_name}</div>
                                </div>}

                            <div className='friends_button_container'>
                                {/* <button className='accept_button'
                                onClick={() => {
                                    // acceptRequestOnclick(friend.friend_id)
                                    // acceptRequestOnclick(friend.id)

                                }
                                }>Confirm</button> */}
                                <button className="reject_button"
                                onClick={()=>{
                                    deleteOnClick(friend.id)
                                }}
                                >Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}

export default MutualFriends