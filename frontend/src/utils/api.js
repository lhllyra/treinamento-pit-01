import axios from 'axios';
// import { toast } from 'react-toastify';
import { tokenKey } from './constants';

const { REACT_APP_API_BASE_URL: apiBaseURL } = process.env;

const myAxios = axios.create({
  baseURL: apiBaseURL,
});

myAxios.interceptors.request.use((request) => {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    request.headers.Authorization = `bearer ${token}`;
  }
  return request;
});

export default myAxios;
