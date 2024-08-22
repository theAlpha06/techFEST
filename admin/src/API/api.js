import axios from 'axios';

// export const baseUrl = 'https://www.techfestsliet.org/api';
 export const baseUrl = 'http://localhost:4000';
export const localUrlIns = axios.create({
  baseURL: baseUrl,
  'withCredentials':true,
  headers: {
    'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
});
