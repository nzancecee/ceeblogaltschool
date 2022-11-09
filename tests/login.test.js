const mongoose = require('mongoose')
const server = require('../server')
const supertest = require('supertest')
const test = supertest(server)
const User = require('../models/User')

beforeEach(async () => {
  await User.deleteMany({})
  await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'johndoe1234',
  })
})

describe('POST request to /login', () => {
  test('is successful if user is registered in the database', async () => {
    const response = await test
      .post('/login')
      .send({
        email: 'johndoe@gmail.com',
        password: 'johndoe1234',
      })
      .expect(200)

    expect(response.body).toHaveProperty('token')
  })

  test('returns error if incorrect details are sent', async () => {
    const response = await test
      .post('/login')
      .send({
        email: 'johndoe@gmail.com',
      })
      .expect(403)

    expect(response.body).not.toHaveProperty('token')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
