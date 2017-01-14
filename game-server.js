const socket = require('koa-socket');

const gameio = new socket();

function log(msg) {
  console.log(`${Date()}: ${msg}`);
}

gameio.on('join', (ctx, {player}) => {
  log(`New player join: ${player}`);
});

gameio.on('position', (ctx, {player, stage, cursorX, cursorY}) => {
  log(`Position: ${player} at (${cursorX}, ${cursorY}) in stage ${stage}`);
});

module.exports = gameio;
