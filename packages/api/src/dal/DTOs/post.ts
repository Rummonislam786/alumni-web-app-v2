import { BaseResponseDTO } from './base';

export class PostResponseDTO implements BaseResponseDTO {
  id: number;
  user_id: number;
  caption: string;
  media_url?: string | null;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    user_id: number,
    caption: string,
    media_url?: string | null,
    comments_count?: number
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user_id = user_id;
    this.caption = caption;
    this.media_url = media_url;
    this.comments_count = comments_count ?? 0;
  }
}
