import pmex, { args } from 'pmex';

pmex('biome check ./scripts ./src ./tests');

pmex('tsc --noEmit --skipLibCheck');

pmex(`jest ${args()._raw}`);
