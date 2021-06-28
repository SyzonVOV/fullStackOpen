import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useField } from './../hooks/indexHook';
import { addBlogThunk } from './../reducers/actions';
import { useDispatch } from 'react-redux';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

export default function NewBlogForm() {
  const dispatch = useDispatch();
  const title = useField('title');
  const author = useField('author');
  const url = useField('url');
  // const classes = useStyles();
  const handleOnSubmit = event => {
    event.preventDefault();
    const content = { title: title.value, author: author.value, url: url.value };
    title.onChange();
    author.onChange();
    url.onChange();
    dispatch(addBlogThunk(content));
  };

  return (
    // <form className={classes.root} noValidate autoComplete="off">
    <form onSubmit={handleOnSubmit}>
      <div>
        <TextField id="title" label="Title" fullWidth {...title} />
      </div>
      <div>
        <TextField id="author" label="Author" fullWidth {...author} />
      </div>
      <div>
        <TextField id="url" label="Url" fullWidth {...url} />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          add
        </Button>
      </div>
    </form>
  );
}
