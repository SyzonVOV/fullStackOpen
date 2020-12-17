const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');

const helper = {
  initialBlogs: [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      blogs: 2,
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: ['5fdb4b539c836f354c86d702']
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: ['5fdb4b539c836f354c86d702']
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      blogs: 2,
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 17,
      user: ['5fdb4b539c836f354c86d702']
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      blogs: 3,
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      user: ['5fdb4b539c836f354c86d702']
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      blogs: 1,
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
  ],

  initialUsers: [
    {
      'blogs': [],
      'username': 'mluukkai',
      'name': 'Matti Luukkainen',
      'password': 'stelth1'
    },
    {
      'blogs': [],
      'username': 'hellas',
      'name': 'Artoru Hellas',
      'password': 'stelth2'
    }
  ],

  blogsInDb: async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
  },

  usersInDb: async () => {
    const blogs = await User.find({});
    return blogs.map(blog => blog.toJSON());
  },

  nonExistingId: async () => {
    const blog = new Blog(helper.initialBlogs[0]);
    await blog.save();
    await blog.remove();

    return blog._id.toString();
  },
};

module.exports = {...helper};