import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { pool } from '@alumni-web-app-v2/dal/src/config/db';
import { PostManager } from '@alumni-web-app-v2/businessLogic/src/PostManager';
import { JWTMiddleware } from './middleware/JwtToken';
dotenv.config({ path: '../../.env' });

const JWT_SECRET = process.env.JWT_SECRET || '16bd190326bf3a8941f49ed0db0a6c58';

const app = express();
const postManager = new PostManager();
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

app.get('/api/jwt/token', (req, res) => {
  const token = jwt.sign({ userId: 'postman-test-user' }, JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ token });
});

app.get('/api/jwt/protected', JWTMiddleware.verifyToken, (req: any, res) => {
  res.status(200).json({ message: 'Token accepted', user: req.user });
});

app.get('/api/echo', async (req, res) => {
  try {
    // ADD await HERE
    const data = await postManager.getAllPostByUserID(2);
    res.status(200).json({ echo: data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
