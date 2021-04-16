import React from 'react';
import { useSelector } from 'react-redux';

const Home = (props) => {
  const username = useSelector((state) => state.user.userInfo?.username);
  return <div>{username}님 환영합니돠</div>;
};

Home.propTypes = {};

export default Home;
