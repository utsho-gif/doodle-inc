import React from 'react';
import { FetchData } from '../../config/reactQuery';

const Home = () => {
  const blogData = FetchData({
    url: '/blogs',
    key: 'blog',
  });

  console.log(blogData);
  return <div>Home</div>;
};

export default Home;
