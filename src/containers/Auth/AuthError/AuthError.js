import React from 'react';
import classes from './AuthError.css';

const authError = props => {
  const outputErrorMessage = errMsg => {
    switch (errMsg) {
      case 'INVALID_EMAIL':
        return <p className={classes.ErrorMsg}>Please write a valid email</p>;
      case 'MISSING_PASSWORD':
        return <p className={classes.ErrorMsg}>Please write a password</p>;
      case 'EMAIL_EXISTS':
        return (
          <p className={classes.ErrorMsg}>This email has already been taken</p>
        );
      case 'EMAIL_NOT_FOUND':
        return <p className={classes.ErrorMsg}>This email is not found</p>;
      case 'INVALID_PASSWORD':
        return <p className={classes.ErrorMsg}>This password is not correct</p>;
      default:
        return <p className={classes.ErrorMsg}>{props.errMsg}</p>;
    }
  };
  return outputErrorMessage(props.errMsg);
};

export default authError;
