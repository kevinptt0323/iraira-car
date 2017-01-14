const socket = require('koa-socket');

const gameio = new socket();

gameio.on('join', (ctx, data) => {
  console.log('join event fired', data);
});

module.exports = gameio;
