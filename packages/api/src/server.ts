import app from './app';
import postRoutes from './routes/PostsRoutes';
import UserRoutes from './routes/UserRoutes';
import CommentRoutes from './routes/CommentRoutes';
import AlumniRoutes from './routes/AlumniRoutes';

const PORT = process.env.PORT || 3001;

app.use('/api', postRoutes);
app.use('/api', UserRoutes);
app.use('/api', CommentRoutes);
app.use('/api', AlumniRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

export default app;
// dalmanager.createPost();
// dalmanager.createPost();
