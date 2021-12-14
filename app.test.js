/* app.test.js
Simple test suite for server.js using 'supertest'
*/

const app = require("./app.js");
const request = require("supertest");

jest.setTimeout(10000);

describe("test GET at /:owner/:repoName", () => {
  it("should return a 404 for invalid repo name", done => {
    request(app).get("/pedrojperez1/notavalidrepo").expect(404, done);
  });

  it("should return 200 with message if repo has zero PRs", done => {
    request(app)
      .get("/pedrojperez1/roar")
      .expect(200)
      .expect(res => {
        res.body.msg = "This repo has zero open PRs!";
      })
      .end(() => {
        return done();
      });
  });

  it("should return 200 with an array of PRs", done => {
    request(app)
      .get("/colinhacks/zod")
      .expect(200)
      .expect(res => {
        res.body.data.length > 1;
      })
      .end(() => {
        return done();
      });
  });
});
