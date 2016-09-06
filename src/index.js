/* jshint node: true */
/* jshint esversion: 6 */
"use strict";

const url = require("url");

module.exports = exports = async (ctx, next) => {
  var parsedURL = url.parse(ctx.request.url);
  if (parsedURL.protocol !== "data:") return await next();
  
  var path = parsedURL.href.replace(parsedURL.protocol, "");
  var contentIndex = path.indexOf(",") + 1;
  var type, encoding;
  
  if (contentIndex === 1) {
    type = "text/plain;charset=US-ASCII";
    encoding = "ascii";
  } else {
    type = path.substr(0, contentIndex - 1);
    if (type.indexOf(";base64") !== -1) {
      encoding = "base64";
      type = type.replace(";base64", "");
    }
  }
  
  var content = path.substr(contentIndex);
  encoding = encoding || "utf8";
  
  if (encoding === "utf8") {
    content = decodeURIComponent(content);
  }
  
  ctx.request.send = async () => {
    ctx.response = {
      type: type,
      data: new Buffer(content, encoding)
    };
  };
  
  await next();
};
