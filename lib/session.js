const filter = require('lodash.filter');
const {send} = require('./bridge');

const session = () => {
    return {};
};

const players = async (search = {}) => {
    const {Players} = await send('GET', '/session/players');
    if (typeof search === 'string') {
        search = {DisplayName: search};
        const result = filter(Players, search);
        return result.length === 1 ? result[0] : {};
    }
    if (typeof search === 'number') {
        search = {SteamID: search};
        const result = filter(Players, search);
        return result.length === 1 ? result[0] : {};
    }
    return filter(Players, search);
};

const appendMethods = (path, actions = []) => {
    return entity => {
        const {EntityId, IsPowered} = entity;

        if (actions.some(action => action === 'power')) {
            const path = '/session/poweredGrids';
            entity.power = {
                up() {
                    console.log('POST', `${path}/${EntityId}`);
                    return send('POST', `${path}/${EntityId}`);
                },
                down() {
                    console.log('DELETE', `${path}/${EntityId}`);
                    return send('DELETE', `${path}/${EntityId}`);
                }
            }
        }

        if (actions.some(action => action === 'remove')) {
            entity.remove = () => send('DELETE', `${path}/${EntityId}`);
        }

        if (actions.some(action => action === 'stop')) {
            entity.stop = () => send('PATCH', `${path}/${EntityId}`);
        }

        return entity;
    };
};

const appendRemoveMethod = path => entity => ({
    ...entity,
    remove() {
        return send('DELETE', `${path}/${this.EntityId}`);
    }
});

const appendStopAndRemoveMethods = path => entity => ({
    ...entity,
    remove() {
        return send('DELETE', `${path}/${this.EntityId}`);
    }
});

const asteroids = async (search, methods = true) => {
    const path = '/session/asteroids';
    const {Asteroids} = await send('GET', path);
    const asteroids = methods ? Asteroids.map(appendRemoveMethod(path)) : Asteroids;
    if (typeof search === 'string') {
        search = {DisplayName: search};
        const result = filter(asteroids, search);
        return result.length === 1 ? result[0] : {};
    }
    if (typeof search === 'number') {
        search = {EntityId: search};
        const result = filter(asteroids, search);
        return result.length === 1 ? result[0] : {};
    }
    return filter(asteroids, search);
};

const floatingObjects = async (search, methods = true) => {
    const path = '/session/floatingObjects';
    const {FloatingObjects} = await send('GET', path);
    const floatingObjects = methods ? FloatingObjects.map(appendStopAndRemoveMethods(path)) : FloatingObjects;
    if (typeof search === 'string') {
        search = {DisplayName: search};
        const result = filter(floatingObjects, search);
        return result.length === 1 ? result[0] : {};
    }
    if (typeof search === 'number') {
        search = {EntityId: search};
        const result = filter(floatingObjects, search);
        return result.length === 1 ? result[0] : {};
    }
    return filter(floatingObjects, search);
};

const grids = async (search, methods = true) => {
    const path = '/session/grids';
    const {Grids} = await send('GET', path);
    const grids = methods ? Grids.map(appendMethods(path, ['remove', 'stop', 'power'])) : Grids;
    if (typeof search === 'string') {
        search = {DisplayName: search};
        const result = filter(grids, search);
        return result.length === 1 ? result[0] : {};
    }
    if (typeof search === 'number') {
        search = {EntityId: search};
        const result = filter(grids, search);
        return result.length === 1 ? result[0] : {};
    }
    return filter(grids, search);
};

const poweredGrids = () => {};

const planets = async (search, methods = true) => {
    const path = '/session/planets';
    const {Planets} = await send('GET', path);
    const planets = methods ? Planets.map(appendRemoveMethod(path)) : Planets;
    if (typeof search === 'string') {
        search = {DisplayName: search};
        const result = filter(planets, search);
        return result.length === 1 ? result[0] : {};
    }
    if (typeof search === 'number') {
        search = {EntityId: search};
        const result = filter(planets, search);
        return result.length === 1 ? result[0] : {};
    }
    return filter(planets, search);
};

const chat = (message) => {};

module.exports = {
    asteroids,
    floatingObjects,
    grids,
    planets,
    players
};
players()
    .then(result => console.log(result));

// grids()
//     .then(result => console.log(result));

const input = 139774542634671460;
grids(input)
    .then(result => console.log('\n\ninit:', result) || result.power.up())
    .then(result => console.log('\n\nupdate:', result) || grids(input))
    .then(result => console.log('\n\nfinal:', result));
