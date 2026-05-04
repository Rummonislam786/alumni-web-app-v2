import { pool } from '../../config/db';
import { CreatePostDTO, PostResponseDTO, UpdatePostDTO } from '../DTOs/post';

export class PostQuery {
  static async createPost(data: CreatePostDTO) {
    const result = await pool.query(
      'INSERT INTO posts (user_id, caption, media_url) VALUES (?, ?, ?)',
      [data.user_id, data.caption, data.media_url]
    );
    return result.rows[0];
  }

  static async updatePost(id: number, data: UpdatePostDTO) {
    const result = await pool.query(
      'UPDATE posts SET caption = ?, media_url = ? WHERE id = ?',
      [data.caption, data.media_url, id]
    );
    return result.rows[0];
  }

  static async deletePost(id: number) {
    const result = await pool.query('Delete FROM posts WHERE id = ?', [id]);
    return result.rows[0];
  }

  static async getAllPosts(): Promise<PostResponseDTO[]> {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  }

  static async getAllPostsByUser(id: number): Promise<PostResponseDTO[]> {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = ?', [
      id,
    ]);
    return result.rows;
  }
  static async getPostById(id: number): Promise<PostResponseDTO> {
    const result = await pool.query('SELECT * FROM posts where id = ?', [id]);
    return result.rows[0];
  }
}
