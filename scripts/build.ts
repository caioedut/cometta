import { rmSync } from 'node:fs';
import pmex from 'pmex';

// Remove current build
rmSync('dist', { force: true, recursive: true });

// Build with TSUP
pmex('tsup src/index.ts --dts --sourcemap --format esm,cjs');
