import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from '@alumni-web-app-v2/dal';

dotenv.config({ path: '../../.env' });

const app = express();

app.use(cors());
app.use(express.json());

console.log('API server is running...');

//logging the server
app.listen(process.env.PORT, () => {
  console.log(`API server is running on port ${process.env.PORT}`);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ dbTime: result.rows[0].now });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
});

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

export default app;
