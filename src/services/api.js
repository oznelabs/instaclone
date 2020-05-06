import axios from 'axios';
const api = axios.create({
  baseURL: 'http://192.168.0.102:3333/',
  headers: { 'Content-Type': 'multipart/form-data' },
  json: true
});
export default api;