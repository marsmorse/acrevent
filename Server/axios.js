const axios = require('axios');
const instance = axios.create({
    baseURL: 'https://api.songkick.com/api/3.0/',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  module.exports = instance;