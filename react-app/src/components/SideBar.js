import "./SideBar.css"
import { NavLink, Link } from 'react-router-dom';
function SideBar({ user }) {
    return (

        <div className="sidebar_container">
            <NavLink className="contact_info_link" to='/' exact={true} activeClassName='active'>
                <div className="contact_info_link_div">
                    <i class="fa-solid fa-house"></i>
                    <div>Home</div>
                </div>
            </NavLink>
            <NavLink className="contact_info_link" to={`/posts/users/${user.id}`} activeClassName='active'>
                <div className="contact_info_link_div">
                    <img className="user_profile_image_sidebar" src={user.profile_img}></img>
                    <div>{user.first_name} {user.last_name}</div>
                </div>
            </NavLink>


            <a className="contact_info_link" href="https://www.linkedin.com/in/hui-abby-feng-cpa/">
                <div className="contact_info_link_div">
                    <i className="fa-brands fa-linkedin"></i>
                    <div>Abby Feng linkedin</div>
                </div>
            </a>

            <a className="contact_info_link" href="https://github.com/huifeng248">
                <div className="contact_info_link_div">
                    <i class="fa-brands fa-github"></i>
                    <div>Github</div>
                </div>
            </a>

            <a className="contact_info_link" href="https://github.com/huifeng248/Abby-Calstone-project">
                <div className="contact_info_link_div">
                    <i class="fa-brands fa-github"></i>
                    <div>About FaceTa</div>
                </div>
            </a>

        </div>
    )
}

export default SideBar