require('dotenv').config();
const request = require('supertest');
const app = require('../index.js');

describe ('app endpoints for cats', () => {
  it('responds with our added kittycat', async() => {
    const res = await request(app)
      .post('/kittycats')
      .send({
        breed: 'tabby',
        description: 'adooooorable',
        url: 'http://www.tabbytabtab.com'
      });

    expect(res.body).toEqual({
      id: expect.anything(),
      breed: 'tabby',
      description: 'adooooorable',
      url: 'http://www.tabbytabtab.com'
    });
  });
});
