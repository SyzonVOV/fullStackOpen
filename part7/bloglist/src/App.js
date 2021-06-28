import React, { useEffect} from 'react';
import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import {
  Container,
} from '@material-ui/core';
import apiBlog from './services/blogs'
import { useDispatch } from 'react-redux';
import { setUser } from './reducers/actions';
import LoginForm from './components/LoginForm';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user.username));
      
      apiBlog.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <Container>
      <Notification />
      <LoginForm />
      <h2>BLOGS</h2>
      <Blogs />
      <h2>ADD NEW BLOG</h2>
      <NewBlogForm />
    </Container>
  );
};

export default App;
