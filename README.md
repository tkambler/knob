# Knob

Knob is a stand-alone binary for MacOS, Windows, and Linux that packages a recent Node LTS release (currently, 16.13.2) along with a collection of third-party packages that are useful for creating CLI utilities.

The intended use case is to place knob within the user's PATH, thus allowing the creation of executable shell scripts in a language more expressive than bash:

```
#!/usr/bin/env knob

const path = require('path');
const os = require('os');

module.exports = async ({
    _,
    _fp,
    async,
    axios,
    Bluebird,
    chalk,
    delay,
    execa,
    fs,
    glob,
    inquirer,
    listr,
    ora,
    ProgressBar,
    retry,
    str,
    yaml,
    marked,
    moment,
    TerminalRenderer,
}) => {

    const files = await params.glob('*', {
        cwd: os.homedir(),
    });

    console.log(files);

    const answers = await params.inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: value => value.trim() ? true : false,
        }
    ]);

    console.log(answers);

    const spinner = params.ora('Flurping...').start();

    const { data } = await params.axios.get('https://jsonplaceholder.typicode.com/todos/1');

    spinner.succeed('Flurping complete.');

    console.log(data);

    console.log(params.marked.marked(`
# Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## More Info

Here is a list. What do you think about that?

- Item One
- Item Two
- Item Three

_This is italic text._

\`\`\`
# This is a doc block.
$ uptime
\`\`\`
    `));

};
```

## Which packages does it include?

- [commander](https://www.npmjs.com/package/commander)
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
