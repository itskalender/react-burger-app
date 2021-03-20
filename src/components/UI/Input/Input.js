import React from 'react';

// You are using global css. Be careful.
import classes from './Input.css';

const input = props => {
  let inputElement = null;

  // Classes
  const inputElClasses = [classes.InputElement];
  if (!props.valid && props.touched) {
    inputElClasses.push(classes.Invalid);
  }

  if (props.valid) {
    inputElClasses.push(classes.Valid);
  }

  // Element for Error Message
  let errorMsg = null;
  if (!props.valid && props.touched) {
    errorMsg = <p className={classes.ErrorMsg}>{props.errMsg}</p>;
  }

  // Selecting Input
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputElClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          className={inputElClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select
          className={inputElClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(optionObj => (
            <option key={optionObj.value} value={optionObj.value}>
              {optionObj.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputElClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
      {errorMsg}
    </div>
  );
};

export default input;
