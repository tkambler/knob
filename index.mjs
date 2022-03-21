import * as fs from 'fs-extra';
import progress from 'progress';
import ora from 'ora';
import * as path from 'path';
import * as Bluebird from 'bluebird';
import * as execa from 'execa';
import axios from 'axios';
import yaml from 'js-yaml';
import * as str from 'underscore.string';
import _ from 'lodash';
import moment from 'moment';
import delay from 'delay';
import chalk from 'chalk';
import glob from 'glob';
import * as inquirer from 'inquirer';
import * as async from 'async';
import retry from 'p-retry';
import * as marked from 'marked';
import TerminalRenderer from 'marked-terminal';
const _fp = require('lodash/fp');
const script = process.argv[2];

if (!script) {
  throw new Error('No script specified');
}

marked.setOptions({
    renderer: new TerminalRenderer({
        reflowText: true,
    }),
});

var $ = {
    _,
    _fp,
    async,
    axios,
    Bluebird,
    chalk,
    delay,
    execa,
    fs,
    glob: Bluebird.promisify(glob),
    inquirer,
    ora,
    progress,
    retry,
    str,
    yaml,
    marked: marked,
    moment,
    TerminalRenderer,
};

if (path.isAbsolute(script)) {
    require(script)($);
} else {
    require(path.resolve(process.cwd(), script))($);
}
