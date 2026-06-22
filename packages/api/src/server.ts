import app from './app';
import postRoutes from './routes/PostsRoutes';

const PORT = process.env.PORT || 3001;

app.use('/api', postRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

export default app;
// dalmanager.createPost();
// dalmanager.createPost();
