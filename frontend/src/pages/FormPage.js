import React from 'react';
import { useSelector } from 'react-redux';

import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';
import { user } from '../reducers/user';

const FormPage = () => {
  const isLogIn = useSelector(store => store.user.login.isLogIn);
  console.log(isLogIn);

  return <>{isLogIn ? <LogInForm /> : <SignUpForm />}</>;
};
export default FormPage;
