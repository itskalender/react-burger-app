import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-9c122-default-rtdb.firebaseio.com/',
});

export default instance;
