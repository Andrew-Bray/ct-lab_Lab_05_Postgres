require('dotenv').config();
const request = require('supertest');
const app = require('../index.js');
const Kitty = require('../lib/models/Kittycats');
const pool = require('../lib/utils/pool');
const fs = require('fs');

describe ('app endpoints for cats', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
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

  it('finds a cat by ID', async() => {
    const cat = await Kitty
      .insert({
        breed: 'tabby',
        description: 'adooooorable',
        url: 'http://www.tabbytabtab.com'
      });
      
    const res = await request(app)
      .get(`/kittycats/${cat.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      breed: 'tabby',
      description: 'adooooorable',
      url: 'http://www.tabbytabtab.com'
    });
  });

  it('should get all of the kitties back', async() => {
    const kittycats = await Promise.all(
      [
        {
          breed: 'tabby',
          description: 'adooooorable',
          url: 'http://www.tabbytabtab.com'
        },
        {
          breed: 'tobby',
          description: 'adooooorable',
          url: 'http://www.tabbytabtab.com'
        },
        {
          breed: 'teeabby',
          description: 'adooooorable',
          url: 'http://www.tabbytabtab.com'
        }].map(cat => Kitty.insert(cat)));

    const res = await request(app)
      .get('/kittycats');

    expect(res.body).toEqual(expect.arrayContaining(kittycats));
  });

  it('should update a kittycat', async() => {
    const cat = await Kitty
      .insert({
        breed: 'teeabby',
        description: 'adooooorable',
        url: 'http://www.tabbytabtab.com'
      });
    
    const res = await request(app)
      .put(`/kittycats/${cat.id}`)
      .send({
        breed: 'teeabby',
        description: 'adooooorable',
        url: 'http://www.tabbytabtab.com'
      });
    
    expect(res.body).toEqual({
      id: cat.id,
      breed: 'teeabby',
      description: 'adooooorable',
      url: 'http://www.tabbytabtab.com'
    });

  });

  it('should delete a kitty', async() => {
    const kitty = await Kitty
      .insert({
        breed: 'teeabby',
        description: 'adooooorable',
        url: 'http://www.tabbytabtab.com'
      });

    const res = await request(app)
      .delete(`/kittycats/${kitty.id}`);

    expect(res.body).toEqual({
      id: kitty.id,
      breed: 'teeabby',
      description: 'adooooorable',
      url: 'http://www.tabbytabtab.com'
    });
  });
});
