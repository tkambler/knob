import * as fs from 'fs-extra';
import ProgressBar from 'progress';
import ora from 'ora';
import * as path from 'path';
import Bluebird from 'bluebird';
import * as execa from 'execa';
import axios from 'axios';
import { default as Conf } from 'conf';
import * as Commander from 'commander';
import yaml from 'js-yaml';
import * as str from 'underscore.string';
import _ from 'lodash';
import moment from 'moment';
import delay from 'delay';
import chalk from 'chalk';
import glob from 'glob';
import * as inquirer from 'inquirer';
import * as enquirer from 'enquirer'; // Used by listr2
import * as async from 'async';
import retry from 'p-retry';
import * as marked from 'marked';
import TerminalRenderer from 'marked-terminal';
import _fp from 'lodash/fp.js';
import pkg from './package.json';
import { Listr } from 'listr2';

switch (process.argv[2]) {
  case '--version':
  case '-v':
    console.log(`v${pkg.version}`);
    process.exit(0);
}

if (!process.argv[2]) {
  console.error('No script specified');
  process.exit(1);
}

marked.setOptions({
  renderer: new TerminalRenderer({
    reflowText: true,
  }),
});

const script = path.isAbsolute(process.argv[2])
  ? process.argv[2]
  : path.resolve(process.cwd(), process.argv[2]);

require(script)(
  {
    _,
    _fp,
    async,
    axios,
    Bluebird,
    chalk,
    Commander,
    Conf: function (options = {}) {
      if (!options.projectName) {
        throw new Error(`Conf: options.projectName is required`);
      }
      // if (!options.projectVersion) {
      //   throw new Error(`Conf: options.projectVersion is required`);
      // }
      return new Conf(options);
    },
    delay,
    enquirer,
    execa,
    fs,
    glob: Bluebird.promisify(glob),
    inquirer,
    Listr,
    marked: marked,
    moment,
    ora,
    ProgressBar,
    retry,
    str,
    TerminalRenderer,
    yaml,
  },
  {
    version: pkg.version,
    argv: process.argv.slice(1),
  }
);
