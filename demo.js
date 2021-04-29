const Repo = require('./classes/Repo');
const repo = new Repo();

(async () => {
  let res = await repo.fetchRand();
  console.log(res);
})();
