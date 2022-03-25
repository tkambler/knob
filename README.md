# Knob

Knob is a stand-alone binary for MacOS, Windows, and Linux that packages a recent Node LTS release (currently, 16.13.2) along with a collection of third-party packages that are useful for creating CLI utilities.

The intended use case is to place knob within the user's PATH, thus allowing the creation of executable shell scripts in a language more expressive than bash:

```javascript
#!/usr/bin/env knob

const path = require('path');
const os = require('os');

module.exports = async ({ express, morgan }) => {
  const app = express();
  app.use(morgan('combined'));
  app.use(express.json());

  app.use('/files', express.static(__dirname));

  app.route('/').get((req, res, next) => {
    return res.send({
      message: 'Hello, world.',
    });
  });

  app.listen(9070, () => {
    console.log('App is listening on port: 9070');
  });
};
```

## knobfile.js

If no target script is passed to knob, it will walk up the directory tree in search of a `knobfile.js` file. If found, it will execute that. Otherwise, it will print an error to the console and exit with status code 1. To override this behavior and prevent knob from searching for `knobfile.js`, set the `IGNORE_KNOBFILE` environment variable to 1.

## Installing and Updating

To install or update knob, run the [install script](https://raw.githubusercontent.com/tkambler/knob/v0.0.5/install.sh). To do that, you may either download and run the script manually, or use the following wget or curl command:

### wget

```
wget -qO- https://raw.githubusercontent.com/tkambler/knob/v0.0.6/install.sh | bash
```

### curl

```
curl -o- https://raw.githubusercontent.com/tkambler/knob/v0.0.6/install.sh | bash
```

## Compiling from Source

Just run `make`. Distributable binaries for MacOS, Linux, and Windows will be saved to `./dist`.

## Which packages does it include?

- [async](https://www.npmjs.com/package/async)
- [AWS SDK](https://www.npmjs.com/package/aws-sdk)
- [axios](https://www.npmjs.com/package/axios)
- [Bluebird](https://www.npmjs.com/package/bluebird)
- [chalk](https://www.npmjs.com/package/chalk)
- [commander](https://www.npmjs.com/package/commander)
- [conf](https://www.npmjs.com/package/conf)
- [delay](https://www.npmjs.com/package/delay)
- [enquirer](https://www.npmjs.com/package/enquirer)
- [execa](https://www.npmjs.com/package/execa)
- [express](https://expressjs.com/)
- [find-up](https://www.npmjs.com/package/find-up)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [get-port](https://www.npmjs.com/package/get-port)
- [glob](https://www.npmjs.com/package/glob)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [is-elevated](https://www.npmjs.com/package/is-elevated)
- [is-port-reachable](https://www.npmjs.com/package/is-port-reachable)
- [is-root](https://www.npmjs.com/package/sudo)
- [js-yaml](https://www.npmjs.com/package/js-yaml)
- [js-yaml](https://www.npmjs.com/package/js-yaml)
- [json-to-pretty-yaml](https://www.npmjs.com/package/json-to-pretty-yaml)
- [listr2](https://www.npmjs.com/package/listr2)
- [lodash](https://www.npmjs.com/package/lodash)
- [marked](https://www.npmjs.com/package/marked), [marked-terminal](https://www.npmjs.com/package/marked-terminal)
- [moment](https://www.npmjs.com/package/moment)
- [morgan](https://www.npmjs.com/package/morgan)
- [node-ssh](https://www.npmjs.com/package/node-ssh)
- [ora](https://www.npmjs.com/package/ora)
- [p-retry](https://www.npmjs.com/package/p-retry)
- [prettyjson](https://www.npmjs.com/package/prettyjson)
- [progress](https://www.npmjs.com/package/progress)
- [ssh-config](https://www.npmjs.com/package/ssh-config)
- [sudo-block](https://www.npmjs.com/package/sudo-block)
- [sudo](https://www.npmjs.com/package/sudo)
- [underscore.string](https://www.npmjs.com/package/underscore.string)
