import { expect } from 'chai'; // Use named import
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/api/app.js';

chai.use(chaiHttp);

describe("Verify customer", () => {
  it('should add numbers correctly', () => {
    const result = 2 + 2;
    expect(result).to.equal(4);
  });

  it('should verify customer phone number', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/customer/verify')
      .send({ phone: 7013140699 });

    expect(res).to.have.status(200);
  });
});
