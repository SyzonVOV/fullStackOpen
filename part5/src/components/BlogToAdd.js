import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogToAddForm = ({ addBlog }) => {
  const [title, setblogTitle] = useState('');
  const [author, setblogAuthor] = useState('');
  const [url, setblogUrl] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    setblogTitle('');
    setblogAuthor('');
    setblogUrl('');
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <fieldset>
        <legend>NEW BLOG FORM</legend>
        <p>
          <label htmlFor="title">Blog title</label>
          <input id="title" value={title} onChange={(event) => setblogTitle(event.target.value)} />
        </p>
        <p>
          <label htmlFor="author">Blog author</label>
          <input id="author" value={author} onChange={(event) => setblogAuthor(event.target.value)}/>
        </p>
        <p>
          <label htmlFor="url">Blog url</label>
          <input id="url" value={url} onChange={(event) => setblogUrl(event.target.value)}/>
        </p>
        <button type="submit">create</button>
      </fieldset>
    </form>
  );
};

BlogToAddForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogToAddForm;