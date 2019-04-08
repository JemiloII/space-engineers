const config = require('config');
const crypto = require('crypto');
const request = require('request-promise');

const {baseUrl, port, prefix, secret} = config.get('SpaceEngineers');

const getNonce = () => crypto.randomBytes(20).toString('base64');
const getUtcDate = () => new Date().toUTCString();

const opts = (method, api) => {
    const url = `${baseUrl}:${port}${prefix}${api}`;
    const nonce = getNonce();
    const date = getUtcDate();

    const key = Buffer.from(secret, 'base64');
    const message = `${prefix}${api}\r\n${nonce}\r\n${date}\r\n`;
    const hash = crypto.createHmac('sha1', key).update(Buffer.from(message)).digest('base64');

    return {
        url,
        headers: {
            Authorization: `${nonce}:${hash}`,
            Date: date
        },
        json: true,
        method
    };
};

const send = (method, path) =>
    request(opts(method, path))
        .then(({data}) => data);

module.exports = {
    send
};
