import { BaseResponseDTO } from './base';
export class CreateCommentDTO {
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  content: string;

  constructor(
    user_id: number,
    post_id: number,
    content: string,
    parent_id?: number | null
  ) {
    this.user_id = user_id;
    this.post_id = post_id;
    this.parent_id = parent_id ?? null;
    this.content = content;
  }
}

export class UpdateCommentDTO {
  id: number;
  content?: string;

  constructor(id: number, content?: string) {
    this.id = id;
    this.content = content ?? '';
  }
}

export class CommentResponseDTO implements BaseResponseDTO {
  id: number;
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    user_id: number,
    post_id: number,
    parent_id?: number | null,
    content?: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
    this.parent_id = parent_id ?? null;
    this.content = content ?? '';
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
