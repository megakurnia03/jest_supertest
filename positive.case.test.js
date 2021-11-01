//endpoint 
const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.baseUrl);

//register functionality
const register = api.post('api/register');

//login functionality
const login = api.post('api/login');

//user functionality
const getUser = api.get('api/users');
const getSingleUser = (id) => api.get('api/users/'+ id);
const UpdateUser = (id) => api.put('api/users/'+ id);
const deleteUser = (id) => api.delete('api/users/'+ id);
const getUserPerPage = (page) => api.get('api/users?page='+ page);
const createUser = api.post('api/users');
const getUserResource = api.get('api/unknown');
const getSingleResource = (id) => api.get('api/unknown/'+ id);


const bodyUser = {
  "data": {
    "id": 2,
    "email": "janet.weaver@reqres.in",
    "first_name": "Janet",
    "last_name": "Weaver",
    "avatar": "https://reqres.in/img/faces/2-image.jpg"
  },
  "support": {
    "url": "https://reqres.in/#support-heading",
    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
}
}

//request dan validate response(expect)
describe('#1 check login functionality', () =>{

  test('1.1 Login User Succesfully', async () => {
    const response = await login
      .send({
        email: "eve.holt@reqres.in",
        password: "abc"
      })
    expect(response.status).toEqual(200)
    //expect(res.body).toHaveProperty('post')
  });

});

describe('#2 check register functionality', () =>{

  test('Register User Succesfully', async () => {
    const response = await register
      .send({
        email: "eve.holt@reqres.in",
        password: "pistol"
      })
    expect(response.status).toEqual(200)
    //expect(res.body).toHaveProperty('post')
  });

});

describe('#3 Check User Functionality', () => {

    test( '3.1 Get User', async () => {
    const response = await getUser;
    expect(response.status).toEqual(200);
   
    });

    test('3.2 Get Single User', async () =>{
      const response = await getSingleUser(2);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(bodyUser);
    });

    test('3.3 Get User per Page', async () =>{
      const response = await getUserPerPage(2);
      expect(response.status).toEqual(200);
    })

    test('3.4 Create user', async () => {
      const response = await createUser
        .send({
          name: 'mega',
          job: 'QA Engineer',
        })
      expect(response.status).toEqual(201)
      //expect(res.body).toHaveProperty('post')
    });

    test('3.5 Update User', async () =>{
      const response = await UpdateUser(2)
      .send({
        name: 'mega',
        job: 'QA Engineer',
      })
      expect(response.status).toEqual(200);
    });


    test('3.7 Delete User', async () =>{
      const response = await deleteUser(1);
      expect(response.status).toEqual(204);
    });

    test('Single User Not Found', async () =>{
      const response = await getSingleUser(23);
      expect(response.status).toEqual(404);
    });

    test( 'Get User Resource', async () => {
      const response = await getUserResource;
      expect(response.status).toEqual(200);
     
      });

      test('Get Single Resource', async () =>{
        const response = await getSingleResource(2);
        expect(response.status).toEqual(200);
      });

      test('Get Single Resource', async () =>{
        const response = await getSingleResource(23);
        expect(response.status).toEqual(404);
      });

});
