import FriendSideBar from "./FriendSideBar"
import SideBar from "../SideBar"
import "./FriendPage.css"
import { useState } from "react"
import RequestedFriends from "./RequestedFriends"
import MutualFriends from "./MutualFriends"
import SuggestedFriends from "./SuggestedFriends"
import ViewSentRequest from "./ViewSentRequest"

function FriendPage() {
    const [showFriendRequested, setShowFriendRequested] = useState(true)
    const [showMutualFriends, setShowMutualFriends] = useState()
    const [showSuggested, setShowSuggested] = useState()
    const [showSentRequest, setShowSentRequest] = useState()

    return (
        <div className="friends_outter_container">
            <SideBar />
            {/* <FriendSideBar /> */}
            <div className="friend_option_container">
                <div className={showFriendRequested? "friend_option grey": "friend_option"}
                    onClick={() => {setShowFriendRequested(true)
                        setShowSuggested(false)
                        setShowSentRequest(false)
                        setShowMutualFriends(false)}}>
                    Friends Requests
                </div>

                <div className={showSuggested? "friend_option grey": "friend_option"}
                 onClick={() => {setShowFriendRequested(false)
                    setShowMutualFriends(false)
                    setShowSentRequest(false)
                    setShowSuggested(true)}}>
                    Suggestions
                </div>
                <div className={showMutualFriends? "friend_option grey": "friend_option"}
                    onClick={() => {
                        setShowFriendRequested(false)
                        setShowSuggested(false)
                        setShowSentRequest(false)
                        setShowMutualFriends(true)}}>
                    All Friends
                </div>
                <div className={showSentRequest? "friend_option grey": "friend_option"}
                    onClick={() => {
                        setShowFriendRequested(false)
                        setShowSuggested(false)
                        setShowMutualFriends(false)
                        setShowSentRequest(true)}}>
                    View Sent Requests 
                </div>
            </div>

            {showFriendRequested&& <RequestedFriends />}
            {showMutualFriends && <MutualFriends />}
            {showSuggested && <SuggestedFriends />}
            {showSentRequest&& <ViewSentRequest />}

        </div>
    )
}

export default FriendPage