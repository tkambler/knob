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
import str from 'underscore.string';
import _ from 'lodash';
import moment from 'moment';
import delay from 'delay';
import morgan from 'morgan';
import chalk from 'chalk';
import prettyJSON from 'prettyjson';
import glob from 'glob';
import sudo from 'sudo';
import { findUp } from 'find-up';
import express from 'express';
import sudoBlock from 'sudo-block';
import isElevated from 'is-elevated';
import isRoot from 'is-root';
import { NodeSSH } from 'node-ssh';
import * as inquirer from 'inquirer';
import * as enquirer from 'enquirer'; // Used by listr2
import * as async from 'async';
import * as AWS from 'aws-sdk';
import prettyYAML from 'json-to-pretty-yaml';
import SSHConfig from 'ssh-config';
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

marked.setOptions({
  renderer: new TerminalRenderer({
    reflowText: true,
  }),
});

(async () => {
  let script;
  let argv;

  if (!process.argv[2]) {
    if (process.env.IGNORE_KNOBFILE === '1') {
      console.error('Error: No script specified');
      process.exit(1);
    }
    const knobFile = await findUp('knobfile.js');
    if (!knobFile) {
      console.error('Error: No script specified and no knobfile.js found');
      process.exit(1);
    } else {
      script = knobFile;
    }
  } else {
    const _script = path.isAbsolute(process.argv[2])
      ? process.argv[2]
      : path.resolve(process.cwd(), process.argv[2]);
    if (await fs.pathExists(_script)) {
      script = _script;
      argv = process.argv.slice(1);
    } else {
      if (process.env.IGNORE_KNOBFILE === '1') {
        console.error(`Script does not exist: ${script}`);
        process.exit(1);
      }
      const knobFile = await findUp('knobfile.js');
      if (knobFile) {
        script = knobFile;
        argv = [process.argv[0], knobFile, ...process.argv.slice(2)];
      } else {
        console.error(`Script does not exist: ${script}`);
        process.exit(1);
      }
    }
  }

  require(script)(
    {
      _,
      _fp,
      AWS,
      async,
      axios,
      Bluebird,
      chalk,
      Commander,
      Conf: function (options = {}) {
        if (!options.projectName) {
          throw new Error(`Conf: options.projectName is required`);
        }
        return new Conf(options);
      },
      delay,
      enquirer,
      execa,
      express,
      fs,
      glob: Bluebird.promisify(glob),
      inquirer,
      Listr,
      marked: marked,
      morgan,
      NodeSSH,
      moment,
      ora,
      ProgressBar,
      prettyYAML,
      prettyJSON,
      retry,
      str,
      isElevated,
      isRoot,
      SSHConfig,
      sudo,
      sudoBlock,
      TerminalRenderer,
      yaml,
    },
    {
      version: pkg.version,
      argv,
    }
  );
})();
