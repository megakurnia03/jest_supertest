const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.baseUrl);

const login = api.post('api/login');
const register = api.post('api/register');

describe('#1 check login functionality', () =>{
  test('1.2 Login UnSuccesfully - Login with registered email but without password', async () => {
    const response = await login
      .send({
        email: "peter@klaven"
      })
    expect(response.status).toEqual(400)
  });

});

describe('#2 check register functionality', () =>{

    test('1.2 Register User UnSuccesfully - fill register data with only email', async () => {
      const response = await register
        .send({
          email: "eve.holt@reqres.in"
        })
      expect(response.status).toEqual(400)
      //expect(res.body).toHaveProperty('post')
    });
  
  });

