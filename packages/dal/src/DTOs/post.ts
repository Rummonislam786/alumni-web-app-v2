import { BaseDTO } from './base';
export enum PostType {
  Standard = 'Standard',
  Announcement = 'Announcement',
  JobPost = 'Job Post',
  Event = 'Event',
}
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
