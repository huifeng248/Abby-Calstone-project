import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get_friends_requested, accept_friend_request } from '../../store/friend'

function RequestedFriends() {
    const current_user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const friends = useSelector(state => state.Friends)
    const requested_friends = Object.values(friends)

    useEffect(() => {
        dispatch(get_friends_requested())
            .then(() => setLoaded(true))

    }, [])

    const acceptRequestOnclick = async (id) => {
        await dispatch(accept_friend_request(id))
        // await dispatch(get_friends_requested())
    }

    return (
        <div className="friend_card_detail_container">
            {loaded && requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'
                                    onClick={() => {
                                        console.log("yes");
                                        // acceptRequestOnclick(friend.friend_id)
                                        acceptRequestOnclick(friend.id)

                                    }
                                    }>Confirm</button>
                                <button className="reject_button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            }

            {/* {loaded && requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'
                                    onClick={() => {
                                        console.log("yes");
                                        acceptRequestOnclick(friend.friend_id)
                                    }
                                    }>Confirm</button>
                                <button className="reject_button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            } */}
            {/* {loaded && requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'>Confirm</button>
                                <button className="reject_button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            } */}
            {/* {loaded && requested_friends.length && requested_friends.map((friend, index) => {
                return (
                    <div className="friend_detail_wrapper">
                        <div className="friend_card_detail" key={index}>
                            <img className="friend_profile_image" src={friend.requester.profile_img} alt="profile_image"></img>
                            <div>{friend.requester.first_name} {friend.requester.last_name}</div>
                            <div className='friends_button_container'>
                                <button className='accept_button'>Confirm</button>
                                <button className="reject_button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })
            } */}
        </div>
    )
}

export default RequestedFriends