/* eslint-disable no-unused-vars */
var lodashMath = require('lodash/math');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  const sort = (a, b) => {
    return b.likes - a.likes;
  };
  let best = [...blogs].sort(sort)[0];

  return { title: best.title, author: best.author, likes: best.likes };
};

const mostBlogs = elem => {
  let { author, blogs } = lodashMath.maxBy(elem, 'blogs');
  return { author, blogs };
};

const mostLikes = elem => {
  let { author, likes } = lodashMath.maxBy(elem, 'likes');
  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
