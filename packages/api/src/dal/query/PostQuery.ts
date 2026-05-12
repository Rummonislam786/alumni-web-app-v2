import { pool } from '../../config/db';
import { PostDTO } from '../DTOs/post';

export class PostQuery {
  async createPost(post: PostDTO) {
    const result = await pool.query(
      'INSERT INTO posts (user_id, caption, media_url,created_at, updated_at, type) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        post.user_id,
        post.caption,
        post.media_url,
        post.createdAt,
        post.updatedAt,
        post.post_type,
      ]
    );
    return result.rows[0];
  }

  async updatePost(id: number, post: PostDTO) {
    const result = await pool.query(
      'UPDATE posts SET caption = ?, media_url = ? WHERE id = ?',
      [post.caption, post.media_url, id]
    );
    return result.rows[0];
  }

  async deletePost(id: number) {
    const result = await pool.query('Delete FROM posts WHERE id = ?', [id]);
    return result.rows[0];
  }

  async getAllPosts(): Promise<PostDTO[]> {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  }

  async getAllPostsByUser(id: number): Promise<PostDTO[]> {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = ?', [
      id,
    ]);
    return result.rows;
  }
  async getPostById(id: number): Promise<PostDTO> {
    const result = await pool.query('SELECT * FROM posts where id = ?', [id]);
    return result.rows[0];
  }
}
