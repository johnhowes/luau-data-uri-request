const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
chai.use(chaiAsPromised);
const dataURIRequest = require("../src");

describe("data URI request", function () {
  it("should respond to request.send() with the requested content", function (done) {
    var ctx = {
      request: {
        url: "data:text/plain;charset=utf-8,Hello%2C%20World%21"
      }
    };
    
    dataURIRequest(ctx, async () => {}).then(() => {
      ctx.request.send().then(() => {
        ctx.response.type.should.equal("text/plain;charset=utf-8");
        ctx.response.data.toString().should.equal("Hello, World!");
        done();
      }).catch(done);
    }).catch(done);
  });
  
  it("should handle a base64 data URI", function (done) {
    var ctx = {
      request: {
        url: "data:text/plain;charset=utf-8;base64,SGVsbG8sIFdvcmxkIQ=="
      }
    };
    
    dataURIRequest(ctx, async () => {}).then(() => {
      ctx.request.send().then(() => {
        ctx.response.type.should.equal("text/plain;charset=utf-8");
        ctx.response.data.toString().should.equal("Hello, World!");
        done();
      }).catch(done);
    }).catch(done);
  });
  
  it("should ignore requests for other protocols", function (done) {
    var ctx = {
      request: {
        url: "http://example.com"
      }
    };
    
    dataURIRequest(ctx, async () => {
      should.not.exist(ctx.request.send);
      done();
    });
  });
});
