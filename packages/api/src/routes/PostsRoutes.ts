import { Router } from 'express';
import { PostController } from '../controller/PostController';
const router = Router();
const postControllerInstance = new PostController();

router.post('/posts', postControllerInstance.createNewPost);
router.put('/posts/:id', postControllerInstance.updatePost);
router.get('/posts/user/:id', postControllerInstance.getAllPostByUserID);
router.delete('/posts/:id', postControllerInstance.deletePost);
router.get('/posts/:id', postControllerInstance.getPostByID);
router.get('/posts', postControllerInstance.getAllPosts);

export default router;
