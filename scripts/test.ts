import { execSync } from 'child_process';
import pmex from 'pmex';

const args = process.argv.slice(2).join(' ');

pmex('biome check ./scripts ./src ./tests');

pmex('tsc --noEmit');

execSync(`jest ${args}`, { stdio: 'inherit' });
