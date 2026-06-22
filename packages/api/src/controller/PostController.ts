import { PostManager } from '@alumni-web-app-v2/businessLogic/src/PostManager';
import { PostType } from '@alumni-web-app-v2/shared/src/types/post';
import { Request, Response } from 'express';

export class PostController {
  public async createNewPost(req: Request, res: Response) {
    // Implement logic to create a new post
    let { user_id, caption, media_url, comments_count, type } = req.body;
    console.log('Received post data:', req.body);
    console.log('Received post type:', type);
    if (
      type !== 'Standard' &&
      type !== 'Announcement' &&
      type !== 'Job Post' &&
      type !== 'Event'
    ) {
      return res.status(400).json({ message: 'Invalid post type' });
    }
    if (type === 'Job Post') {
      type = PostType.JobPost;
    }
    if (type === 'Event') {
      type = PostType.Event;
    }
    if (type === 'Announcement') {
      type = PostType.Announcement;
    }
    if (type === 'Standard') {
      type = PostType.Standard;
    }
    const postManager = new PostManager();
    await postManager.createNewPost(
      user_id,
      caption,
      media_url,
      comments_count,
      type
    );
    res.status(201).json({ message: 'Post created successfully' });
  }
  public async updatePost(req: Request, res: Response) {
    try {
      // Implement logic to update a post
      const postData = req.body;
      const { id } = req.params;
      const postManager = new PostManager();
      const updatedPost = await postManager.updatePost(postData, Number(id));
      // Add logic to update the post with the provided ID
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({
        message: 'Post updated successfully',
        data: updatedPost,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to update post',
        error: (error as Error).message,
      });
    }
  }
  public async getAllPostByUserID(req: Request, res: Response) {
    // Implement logic to get all posts by user ID
    const { id } = req.params;
    const postManager = new PostManager();
    const posts = await postManager.getAllPostByUserID(Number(id));
    res
      .status(200)
      .json({ message: 'Posts retrieved successfully', data: posts });
  }
  public async deletePost(req: Request, res: Response) {
    // Implement logic to delete a post
    const { id } = req.params;
    const postManager = new PostManager();
    await postManager.deletePost(Number(id));
    res.status(200).json({ message: 'Post deleted successfully' });
  }
  public async getPostByID(req: Request, res: Response) {
    // Implement logic to get a post by ID
    const { id } = req.params;
    const postManager = new PostManager();
    const post = await postManager.getPostByID(Number(id));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res
      .status(200)
      .json({ message: 'Post retrieved successfully', data: post });
  }
  public async getAllPosts(req: Request, res: Response) {
    // Implement logic to get all posts
    const postManager = new PostManager();
    const posts = await postManager.getAllPosts();
    res
      .status(200)
      .json({ message: 'Posts retrieved successfully', data: posts });
  }
}
