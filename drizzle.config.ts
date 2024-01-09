import { cwd } from 'node:process';
import type { Config } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;