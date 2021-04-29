const Api = require('./Api');

module.exports = class Repository {
  constructor() {
    this.api = new Api();
  }
  async fetchRand() {
    let id = this.getRandomInt(5);
    let res = await this.api.getPage(id);
    return res;
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }
};
