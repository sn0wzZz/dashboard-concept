/* eslint-disable @typescript-eslint/no-namespace */
import 'server-only'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../../../migrations/schema'
import * as relations from '../../../migrations/relations'

if (!process.env.DATABASE_URL) {
  console.log('🔴 No DATABASE_URL in env')
  throw new Error('No DATABASE_URL in env')
}

declare namespace global {
  let client: ReturnType<typeof postgres> | undefined
}

let client
if (process.env.NODE_ENV !== 'production') {
  if (!global.client) {
    global.client = postgres(process.env.DATABASE_URL, {
      max: 1,
      prepare: false,
    })
  }
  client = global.client
} else {
  client = postgres(process.env.DATABASE_URL, { max: 1, prepare: false })
}
export const db = drizzle(client, {
  schema: { ...schema, ...relations },
})
