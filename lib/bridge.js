const config = require('config');
const crypto = require('crypto');
const querystring = require('querystring');
const request = require('request-promise');

const {baseUrl, port, prefix, secret} = config.get('SpaceEngineers');

const getNonce = () => crypto.randomBytes(20).toString('base64');
const getUtcDate = () => new Date().toUTCString();

const opts = (method, api, {body, qs} = {}) => {
  const url = `${baseUrl}:${port}${prefix}${api}`;
  const nonce = getNonce();
  const date = getUtcDate();
  const query = qs ? `?${querystring.stringify(qs)}` : '';

  const key = Buffer.from(secret, 'base64');
  const message = `${prefix}${api}${query}\r\n${nonce}\r\n${date}\r\n`;
  const hash = crypto.createHmac('sha1', key).update(Buffer.from(message)).digest('base64');

  return {
    url: url + query,
    headers: {
      Authorization: `${nonce}:${hash}`,
      Date: date
    },
    json: true,
    body,
    method
  };
};

const send = (method, path, {body, qs, log = false} = {}) => {
  if (log) {
    console.log(`${method}: ${opts(method, path).url}`)
  }

  return request(opts(method, path, {body, qs}))
    .then((result) => {
      if (log) {
        console.log(result);
      }

      const {data} = result;
      return data || {};
    })
    .catch(e => console.error(`${e.statusCode}: ${e.statusMessage}`));
};

module.exports = {
  send
};
