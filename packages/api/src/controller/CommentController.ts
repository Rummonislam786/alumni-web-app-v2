import { Request, Response } from 'express';
import { CommentManager } from '@alumni-web-app-v2/businessLogic/src/commentManager';
export class CommentController {
  public async createComment(req: Request, res: Response) {
    const { user_id, parent_id, post_id, content } = req.body;
    console.log('Received comment data:', req.body);
    const commentManager = new CommentManager();
    try {
      const newComment = await commentManager.createComment(
        user_id,
        parent_id,
        post_id,
        content
      );
      res
        .status(201)
        .json({ message: 'Comment created successfully', data: newComment });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to create comment',
        error: (error as Error).message,
      });
    }
  }
  public async updateComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const commentData = req.body;
      const commentManager = new CommentManager();
      const updatedComment = await commentManager.updateComment(
        Number(id),
        commentData
      );
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json({
        message: 'Comment updated successfully',
        data: updatedComment,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update comment',
        error: (error as Error).message,
      });
    }
  }
  public async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const commentManager = new CommentManager();
      const deletedComment = await commentManager.deleteComment(Number(id));
      return res.status(200).json({
        message: 'Comment deleted successfully',
        data: deletedComment,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to delete comment',
        error: (error as Error).message,
      });
    }
  }
  public async getAllComments(req: Request, res: Response) {
    const commentManager = new CommentManager();
    try {
      const comments = await commentManager.getAllComments();
      res
        .status(200)
        .json({ message: 'Comments retrieved successfully', data: comments });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve comments',
        error: (error as Error).message,
      });
    }
  }
  public async getAllCommentsByUser(req: Request, res: Response) {
    const { id } = req.params;
    const commentManager = new CommentManager();
    try {
      const comments = await commentManager.getAllCommentsByUser(Number(id));
      res
        .status(200)
        .json({ message: 'Comments retrieved successfully', data: comments });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve comments',
        error: (error as Error).message,
      });
    }
  }
  public async getCommentById(req: Request, res: Response) {
    const { id } = req.params;
    const commentManager = new CommentManager();
    try {
      const comment = await commentManager.getCommentById(Number(id));
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res
        .status(200)
        .json({ message: 'Comment retrieved successfully', data: comment });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve comment',
        error: (error as Error).message,
      });
    }
  }
}
