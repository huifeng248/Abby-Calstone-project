import "./SideBar.css"
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import SideBarDetail from "./SideBarDesc";
import SideBar from "./SideBar";
function SideBarWhole() {
    const user = useSelector(state => state.session.user)
    // const [showSideBarWord, setShowSideBarWord] = useState(true)
    if (!user) return null;

    return (
        <div className="sidebar_outside_container">
            <SideBar />
            <SideBarDetail />

        </div>
    )
}

export default SideBarWhole