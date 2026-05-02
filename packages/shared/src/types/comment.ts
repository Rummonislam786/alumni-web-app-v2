export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
