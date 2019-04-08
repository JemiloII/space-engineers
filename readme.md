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
