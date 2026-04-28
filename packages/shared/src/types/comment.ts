export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentDTO {
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  content: string;
}

export interface UpdateCommentDTO {
  content?: string;
}

export interface CommentResponseDTO {
  id: number;
  user_id: number;
  post_id: number;
  parent_id?: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
