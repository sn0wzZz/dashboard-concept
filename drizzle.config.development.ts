import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

/**
 * @info
 * DEVELOPMENT ENV
 * use only for prod evironemnt
 */
dotenv.config({ path: '.env.development' })

if (!process.env.DATABASE_URL) {
  console.log('🔴 No DATABASE_URL in env')
  throw new Error('No DATABASE_URL in env')
}

export default {
  schema: './src/lib/database/drizzle-schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  schemaFilter: ['public', 'core', 'contacts', 'cms', 'sitebuilder_v1', 'mail', 'relationships', 'media'], // може да пробваме без този ред
  // ако дръпне само public - ще сложим масив от схеми ['public','core','contacts'...] ще ги взимаш от супабейза
  introspect: {
    casing: 'camel',
  },
  migrations: {
    prefix: 'supabase',
  },
  dbCredentials: {
    url: process.env.DATABASE_URL_SESSION || '',
    port: 5432,
  },
} satisfies Config
