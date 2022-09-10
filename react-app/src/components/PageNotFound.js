import "./PageNotFound.css"
import { NavLink } from 'react-router-dom';
function PageNotFound() {
    return (<div className="error_page_container">
        <img className="broken_link" src="https://static.xx.fbcdn.net/rsrc.php/yN/r/MnQWcWb6SrY.svg" alt="broken_link"></img>
        <div className="error_title">This Page Isn't Available</div>
        <div className="error_paragragh">
            The link may be broken, or the page may have been
            removed. Check to see if the link you're trying to open
            is correct.
        </div>
        <div className="home_page_link_container">
            <NavLink className="home_page_link" to='/' exact={true} activeClassName='active'>
                Go to News Feed
            </NavLink>
        </div>
    </div>)
}

export default PageNotFound