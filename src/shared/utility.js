export const updateObject = (prevObj, newObj) => {
  return {
    ...prevObj,
    ...newObj,
  };
};

export const checkValidity = (inputValue, ruleObj) => {
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
