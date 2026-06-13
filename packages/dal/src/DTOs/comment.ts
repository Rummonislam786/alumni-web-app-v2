import { BaseDTO } from './base';

export class CommentDTO implements BaseDTO {
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    user_id: number,
    post_id: number,
    parent_id?: number | null,
    content?: string
  ) {
    this.user_id = user_id;
    this.post_id = post_id;
    this.parent_id = parent_id ?? null;
    this.content = content ?? '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
