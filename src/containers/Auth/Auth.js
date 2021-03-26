import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuthError from './AuthError/AuthError';

class Auth extends Component {
  state = {
    loginData: {
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Email' },
        value: '',
        validation: { required: true },
        isValid: false,
        touched: false,
        errMsg: 'Please write a valid email.',
      },
      password: {
        elementType: 'input',
        elementConfig: { type: 'password', placeholder: 'Password' },
        value: '',
        validation: { required: true, minLength: 6 },
        isValid: false,
        touched: false,
        errMsg: 'Please write a valid password.',
      },
    },
    isSignup: true,
  };

  checkValidity = (inputValue, ruleObj) => {
    let isValid = true;

    if (ruleObj.required) {
      isValid = inputValue.trim() !== '' && isValid;
    }
    if (ruleObj.minLength) {
      isValid = inputValue.length >= ruleObj.minLength && isValid;
    }
    if (ruleObj.maxLength) {
      isValid = inputValue.length <= ruleObj.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, changedInput) => {
    const updatedLoginData = { ...this.state.loginData };
    const updatedInputEl = { ...updatedLoginData[changedInput] };
    updatedInputEl.value = event.target.value;

    updatedInputEl.isValid = this.checkValidity(
      updatedInputEl.value,
      updatedInputEl.validation
    );

    updatedInputEl.touched = true;

    updatedLoginData[changedInput] = updatedInputEl;

    let formIsValid = true;
    for (let inputEl in updatedLoginData) {
      formIsValid = updatedLoginData[inputEl].isValid && formIsValid;
    }

    this.setState({
      loginData: updatedLoginData,
      formIsValid: formIsValid,
    });
  };

  formSubmitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.loginData.email.value,
      this.state.loginData.password.value,
      this.state.isSignup
    );
  };

  toggleAuthMethodHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    const loginDataObj = this.state.loginData;
    let loginDataArr = [];
    for (let inputName in loginDataObj) {
      loginDataArr.push({ ...loginDataObj[inputName], id: inputName });
    }

    let inputs = loginDataArr.map(inputData => {
      return (
        <Input
          key={inputData.id}
          elementType={inputData.elementType}
          elementConfig={inputData.elementConfig}
          value={inputData.value}
          valid={inputData.isValid}
          touched={inputData.touched}
          errMsg={inputData.errMsg}
          changed={event => this.inputChangedHandler(event, inputData.id)}
        />
      );
    });

    if (this.props.loading) {
      inputs = <Spinner />;
    }

    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <AuthError errMsg={this.props.error.message} />;
    }

    return (
      <div className={classes.Auth}>
        {errorMsg}
        <form onSubmit={this.formSubmitHandler}>
          {inputs}
          <Button btnType="Success">
            {this.state.isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.toggleAuthMethodHandler}>
          Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
