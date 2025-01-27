const request = require('supertest');
const app = require('../../src/api/app');

describe('verify customer', () => {
  it('should return status 200 and a message', async () => {
    const response = await request(app).post('/api/v1/auth/customer/verify').send({
      phone: 7013140693
    });
    expect(response.status).toBe(200);           // Check status code is 200
    expect(response.body).toHaveProperty('message');  // Check for a 'message' property in the response
  });
});