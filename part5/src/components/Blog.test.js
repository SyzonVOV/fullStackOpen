import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: ['5fdb4b539c836f354c86d702'],
  };

  beforeEach(() => {
    component = render(
      <Blog blog={blog} incriseLike={() => {}} deleteBlog={() => {}} />,
    );
  });

  test('renders content', () => {
    //const li = component.container.querySelector('.bullet-li')

    //console.log(prettyDOM(li))
    // method 1
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).toHaveTextContent(blog.title);

    // method 2
    const url = component.queryByText('https://reactpatterns.com/');
    expect(url).toBeNull();

    const likes = component.queryByText(blog.likes);
    expect(likes).toBeNull();

    // method 3
    // const div = component.container.querySelector('.blog')
    // expect(div).toHaveTextContent(
    //   'Component testing is done with react-testing-library'
    // )
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).toHaveTextContent(blog.title);
  });

});

describe('<Blog /> buttons', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: ['5fdb4b539c836f354c86d702'],
  };

  test('after clicking the like button, the event handler is called twice', () => {
    const mockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} incriseLike={mockHandler} deleteBlog={() => {}} />,
    );

    const button = component.getByText('view');
    fireEvent.click(button);

    const buttonLike = component.getByText('like');
    console.log(prettyDOM(buttonLike));
    fireEvent.click(buttonLike);
    fireEvent.click(buttonLike);
    // console.log(mockHandler.mock.calls);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
