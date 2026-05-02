import { pool } from '../../config/db';
import { CreatePostDTO } from '../DTOs/post';

export class PostQuery {
  static async createPost(data: CreatePostDTO) {
    const result = await pool.query(
      'INSERT INTO posts (user_id, caption, media_url) VALUES (?, ?, ?)',
      [data.user_id, data.caption, data.media_url]
    );
    return result.rows[0];
  }
}
