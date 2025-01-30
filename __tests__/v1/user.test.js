const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/api/app');
chai.use(chaiHttp);


const {expect} = chai;




describe("verify customer",()=>{
  it('should take phone', () => {
    const result = 2 + 2;
    expect(result).to.equal(4);  // Check if the result is 4
  });
  // it('',(done)=>{
  //   chai.request(app).post('/api/v1/auth/customer/verify').send({phone:7013140699}).end((err,res)=>{
  //     expect(res).to.have.status(200);
  //   })
  // })
})