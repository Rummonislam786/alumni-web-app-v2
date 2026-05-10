import { pool } from '../../config/db';
import { CommentResponseDTO } from '../DTOs/comment';

export class CommentQuery {
  async createComment(data: CommentResponseDTO) {
    const result = await pool.query(
      'INSERT INTO comment (user_id, caption, media_url) VALUES (?, ?, ?, ?)',
      [data.user_id, data.parent_id, data.post_id, data.content]
    );
    return result.rows[0];
  }

  async updateComment(id: number, data: CommentResponseDTO) {
    const result = await pool.query(
      'UPDATE comment SET content = ? WHERE id = ?',
      [data.content, id]
    );
    return result.rows[0];
  }

  async deleteComment(id: number) {
    const result = await pool.query('Delete FROM comment WHERE id = ?', [id]);
    return result.rows[0];
  }

  async getAllComments(): Promise<CommentResponseDTO[]> {
    const result = await pool.query('SELECT * FROM comment');
    return result.rows;
  }

  async getAllCommentsByUser(id: number): Promise<CommentResponseDTO[]> {
    const result = await pool.query('SELECT * FROM comment WHERE user_id = ?', [
      id,
    ]);
    return result.rows;
  }
  async getCommentById(id: number): Promise<CommentResponseDTO> {
    const result = await pool.query('SELECT * FROM comment where id = ?', [id]);
    return result.rows[0];
  }
}
