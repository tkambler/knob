import * as fs from 'fs-extra';
import ProgressBar from 'progress';
import ora from 'ora';
import * as path from 'path';
import Bluebird from 'bluebird';
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
import _fp from 'lodash/fp.js';
import pkg from './package.json';
import { Listr } from 'listr2';
const script = process.argv[2];

if (!script) {
  console.error('No script specified');
  process.exit(1);
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
  Listr,
  ProgressBar,
  retry,
  str,
  yaml,
  marked: marked,
  moment,
  TerminalRenderer,
};

if (path.isAbsolute(script)) {
  require(script)($, {
    version: pkg.version,
  });
} else {
  require(path.resolve(process.cwd(), script))($, {
    version: pkg.version,
  });
}
