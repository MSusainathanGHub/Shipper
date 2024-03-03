import axios from 'axios';

 const baseapi = axios.create({
  baseURL: 'http://localhost:8080',  
});

export default baseapi