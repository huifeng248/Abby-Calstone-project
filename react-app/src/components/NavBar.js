
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { search_user_by_name } from '../store/search'

const NavBar = () => {

  const user = useSelector((state) => state.session.user)
  const [showList, setShowList] = useState(false);
  const [searchItem, setSearchItem] = useState("")
  const dispatch = useDispatch()
  const searchUsers = useSelector((state) => state.Search)
  const searchUsersList = Object.values(searchUsers)
  console.log("^^^^^^^^", searchUsersList)

  useEffect(() => {
    if (!showList) return
    const closeDropDownMenu = () => setShowList(false)
    document.addEventListener("click", closeDropDownMenu)
    return () => document.removeEventListener("click", closeDropDownMenu)
  }, [showList])

  useEffect(() => {
    if (searchItem.trim().length) {
      let url_params = `searchItem=${searchItem}`
      dispatch(search_user_by_name(url_params))
    }
  }, [searchItem])

  if (!user) return null;
  else return (
    <div>
      <nav className='nav_bar_container'>
        <div className="home_link_container">
          <NavLink onClick={() => window.scroll(0, 0)}
            className="home_link" to='/' exact={true} activeClassName='active'>
            FaceTa
          </NavLink>


          <div className='search_bar_container'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input className="search_input"
              placeholder='Search Friends'
              onChange={(e) => {
                setSearchItem(e.target.value)
              }}
            ></input>
          </div>

          {searchItem.length>0 && 
            searchUsersList.length?
            <div className='search_users_container'>
              {console.log("!!!!!", searchUsersList)}
              {searchUsersList.map((user, index) => {
                return ( 
              <Link className="user_profile_link" to={`/posts/users/${user.id}`}>
            
                <div key={index}>
                  <img className="user_profile_image" src={user.profile_img} alt="profile_image"></img>
                  <div>{user.first_name}</div>
                  <div>{user.last_name}</div>
                </div>
                </Link>)
              })}
            </div>
            : null
          }

            {searchItem && !searchUsersList.length &&
              <div> no user found</div>
            }


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
      </nav>
    </div>

  );
}

export default NavBar;
