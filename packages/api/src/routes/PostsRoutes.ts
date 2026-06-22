import { Router } from 'express';
import { PostController } from '../controller/PostController';
const router = Router();
const postController = new PostController();

router.post('/posts', postController.createNewPost);
router.put('/posts/:id', postController.updatePost);
router.get('/posts/user/:id', postController.getAllPostByUserID);
router.delete('/posts/:id', postController.deletePost);
router.get('/posts/:id', postController.getPostByID);
router.get('/posts', postController.getAllPosts);

export default router;
