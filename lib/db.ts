import { Pool } from 'pg'

declare global {
  // Permite evitar múltiples instancias en modo desarrollo
  var pool: Pool | undefined
}

export const pool =
  global.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

if (process.env.NODE_ENV !== 'production') global.pool = pool
