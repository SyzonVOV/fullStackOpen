import { useState, useEffect, useRef } from 'react';
import './App.css';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login';
import BlogToAddForm from './components/BlogToAdd';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async userInfo => {
    try {
      const user = await loginService(userInfo);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setMessage({ event: 'error', message: 'Wrong credentials' });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken(null);
  };

  const handleBlogPost = async blogData => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.create(blogData);
    setBlogs(blogs.concat(newBlog));
    setMessage({
      event: 'message',
      message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
    });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleBlogUpdateLikes = async blogId => {
    let blogData = blogs.find(blog => blog.id===blogId);
    blogData = { ...blogData, likes: blogData.likes+1 };
    const updatedBlog = await blogService.update(blogData);
    setBlogs(blogs.map(blog => blog.id!==updatedBlog.id ? blog : updatedBlog));
    setMessage({
      event: 'message',
      message: `the blog ${updatedBlog.title} by ${updatedBlog.author} updated`,
    });
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  };

  const handleBlogDelete = async blog => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter(bl => bl.id !== blog.id));
      setMessage({
        event: 'message',
        message: 'the blog was deleted',
      });
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };

  const handleBlokSort = () => {
    const sort = (a, b) => {
      return b.likes - a.likes;
    };
    setBlogs([...blogs].sort(sort));
  };

  return (
    <>
      <h2>BLOGS</h2>
      <Notification message={message} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleSendServerLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button id="logout" type="button" onClick={handleLogout}>
            logout
          </button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogToAddForm addBlog={handleBlogPost} />
          </Togglable>
        </div>
      )}
      <div>
        <button style={{ marginTop: '5px' }} onClick={handleBlokSort}>sort</button>
        <ol className="bullet">
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} incriseLike={handleBlogUpdateLikes} deleteBlog={handleBlogDelete}/>
          ))}
        </ol>
      </div>
    </>
  );
};

export default App;
