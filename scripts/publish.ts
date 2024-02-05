import pmex from 'pmex';
import { execSync } from 'child_process';

pmex('test');

pmex('build');

pmex('npm version patch');

execSync('npm publish', { stdio: 'inherit' });

execSync('git push', { stdio: 'inherit' });
