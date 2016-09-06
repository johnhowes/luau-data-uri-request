Luau Data URI Request
================================================

Luau middleware component to handle requests for data URIs.

Usage
------------------------------------------------

```js

const app = new Luau();
const dataURIRequest = require("luau-data-uri-request");

app.use(dataURIRequest);

app.use(async ctx => {
  await ctx.request.send();
  console.log(ctx.response.type === "text/plain;charset=utf-8");
  console.log(ctx.response.data.toString() === "Hello, World!");
});

app.request("data:text/plain;charset=utf-8,Hello%2C%20World%21");

```
