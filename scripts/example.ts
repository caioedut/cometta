import { existsSync, rmSync } from 'node:fs';
import * as process from 'node:process';
import pmex, { args } from 'pmex';

const example = args()._args[0];

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
    bun: 'install',
    npm: 'install && npm prune',
    pnpm: 'install --fix-lockfile',
    yarn: 'install --check-files',
  },
  { cwd },
);

pmex('dev', { cwd });
