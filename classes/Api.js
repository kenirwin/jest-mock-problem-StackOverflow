const axios = require('axios');

module.exports = class Api {
  async getPage(n) {
    let res = await axios.request({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/comments/' + n,
    });
    return res.data;
  }
};
