const admin = require('./lib/admin');
const api = require('./lib/api');
const app = require('./lib/app');
const server = require('./lib/server');
const session = require('./lib/session');

session.players('76561198047446267', {searchKey: 'SteamID'})
  .then(console.log)
  .catch(console.error);

module.exports = {
  admin,
  api,
  app,
  server,
  session
};
