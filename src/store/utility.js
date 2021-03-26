export const updateObject = (prevObj, newObj) => {
  return {
    ...prevObj,
    ...newObj,
  };
};
