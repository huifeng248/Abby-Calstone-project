import "./SideBar.css"

function SideBar() {
    return (

        <div className="sidebar_container">
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