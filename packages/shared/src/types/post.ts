export interface Post {
  id: number;
  user_id: number;
  caption: string;
  media_url?: string | null;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDTO {
  user_id: number;
  caption: string;
  media_url?: string | null;
}

export interface UpdatePostDTO {
  caption?: string;
  media_url?: string | null;
}

export interface PostResponseDTO {
  id: number;
  user_id: number;
  caption: string;
  media_url?: string | null;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
}
