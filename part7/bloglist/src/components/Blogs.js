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
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogThunk, likeBlogThunk } from './../reducers/actions';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const incriseLike = id => {
    dispatch(likeBlogThunk(id));
  };
  return (
    <TableRow>
      <TableCell>{blog.title}</TableCell>
      <TableCell width="15%">{blog.author}</TableCell>
      <TableCell width="10%">
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button disabled>{blog.likes}</Button>
          <Button onClick={incriseLike.bind(null, blog.id)} startIcon={<ThumbUpAltIcon />}>
            Like
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell width="10%">
        <IconButton aria-label="delete" color="secondary">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

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
