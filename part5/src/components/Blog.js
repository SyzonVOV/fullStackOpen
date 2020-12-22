import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, incriseLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <li className="bullet-li" id={blog.id}>
      {!visible ? (
        <>
          {blog.title} {blog.author}{' '}
          <button
            className={!visible ? 'view' : 'hide'}
            onClick={toggleVisibility}
          >
            {!visible ? 'view' : 'hide'}
          </button>
        </>
      ) : (
        <>
          <p className="none">
            {blog.title} {blog.author}{' '}
            <button
              className={!visible ? 'view' : 'hide'}
              onClick={toggleVisibility}
            >
              {!visible ? 'view' : 'hide'}
            </button>
          </p>
          <p className="none">url: {blog.url}</p>
          <p className="none likes">
            likes: {blog.likes}{' '}
            <button onClick={incriseLike.bind(null, blog.id)}>like</button>
          </p>
          <p className="none">{blog.user[0].name}</p>
          <button onClick={deleteBlog.bind(null, blog)}>delete</button>
        </>
      )}
    </li>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  incriseLike: PropTypes.func.isRequired,
};
export default Blog;
