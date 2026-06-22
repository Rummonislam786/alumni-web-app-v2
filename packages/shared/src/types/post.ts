export enum PostType {
  Standard = 'Standard',
  Announcement = 'Announcement',
  JobPost = 'Job Post',
  Event = 'Event',
}

export interface Post {
  id: number;
  user_id: number;
  caption: string;
  media_url?: string | null;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
  post_type: PostType;
}
