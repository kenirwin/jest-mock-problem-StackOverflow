const Repo = require('../classes/Repo');
const repo = new Repo();

describe('Repo: fetchRand', () => {
  const data = { postId: 3, id: 3, name: 'Bob Your Uncle' };
  beforeEach(() => {
    getSpy = jest.spyOn(repo.api, 'getPage').mockImplementation(() => {
      Promise.resolve(data);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch call this.api.getPage once', async () => {
    let res = await repo.fetchRand();
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
  it('should return an object with a postId and an name', async () => {
    let res = await repo.fetchRand();
    expect(res).toHaveProperty('postId');
    expect(res).toHaveProperty('name');
  });
});
