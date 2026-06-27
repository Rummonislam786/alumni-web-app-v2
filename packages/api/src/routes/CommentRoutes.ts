import { Router } from 'express';
import { CommentController } from '../controller/CommentController';
const router = Router();
const commentControllerInstance = new CommentController();

router.post('/comments', commentControllerInstance.createComment);
router.put('/comments/:id', commentControllerInstance.updateComment);
router.delete('/comments/:id', commentControllerInstance.deleteComment);
router.get('/comments', commentControllerInstance.getAllComments);
router.get(
  '/comments/user/:id',
  commentControllerInstance.getAllCommentsByUser
);
router.get('/comments/:id', commentControllerInstance.getCommentById);

export default router;
