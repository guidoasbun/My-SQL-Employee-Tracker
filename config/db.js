const { createConnection } = require('mysql2')

const connection = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Starfish1',
  database: 'employeeTrack_db'
})

module.exports = connection
