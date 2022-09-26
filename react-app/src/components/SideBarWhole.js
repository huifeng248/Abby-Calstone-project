import "./SideBar.css"
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
function SideBar() {
    const user = useSelector(state => state.session.user)
    const [showSideBarWord, setShowSideBarWord] = useState(true)
    if (!user) return null;

    return (
        <div className="sidebar_outside_container">
            <div className="sidebar_container left">
                <NavLink className="contact_info_link" to='/' exact={true} activeClassName='active'>
                    <div className="contact_info_link_div">
                        <i className="fa-solid fa-house"></i>
                        {/* <div>Home</div> */}
                    </div>
                </NavLink>
                <NavLink className="contact_info_link" to={`/posts/users/${user.id}`} activeClassName='active'>
                    <div className="contact_info_link_div">
                        <img className="user_profile_image_sidebar" src={user.profile_img}></img>
                        {/* <div>{user.first_name} {user.last_name}</div> */}
                    </div>
                </NavLink>


                <a className="contact_info_link" href="https://www.linkedin.com/in/hui-abby-feng-cpa/"
                    target='_blank' rel='noreferrer'>
                    <div className="contact_info_link_div">
                        <i className="fa-brands fa-linkedin"></i>
                        {/* <div>Abby Feng</div> */}
                    </div>
                </a>

                <a className="contact_info_link" href="https://github.com/huifeng248"
                    target='_blank' rel='noreferrer'>
                    <div className="contact_info_link_div">
                        <i className="fa-brands fa-github"></i>
                        {/* <div>Github</div> */}
                    </div>
                </a>

                <a className="contact_info_link" href="https://github.com/huifeng248/Abby-Calstone-project"
                    target='_blank' rel='noreferrer'>
                    <div className="contact_info_link_div">
                        <i className="fa-brands fa-github"></i>
                        {/* <div>About FaceTa</div> */}
                    </div>
                </a>

                <NavLink className="contact_info_link" to={`/`} activeClassName='active'>
                    <div className="contact_info_link_div">
                        <i className="fa-solid fa-user-group"></i>
                        {/* <div>Friends</div> */}
                    </div>
                </NavLink>

            </div>
            <div className="sidebar_word_container sidebar_container">
                <NavLink className="contact_info_link" to='/' exact={true} activeClassName='active'>
                    <div className="contact_info_link_div">
                        <div>Home</div>
                    </div>
                </NavLink>
                <NavLink className="contact_info_link" to={`/posts/users/${user.id}`} activeClassName='active'>
                    <div className="contact_info_link_div">
                        <div>{user.first_name} {user.last_name}</div>
                    </div>
                </NavLink>
                <a className="contact_info_link" href="https://www.linkedin.com/in/hui-abby-feng-cpa/"
                    target='_blank' rel='noreferrer'>
                    <div className="contact_info_link_div">
                        <div>Abby Feng</div>
                    </div>
                </a>
                <a className="contact_info_link" href="https://github.com/huifeng248"
                    target='_blank' rel='noreferrer'>
                    <div className="contact_info_link_div">
                        <div>Github</div>
                    </div>
                </a>
                <a className="contact_info_link" href="https://github.com/huifeng248/Abby-Calstone-project"
                    target='_blank' rel='noreferrer'>
                    <div className="contact_info_link_div">
                        <div>About FaceTa</div>
                    </div>
                </a>
                <NavLink className="contact_info_link" to={`/`} activeClassName='active'>
                    <div className="contact_info_link_div">
                        <div>Friends</div>
                    </div>
                </NavLink>
            </div>

        </div>
    )
}

export default SideBar