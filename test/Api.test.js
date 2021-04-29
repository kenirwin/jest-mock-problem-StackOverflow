const Api = require('../classes/Api');
const api = new Api();
const data = { postId: 3, id: 3, name: 'Bob Your Uncle' };
const axios = require('axios');
jest.mock('axios');

describe('Api: getPage', () => {
  beforeEach(() => {
    axios.request.mockImplementation(() =>
      Promise.resolve({ data: { bogus: 'data' } })
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call axios once', async () => {
    let res = await api.getPage(1);
    expect(axios.request).toHaveBeenCalledTimes(1);
  });
  it('should get some bogus data', async () => {
    let res = await api.getPage(1);
    expect(res).toHaveProperty('bogus');
  });
});
