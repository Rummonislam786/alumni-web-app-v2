import { Pool } from 'pg';
import { IReadRepository } from '../interfaces/IReadRepository';
import { IWriteRepository } from '../interfaces/IWriteRepository';
import { Post, CreatePostDTO, UpdatePostDTO } from '@alumni-web-app-v2/shared';

export abstract class PostRepository
  implements IWriteRepository<Post>, IReadRepository<Post>
{
  constructor(private pool: Pool) {}
  //   export interface CreatePostDTO {
  //   user_id: number;
  //   caption: string;
  //   media_url?: string | null;
  // }

  async create(item: CreatePostDTO): Promise<Post> {
    const { rows } = await this.pool.query(
      `INSERT INTO posts (user_id, caption, media_url)
       VALUES ($1, $2, $3) RETURNING *`,
      [item.user_id, item.caption, item.media_url]
    );
    return rows[0];
  }

  // export interface UpdatePostDTO {
  //   caption?: string;
  //   media_url?: string | null;
  // }

  async update(id: string, item: UpdatePostDTO): Promise<Post> {
    const allowedFields = ['caption', 'media_url']; // extend as needed

    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const key of Object.keys(item) as (keyof UpdatePostDTO)[]) {
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
      `UPDATE posts SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );

    if (!rows[0]) throw new Error('Post not found');

    return rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.pool.query(`DELETE FROM posts WHERE id = $1`, [id]);
  }

  async findById(id: string): Promise<Post | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM posts WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async findAll(): Promise<Post[]> {
    const { rows } = await this.pool.query(`SELECT * FROM posts`);
    return rows;
  }
}
