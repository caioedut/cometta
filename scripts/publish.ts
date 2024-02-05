import pmex from 'pmex';
import { execSync } from 'child_process';
import { copyFileSync } from 'fs';

pmex('test');

pmex('build');

pmex('npm version patch');

execSync('npm publish', { stdio: 'inherit' });

execSync('git push', { stdio: 'inherit' });
