import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data)
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div className='log_in_page'>

      <div className='left_container'>
        <div className='Log_in_banner'>
          <h3 className='app_title'>FaceTa</h3>
        </div>
        <div className='connect_p'>
          <div>Connect with friends and the world around you on Facebook.</div>
        </div>
      </div>


      <div className='log_in_container'>

        <div>Log Into FaceTa </div>
        <div className='must_container'>
          <div>
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <div>You must log in to continue.</div>
        </div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>

          </div>
          <div className='email_password_container'>


            <div className='log_in_info'>
              {/* <label htmlFor='email'>Email</label> */}
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='log_in_info'>
              {/* <label htmlFor='password'>Password</label> */}
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
          </div>
          <div className='buttons_container'>
            <button className="log_in_button" type='submit'>Login</button>
          </div>
          <div className='demo_buttons_container'>
            <button className="log_in_button" onClick={() => demoLogin()}>Demo</button>
          </div>

        </form>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Create new account
          </NavLink>
        </div>
      </div>

    </div>
  );
};

export default LoginForm;
