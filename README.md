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

```
# Using wget
wget -qO- https://raw.githubusercontent.com/tkambler/knob/v0.0.5/install.sh | bash
```

```
# Using curl
curl -o- https://raw.githubusercontent.com/tkambler/knob/v0.0.5/install.sh | bash
```

## Compiling from Source

Just run `make`. Distributable binaries for MacOS, Linux, and Windows will be saved to `./dist`.

## Which packages does it include?

- [prettyjson](https://www.npmjs.com/package/prettyjson)
- [json-to-pretty-yaml](https://www.npmjs.com/package/json-to-pretty-yaml)
- [AWS SDK](https://www.npmjs.com/package/aws-sdk)
- [ssh-config](https://www.npmjs.com/package/ssh-config)
- [node-ssh](https://www.npmjs.com/package/node-ssh)
- [express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [find-up](https://www.npmjs.com/package/find-up)
- [sudo](https://www.npmjs.com/package/sudo)
- [is-root](https://www.npmjs.com/package/sudo)
- [is-elevated](https://www.npmjs.com/package/is-elevated)
- [sudo-block](https://www.npmjs.com/package/sudo-block)
- [commander](https://www.npmjs.com/package/commander)
- [conf](https://www.npmjs.com/package/conf)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [progress](https://www.npmjs.com/package/progress)
- [ora](https://www.npmjs.com/package/ora)
- [Bluebird](https://www.npmjs.com/package/bluebird)
- [execa](https://www.npmjs.com/package/execa)
- [axios](https://www.npmjs.com/package/axios)
- [js-yaml](https://www.npmjs.com/package/js-yaml)
- [lodash](https://www.npmjs.com/package/lodash)
- [listr2](https://www.npmjs.com/package/listr2)
- [moment](https://www.npmjs.com/package/moment)
- [underscore.string](https://www.npmjs.com/package/underscore.string)
- [chalk](https://www.npmjs.com/package/chalk)
- [js-yaml](https://www.npmjs.com/package/js-yaml)
- [delay](https://www.npmjs.com/package/delay)
- [glob](https://www.npmjs.com/package/glob)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [enquirer](https://www.npmjs.com/package/enquirer)
- [p-retry](https://www.npmjs.com/package/p-retry)
- [marked](https://www.npmjs.com/package/marked), [marked-terminal](https://www.npmjs.com/package/marked-terminal)
- [async](https://www.npmjs.com/package/async)
