const koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa-cors');

const site = require('./Routes/site');

const { HOST="0.0.0.0", PORT=8080 } = process.env;

const app = koa();

app
  .use(cors())
  .use(koaBody())
  .use(site.routes())
  .use(site.allowedMethods())
  .use(function* (next) {
    if ("string" == typeof this.body) {
      this.body = { "message": this.body };
    }
  });

app.listen({ host: HOST, port: PORT }, () => {
  console.log(`koa server listen at ${HOST}:${PORT}`);
});
