import {
  CreateCommentDTO,
  UpdateCommentDTO,
  CommentResponseDTO,
  //   NotFoundError,
} from '@alumni-web-app-v2/shared';

import { CommentRepository } from '@alumni-web-app-v2/dal';

export class CommentService {
  private commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async createComment(data: CreateCommentDTO): Promise<CommentResponseDTO> {
    const comment = await this.commentRepository.create(data);
    return comment;
  }
  async updateComment(
    id: number,
    data: UpdateCommentDTO
  ): Promise<CommentResponseDTO> {
    const comment = await this.commentRepository.update(id, data);
    return comment;
  }
  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async getCommentById(id: number): Promise<CommentResponseDTO | null> {
    const comment = await this.commentRepository.findById(id);
    return comment;
  }
  async getAllComments(): Promise<CommentResponseDTO[]> {
    const comments = await this.commentRepository.findAll();
    return comments;
  }
  async getCommentsByPostId(post_id: number): Promise<CommentResponseDTO[]> {
    const comments = await this.commentRepository.findAll();
    return comments.filter((comment) => comment.post_id === post_id);
  }

  async getCommentsByUserId(user_id: number): Promise<CommentResponseDTO[]> {
    const comments = await this.commentRepository.findAll();
    return comments.filter((comment) => comment.user_id === user_id);
  }
  async getCommentsByParentId(
    parent_id: number
  ): Promise<CommentResponseDTO[]> {
    const comments = await this.commentRepository.findAll();
    return comments.filter((comment) => comment.parent_id === parent_id);
  }
  async getCommentsByUserIdAndPostId(
    user_id: number,
    post_id: number
  ): Promise<CommentResponseDTO[]> {
    const comments = await this.commentRepository.findAll();
    return comments.filter(
      (comment) => comment.user_id === user_id && comment.post_id === post_id
    );
  }
  async getCommentsByUserIdAndParentId(
    user_id: number,
    parent_id: number
  ): Promise<CommentResponseDTO[]> {
    const comments = await this.commentRepository.findAll();
    return comments.filter(
      (comment) =>
        comment.user_id === user_id && comment.parent_id === parent_id
    );
  }
}
