import { BaseDTO } from './base';
import { PostType } from '@alumni-web-app-v2/shared/src/types/post';
export class PostDTO implements BaseDTO {
  user_id: number;
  caption: string;
  media_url?: string | null;
  comments_count: number;
  post_type: PostType;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    user_id: number,
    caption: string,
    media_url?: string | null,
    comments_count?: number,
    post_type?: PostType
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.user_id = user_id;
    this.caption = caption;
    this.media_url = media_url;
    this.comments_count = comments_count ?? 0;
    this.post_type = post_type ?? PostType.Standard;
  }
}
