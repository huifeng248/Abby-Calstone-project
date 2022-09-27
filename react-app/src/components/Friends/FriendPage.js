import FriendSideBar from "./FriendSideBar"
import SideBar from "../SideBar"
import "./FriendPage.css"
import { useState } from "react"
import RequestedFriends from "./RequestedFriends"
import MutualFriends from "./MutualFriends"
import SuggestedFriends from "./SuggestedFriends"

function FriendPage() {
    const [showFriendRequested, setShowFriendRequested] = useState()
    const [showMutualFriends, setShowMutualFriends] = useState()
    const [showSuggested, setShowSuggested] = useState()

    return (
        <div className="friends_outter_container">
            <SideBar />
            {/* <FriendSideBar /> */}
            <div className="friend_option_container">
                <div className="friend_option"
                    onClick={() => {setShowFriendRequested(true)
                        setShowSuggested(false)
                        setShowMutualFriends(false)}}>
                    Friends Requests
                </div>

                <div className="friend_option"
                 onClick={() => {setShowFriendRequested(false)
                    setShowMutualFriends(false)
                    setShowSuggested(true)}}>
                    Suggestions
                </div>
                <div className="friend_option"
                    onClick={() => {
                        setShowFriendRequested(false)
                        setShowSuggested(false)
                        setShowMutualFriends(true)}}>
                    All Friends
                </div>
            </div>

            {showFriendRequested&& <RequestedFriends />}
            {showMutualFriends && <MutualFriends />}
            {showSuggested && <SuggestedFriends />}

        </div>
    )
}

export default FriendPage