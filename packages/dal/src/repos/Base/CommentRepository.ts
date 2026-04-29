import { Pool } from 'pg';
import { IReadRepository } from '../interfaces/IReadRepository';
import { IWriteRepository } from '../interfaces/IWriteRepository';
import {
  Comment,
  CreateCommentDTO,
  UpdateCommentDTO,
} from '@alumni-web-app-v2/shared';

export abstract class CommentRepository
  implements IWriteRepository<Comment>, IReadRepository<Comment>
{
  constructor(private pool: Pool) {}
  // export interface CreateCommentDTO {
  //   user_id: number;
  //   post_id: number;
  //   content: string;
  // }
  async create(item: CreateCommentDTO): Promise<Comment> {
    const { rows } = await this.pool.query(
      `INSERT INTO comments (user_id, post_id, content)
       VALUES ($1, $2, $3) RETURNING *`,
      [item.user_id, item.post_id, item.content]
    );
    return rows[0];
  }

  // export interface UpdateCommentDTO {
  //   content?: string;
  // }

  async update(id: string, item: UpdateCommentDTO): Promise<Comment> {
    const allowedFields = ['content']; // extend as needed

    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const key of Object.keys(item) as (keyof UpdateCommentDTO)[]) {
      const value = item[key];
      if (value !== undefined && allowedFields.includes(key)) {
        fields.push(`${key} = $${index++}`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    fields.push(`updatedAt = NOW()`); // adjust to your schema

    values.push(id);

    const { rows } = await this.pool.query(
      `UPDATE comments SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );

    if (!rows[0]) throw new Error('Comment not found');

    return rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.pool.query(`DELETE FROM comments WHERE id = $1`, [id]);
  }

  async findById(id: string): Promise<Comment | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM comments WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async findAll(): Promise<Comment[]> {
    const { rows } = await this.pool.query(`SELECT * FROM comments`);
    return rows;
  }
}
