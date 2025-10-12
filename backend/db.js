const { Pool } = require('pg');

const pool = new Pool({
 user: 'postgres',          // Replace with your PostgreSQL username
  host: 'localhost',              // Replace with your database host (default is localhost)
  database: 'postgres', // Replace with your database name
  password: 'root',      // Replace with your PostgreSQL password
  port: 5432,                     // Replace with your database port (default is 5432)
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
