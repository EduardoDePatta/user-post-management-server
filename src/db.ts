import { Pool } from 'pg'
import environments from './environments'

const pool = new Pool({
  user: environments.DB_USER,
  host: environments.DB_HOST,
  database: environments.DB_DATABASE,
  password: environments.DB_PASSWORD,
  port: environments.DB_PORT
})

export default pool
