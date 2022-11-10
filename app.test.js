const request = require('supertest')
const { response } = require('./app')

const app = require('./app')

describe('Todos Api', () => {
  it('GET /todos --> Array of todos', () => {
    return request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean)
            })
          ])
        )
      })
  })
  it('GET /todos/id --> specific todo with ID', () => {
    return request(app)
      .get('/todos/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean)
          })
        )
      })
  })

  it('GET /todos/:id --> 404  not found', () => {
    return request(app)
      .get('/todos/999999')
      .expect(404)
  })

  it('POST /todos --> ', () => {
    return request(app)
      .post('/todos')
      .send({
        name: 'do dishesh'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: 'do dishesh',
            completed: false
          })
        )
      })
  })
  it('POST /todos --> validate requests ', () => {
    return request(app)
      .post('/todos')
      .send({ name: 123 })
      .expect(422)
  })
})
