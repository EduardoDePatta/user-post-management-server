import environments from './environments'
import app from '.'
import pool from './db'

process.on('uncaughtException', (error: Error) => {
  console.log(`Error: ${error}\nShutting down...`)
  process.exit(1)
})

async function testDBConnection() {
  try {
    const { rows } = await pool.query('SELECT NOW()')
    console.log('Database connection established successfully.', rows[0].now)
  } catch (error) {
    console.error('Failed to connect to the database.')
    process.exit(1)
  }
}

testDBConnection().then(() => {
  app.listen(environments.PORT, () => {
    console.log(`Server running on port ${environments.PORT}`)
  })
})