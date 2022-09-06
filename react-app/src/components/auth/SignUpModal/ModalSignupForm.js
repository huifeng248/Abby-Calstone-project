import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "./SignUpModal.css";



const SignUpForm = ({ onClose, showModal, setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, set_first_name] = useState('')
  const [last_name, set_last_name] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name));
      // console.log("!!!!!!!!!!!!!!", data)
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
          <div className='sign_up_title_line'> Sign Up </div>
          <div className='Paragraph_line'> It's quick and easy. </div>
        </div>
        <form className='sign_up_form_container' onSubmit={onSignUp}>
          <div>
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
              onChange={updateUsername}
              value={username}
              placeholder='User name'
            ></input>
          </div>

          <div className='input_fields'>
            {/* <label>First Name</label> */}
            <input
              type='text'
              name='firstName'
              onChange={(e) => set_first_name(e.target.value)}
              value={first_name}
              placeholder='First name'
            ></input>
          </div>

          <div className='input_fields'>
            {/* <label>Last Name</label> */}
            <input
              type='text'
              name='lastName'
              onChange={(e) => set_last_name(e.target.value)}
              value={last_name}
              placeholder='Last name'
            ></input>
          </div>


          <div className='input_fields'>
            {/* <label>Email</label> */}
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='email'
            ></input>
          </div>
          <div className='input_fields'>
            {/* <label>Password</label> */}
            <input
              type='password'
              name='password'
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
