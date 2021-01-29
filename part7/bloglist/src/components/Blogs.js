import React, { useEffect } from 'react';
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Paper,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogThunk } from './../reducers/actions';

const Blog = ({ blog }) => (
  <TableRow>
    <TableCell>{blog.title}</TableCell>
    <TableCell width="15%">{blog.author}</TableCell>
    <TableCell width="10%">
      <IconButton aria-label="delete" color="secondary">
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogThunk());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
