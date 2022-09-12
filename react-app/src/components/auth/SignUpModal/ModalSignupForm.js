import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "./SignUpModal.css";



const SignUpForm = ({ onClose }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, set_first_name] = useState('')
  const [last_name, set_last_name] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  // const [showSignup, setShowSignup] = useState(true)
  

  const onSignUp = async (e) => {
    e.preventDefault();
    const error_list = []
    if (first_name.trim().length === 0) {
      error_list.push("First Name is required")
    } 
    if (last_name.trim().length === 0) {
      error_list.push("Last name is required")
    } 
    if (username.trim().length <4 || username.length >20) {
      error_list.push("Username must between 4 to 20 characters")
    }
    if (password.trim().length === 0) {
      error_list.push("Password cannot be all space")
    }
    if (repeatPassword.trim().length === 0) {
      error_list.push("RepeatPassword cannot be all space")
    }
    if (password !== repeatPassword) {
      error_list.push("Repeat password must be the same as password")
    }



    if (error_list.length > 0) {
      setErrors(error_list)
    } else {
        const data = await dispatch(signUp(username, email, password, first_name, last_name));
  
        if (data) {
          setErrors(data)
        }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup_page'>
      <div>
        <div className='above_signup_form'>
          <i onClick={()=> onClose()} className="fa-solid fa-x"></i>
          <div className='sign_up_title_line'> Sign Up </div>
          <div className='Paragraph_line'> It's quick and easy. </div>
        </div>
        <form className='sign_up_form_container' onSubmit={onSignUp}>
          <div className='error_msg_box'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='input_container'>

         
          <div className='input_fields'>
            {/* <label>User Name</label> */}
            <input
              type='text'
              name='username'
              required
              onChange={updateUsername}
              value={username}
              placeholder='User name'
              minLength='4'
              maxLength='20'
            ></input>
          </div>

          <div className='input_fields'>
            {/* <label>First Name</label> */}
            <input
              type='text'
              name='firstName'
              required
              onChange={(e) => set_first_name(e.target.value)}
              value={first_name}
              placeholder='First name'
              maxLength='20'
            ></input>
          </div>

          <div className='input_fields'>
            {/* <label>Last Name</label> */}
            <input
              type='text'
              name='lastName'
              required
              onChange={(e) => set_last_name(e.target.value)}
              value={last_name}
              placeholder='Last name'
              maxLength='20'
            ></input>
          </div>


          <div className='input_fields'>
            {/* <label>Email</label> */}
            <input
              type='email'
              name='email'
              required
              onChange={updateEmail}
              value={email}
              maxLength='255'
              placeholder='email'
            ></input>
          </div>
          <div className='input_fields'>
            {/* <label>Password</label> */}
            <input
              type='password'
              name='password'
              minLength='6'
              required
              onChange={updatePassword}
              value={password}
              placeholder='New password'
            ></input>
          </div>
          <div className='input_fields'>
            {/* <label>Repeat Password</label> */}
            <input
              type='password'
              name='repeat_password'
              minLength='6'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Repeat password'
            ></input>
          </div>
          </div>
          <div className='button_dev'>
          <button className="signUp_button" type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
