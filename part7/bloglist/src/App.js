import React from 'react';
import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import {
  Container,
} from '@material-ui/core';

const App = () => {

  return (
    <Container>
      <Notification />
      <h2>BLOGS</h2>
      <Blogs />
      <h2>ADD NEW BLOG</h2>
      <NewBlogForm />
    </Container>
  );
};

export default App;
