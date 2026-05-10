import { pool } from '../../config/db';
import { PostResponseDTO } from '../DTOs/post';

export class PostQuery {
  async createPost(data: PostResponseDTO) {
    const result = await pool.query(
      'INSERT INTO posts (user_id, caption, media_url) VALUES (?, ?, ?)',
      [data.user_id, data.caption, data.media_url]
    );
    return result.rows[0];
  }

  async updatePost(id: number, data: PostResponseDTO) {
    const result = await pool.query(
      'UPDATE posts SET caption = ?, media_url = ? WHERE id = ?',
      [data.caption, data.media_url, id]
    );
    return result.rows[0];
  }

  async deletePost(id: number) {
    const result = await pool.query('Delete FROM posts WHERE id = ?', [id]);
    return result.rows[0];
  }

  async getAllPosts(): Promise<PostResponseDTO[]> {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  }

  async getAllPostsByUser(id: number): Promise<PostResponseDTO[]> {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = ?', [
      id,
    ]);
    return result.rows;
  }
  async getPostById(id: number): Promise<PostResponseDTO> {
    const result = await pool.query('SELECT * FROM posts where id = ?', [id]);
    return result.rows[0];
  }
}
