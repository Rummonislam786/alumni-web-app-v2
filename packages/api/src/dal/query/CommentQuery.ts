import { pool } from '../../config/db';
import {
  CreateCommentDTO,
  CommentResponseDTO,
  UpdateCommentDTO,
} from '../DTOs/comment';

export class CommentQuery {
  static async createComment(data: CreateCommentDTO) {
    const result = await pool.query(
      'INSERT INTO comment (user_id, caption, media_url) VALUES (?, ?, ?, ?)',
      [data.user_id, data.parent_id, data.post_id, data.content]
    );
    return result.rows[0];
  }

  static async updateComment(id: number, data: UpdateCommentDTO) {
    const result = await pool.query(
      'UPDATE comment SET content = ? WHERE id = ?',
      [data.content, id]
    );
    return result.rows[0];
  }

  static async deleteComment(id: number) {
    const result = await pool.query('Delete FROM comment WHERE id = ?', [id]);
    return result.rows[0];
  }

  static async getAllComments(): Promise<CommentResponseDTO[]> {
    const result = await pool.query('SELECT * FROM comment');
    return result.rows;
  }

  static async getAllCommentsByUser(id: number): Promise<CommentResponseDTO[]> {
    const result = await pool.query('SELECT * FROM comment WHERE user_id = ?', [
      id,
    ]);
    return result.rows;
  }
  static async getCommentById(id: number): Promise<CommentResponseDTO> {
    const result = await pool.query('SELECT * FROM comment where id = ?', [id]);
    return result.rows[0];
  }
}
