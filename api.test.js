const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./api.js");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Express API", () => {
  it("should respond with a cat image URL", (done) => {
    chai
      .request(app)
      .get("/images/getimg")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.have.property("url");
        expect(res.body[0].url).to.be.a("string");
        done();
      });
  });

  it("should respond with a health check status", (done) => {
    chai
      .request(app)
      .get("/images/healthcheck")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ healthcheck: "OK" });
        done();
      });
  });
});
