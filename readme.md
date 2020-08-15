# space-engineers
Space Engineers Node.js API Based on the Official Rest API.

## Using
This project uses node config. Inorder to setup, copy `/config` to the root of your project. Then create 
`config/local.json` to store your server secret in the `"SpaceEngineers"` object.

Example `config/local.json`:

```json
{
  "SpaceEngineers": {
    "baseUrl": "http://your.domain.or.ip.here",
    "secret": "YourSecretHashKeyHere=="
  }
}
```

If you already use config, make sure to add the following to your `default.json`

```json
{
  "SpaceEngineers": {
    "baseUrl": "http://localhost",
    "port": 8080,
    "prefix": "/vrageremote"
  }
}
```

Exports

```js
{
  // Admin Routes
  admin: {
    demotePlayer,
    bannedPlayers,
    banPlayer,
    kickedPlayers,
    kickPlayer,
    promotePlayer
  },
  // API Routes
  api: {
    api
  },
  // Express Server Instance
  app,
  // Server Routes
  server: {
    info,
    ping,
    stop
  },
  // Session Routes
  session: {
    asteroids,
    characters,
    chat,
    economyAnalysis,
    floatingObjects,
    grids,
    planets,
    players,
    save 
  }
}
```

Most methods will return an array or single object.
In every object, you might find additional methods attached:
- remove
- stop
- power.on
- power.off

For the players method, objects will have additional methods.
- ban
- kick
- promote
- demote