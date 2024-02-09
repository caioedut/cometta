import { rmSync } from 'fs';
import pmex from 'pmex';

// Remove current build
rmSync('dist', { force: true, recursive: true });

// Build with ParcelJS
pmex('parcel build --no-cache');
