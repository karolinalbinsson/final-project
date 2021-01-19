import React, { useState } from 'react';
import { signUp } from 'reducers/user';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../lib/CustomButton';
import { user } from '../reducers/user';

//import '../styles/style.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUp(name, email, password));
    setName('');
    setEmail('');
    setPassword('');
  };

  // const handleSetSignUp = event => {
  //   event.preventDefault();
  //   setIsSignedUp(false);
  // };
  const handleSetForm = () => {
    dispatch(user.actions.toggleForm(true));
  };

  return (
    <form className="content" onSubmit={handleSubmit}>
      <div className="form-text-input-fields">
        <label>
          <input
            className="text-input-field"
            required
            type="text"
            value={name}
            minLength={2}
            placeholder="Type your name"
            onChange={event => setName(event.target.value)}
          ></input>
        </label>
        <label>
          <input
            className="text-input-field"
            required
            type="email"
            value={email}
            placeholder="email@email.com"
            onChange={event => setEmail(event.target.value)}
          ></input>
        </label>
        <label>
          <input
            className="text-input-field"
            required
            type="password"
            value={password}
            minLength={5}
            placeholder="password"
            onChange={event => setPassword(event.target.value)}
          ></input>
        </label>
      </div>
      <div className="form-buttons">
        <CustomButton
          className={
            !name || !email || password.length < 5
              ? 'form-button-disabled'
              : 'form-button'
          }
          type="submit"
          disabled={!name || !email || password.length < 5}
          text="Sign Up"
        />
        <button className="link-button" type="button" onClick={handleSetForm}>
          <span className="link-button-text">
            Already a member? Log in here
          </span>
        </button>
        {errorMessage && <p className="text-info error">{errorMessage}</p>}
      </div>
    </form>
  );
};
export default SignUpForm;
