import app from './app';
import { DalPostManager } from './dal/testdal';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

const dalmanager = new DalPostManager();
dalmanager.getAllPost();
// dalmanager.createPost();
// dalmanager.createPost();
