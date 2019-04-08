const app = require('express')();
const {send} = require('./lib/bridge.js');
const session = require('./lib/session');

app.all('*', (req, res) => {
    const path = req.path !== '/' ? req.path : '/server';
    console.log('All Route', req.method, path);
    return send(req.method, path)
        .then(body => res.json(body.data))
        .catch(({ message, error }) => {
            console.error(`${message} error:`, error);
            return res.sendStatus(500);
        });
});

app.listen(8081);

session.players()
    .then(players => console.log(players));
