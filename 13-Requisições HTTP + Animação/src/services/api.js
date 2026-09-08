import axios from 'axios';

const api = axios.create({

  //bloqueio HTTPS no senac
  // baseURL: 'https://viacep.com.br/ws'
  baseURL: 'http://viacep.com.br/ws'
});

export default api;