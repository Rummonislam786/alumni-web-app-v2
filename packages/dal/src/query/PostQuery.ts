import { pool } from '../config/db';
import { PostDTO } from '../DTOs/post';
import { buildUpdateQuery } from '../QueryBuilder/updateQueryBuilder';

export class PostQuery {
  async createPost(post: PostDTO) {
    console.log(post.post_type);
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
  async updatePost(postID: number, data: Record<string, any>) {
    const { query, values } = buildUpdateQuery('posts', data, {
      column: 'id',
      value: postID,
    });
    const result = await pool.query(query, values);
    return result.rows[0];
  }
  async deletePost(id: number) {
    const result = await pool.query('Delete FROM posts WHERE id = $1', [id]);
    return result.rows[0];
  }
  async getAllPosts(): Promise<PostDTO[]> {
    const result = await pool.query('SELECT * FROM posts');
    const posts: PostDTO[] = result.rows;
    console.log(posts);
    return posts;
  }
  async getAllPostsByUser(id: number): Promise<PostDTO[]> {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [
      id,
    ]);
    const posts: PostDTO[] = result.rows;
    return posts;
  }
  async getPostById(id: number): Promise<PostDTO> {
    const result = await pool.query('SELECT * FROM posts where id = $1', [id]);
    const post: PostDTO = result.rows[0];
    return post;
  }
}
