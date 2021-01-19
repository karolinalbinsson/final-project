import React from 'react';
import { useSelector } from 'react-redux';

import Dashboard from '../components/Dashboard';
import NotSignedIn from '../components/NotSignedIn';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

//navbar
//importera olika kompentener bereoend på om inloggad eller ej
//kontrollera med accessToken
//Footer
//about?
const HomePage = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);
  console.log(accessToken);
  return (
    <>
      <Nav />
      {!accessToken ? <NotSignedIn /> : <Dashboard />}
      <Footer />
    </>
  );
};
export default HomePage;
