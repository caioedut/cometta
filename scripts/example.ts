import { cpSync, existsSync, rmSync } from 'node:fs';
import * as process from 'node:process';
import pmex, { args } from 'pmex';

const example = args()._[0];

const cwd = `./examples/cometta-${example}`;

if (!example || !existsSync(cwd)) {
  console.error(`Example "${example}" not found.\n`);
  process.exit();
}

pmex('build');

pmex('install', { cwd });

rmSync(`${cwd}/node_modules/cometta`, {
  force: true,
  recursive: true,
});

cpSync('./dist', `${cwd}/node_modules/cometta/dist`, {
  force: true,
  recursive: true,
});

cpSync('./package.json', `${cwd}/node_modules/cometta/package.json`, {
  force: true,
});

pmex('dev', { cwd });
