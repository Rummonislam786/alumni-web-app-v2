import { pool } from '../../config/db';
import { CommentDTO } from '../DTOs/comment';

export class CommentQuery {
  async createComment(comment: CommentDTO) {
    const result = await pool.query(
      'INSERT INTO comment (user_id, caption, media_url) VALUES (?, ?, ?, ?)',
      [comment.user_id, comment.parent_id, comment.post_id, comment.content]
    );
    return result.rows[0];
  }

  async updateComment(id: number, comment: CommentDTO) {
    const result = await pool.query(
      'UPDATE comment SET content = ? WHERE id = ?',
      [comment.content, id]
    );
    return result.rows[0];
  }

  async deleteComment(id: number) {
    const result = await pool.query('Delete FROM comment WHERE id = ?', [id]);
    return result.rows[0];
  }

  async getAllComments(): Promise<CommentDTO[]> {
    const result = await pool.query('SELECT * FROM comment');
    return result.rows;
  }

  async getAllCommentsByUser(id: number): Promise<CommentDTO[]> {
    const result = await pool.query('SELECT * FROM comment WHERE user_id = ?', [
      id,
    ]);
    return result.rows;
  }
  async getCommentById(id: number): Promise<CommentDTO> {
    const result = await pool.query('SELECT * FROM comment where id = ?', [id]);
    return result.rows[0];
  }
}
