import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on('connect', () => {
  console.log('Connected to the database');
});
//test database connection

pool.query('SELECT NOW()', (err: any, res: { rows: any[] }) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connection successful:', res.rows[0]);
  }
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});
