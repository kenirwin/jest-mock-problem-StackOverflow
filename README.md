# This code goes with a question from StackOverflow

https://stackoverflow.com/questions/67321204/jest-mockimplementationpromise-resolve-returns-undefined-when-spying-on-an-obj

I'm having trouble getting a Jest mockImplementation to return data with Promise.resolve() in a particular context.

In my Node.js code, I have a structure that puts all the API-calling code in one class (Api), and all the business logic in another (Repo). When you instantiate Repo, it creates an instance of the Api class for itself: `this.api = new Api()`

I'm trying to test a function in the Repo level, and mocking the Api call so we don't actually make any queries during testing.

```
  const data = { postId: 3, id: 3, name: 'Bob Your Uncle' };
  beforeEach(() => {
    getSpy = jest.spyOn(repo.api, 'getPage').mockImplementation(() => {
      Promise.resolve(data);
    });
  });
```

When I execute the function, `expect(getSpy).toHaveBeenCalledTimes(1)` returns true, but the value it returns is "undefined" rather than the expected promise resolved.

When I do a real-life run of the code, it works just fine, but the test fails. I suspect the problem may have to do with the fact that the code I'm testing is calling a second user-written class, by I'm not sure. I found this question [Jest: Spy on object method?][1] that seems related, but their solution (adding .prototype to the spyOn argument) didn't help me -- they were working with a native JS object rather than a user-defined one, which seems different enough to explain the difference.

Here is the full `describe` block:

```
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
```

and the module being tested:

```
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
```

# Using this Repo

Run `npm test -- Repo.test.js` to replicate the problem. (This is not my real project, just the simplest full code to replicate the basic nature of the problem.)

[1]: https://stackoverflow.com/questions/65151813/jest-spy-on-object-method
[2]: https://github.com/kenirwin/jest-mock-problem-StackOverflow
