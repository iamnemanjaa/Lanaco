import React from 'react';
import classes from "./ErrorMessage.module.css";
import {Link} from "react-router-dom";

const ErrorMessage = ({error}) => {
  let title = 'An error occurred!', message = 'Something went wrong!';

  if (error.status === 500) message = error.data.message;

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page!'
  }

  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to={'/'}>Back to the homepage.</Link>
    </div>
  );
};

export default ErrorMessage;