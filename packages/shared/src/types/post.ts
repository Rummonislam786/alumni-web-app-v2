export interface Post {
  id: number;
  user_id: number;
  caption: string;
  media_url?: string | null;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
}
