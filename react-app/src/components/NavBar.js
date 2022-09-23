
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector((state) => state.session.user)
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!showList) return
    const closeDropDownMenu = () => setShowList(false)
    document.addEventListener("click", closeDropDownMenu)
    return () => document.removeEventListener("click", closeDropDownMenu)
  }, [showList])

  if (!user) return null;
  else return (
    <div>
      <nav className='nav_bar_container'>
        <div className="home_link_container">
          <NavLink onClick={()=> window.scroll(0,0)}
          className="home_link" to='/' exact={true} activeClassName='active'>
            FaceTa
          </NavLink>
          <div className='search_bar_container'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input className="search_input" placeholder='Search Friends'></input>
          </div>
          <div>
            <i className="fa-solid fa-user"
              onClick={() => setShowList(!showList)}></i>
          </div>
        </div>
        {showList &&
          <div className='drop_down_menu'>
            <div className='profile_link_wrapper'
              onClick={() => setShowList(!showList)}>
              <Link className="user_profile_link" to={`/posts/users/${user.id}`}>
                Profile page
              </Link>
            </div>
            <div className='user_log_out_button'
              onClick={() => setShowList(!showList)}>
              <LogoutButton />
            </div>

          </div>
        }







        {/* <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul> */}
      </nav>
    </div>

  );
}

export default NavBar;
