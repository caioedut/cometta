import { existsSync, rmSync } from 'fs';
import pmex from 'pmex';
import * as process from 'process';

const example = process.argv.slice(2)[0];

const cwd = `./examples/cometta-${example}`;

if (!example || !existsSync(cwd)) {
  console.error(`Example "${example}" not found.\n`);
  process.exit();
}

pmex('build');

rmSync(`${cwd}/node_modules/@react-bulk`, {
  force: true,
  recursive: true,
});

pmex(
  {
    npm: 'install && npm prune',
    pnpm: 'install --fix-lockfile',
    yarn: 'install --check-files',
  },
  { cwd },
);

pmex('dev', { cwd });
