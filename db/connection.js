const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Blue1234',
      database: 'emtracker'
    },
    console.log('Connected to the employee tracker database.')
  );

  module.exports = db;