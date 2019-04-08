const assert = require('assert').strict;
const rewire = require('rewire');
const sinon = require('sinon');

const session = rewire('./session');

describe('session.js', () => {
    const reverts = [];

    afterEach(() => reverts.forEach(revert => revert()));

    describe('players()', () => {
        let sendStub;
        const mock = {
            Players: [
                {
                    SteamID: 12345,
                    DisplayName: 'xdakotawhitex',
                    FactionName: 'Angels of Heaven',
                    FactionTag: 'AoH',
                    PromoteLevel: 4,
                    Ping: 148
                },
                {
                    SteamID: 2345,
                    DisplayName: 'Amber',
                    FactionName: 'Adept',
                    FactionTag: 'Adept',
                    PromoteLevel: 1,
                    Ping: 21
                },
                {
                    SteamID: 3456,
                    DisplayName: 'OTHERMATT',
                    FactionName: 'Angels of Heaven',
                    FactionTag: 'AoH',
                    PromoteLevel: 4,
                    Ping: 69
                }
            ]
        };

        beforeEach(() => {
            sendStub = sinon.stub();
            reverts.push(session.__set__('send', sendStub));
        });

        it('returns the list of players', () => {
            sendStub.resolves(mock);
            return session.players()
                .then(players => assert.deepStrictEqual(players, mock.Players));
        });

        it('returns the list of players by using the search object faction tag', () => {
            sendStub.resolves(mock);
            return session.players({FactionTag: 'AoH'})
                .then(players => assert.deepStrictEqual(players, [mock.Players[0], mock.Players[2]]));
        });

        it('returns the list of players by string name', () => {
            sendStub.resolves(mock);
            return session.players('Amber')
                .then(players => assert.deepStrictEqual(players, [mock.Players[1]]));
        });

        it('returns the list of players by steam id', () => {
            sendStub.resolves(mock);
            return session.players(12345)
                .then(players => assert.deepStrictEqual(players, [mock.Players[0]]));
        });
    });
});
