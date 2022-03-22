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

- fs-extra
- progress
- ora
- Bluebird
- execa
- axios
- js-yaml
- lodash
- [listr](https://www.npmjs.com/package/listr)
- moment
- underscore.string
- chalk
- js-yaml
- delay
- glob
- inquirer
- p-retry
- marked, marked-terminal
- async
