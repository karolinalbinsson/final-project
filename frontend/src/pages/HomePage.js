import React from 'react';
import { useSelector } from 'react-redux';

import Dashboard from '../components/Dashboard';
import NotSignedIn from '../components/NotSignedIn';

//navbar
//importera olika kompentener bereoend på om inloggad eller ej
//kontrollera med accessToken
//Footer
//about?
const HomePage = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);
  console.log(accessToken);
  return <>{!accessToken ? <NotSignedIn /> : <Dashboard />}</>;
};
export default HomePage;
