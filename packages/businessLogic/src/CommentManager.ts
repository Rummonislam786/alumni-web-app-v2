import { CommentDTO } from '@alumni-web-app-v2/dal/src/DTOs/comment';
import { CommentQuery } from '@alumni-web-app-v2/dal/src/query/CommentQuery';
export class CommentManager {
  public async createComment(
    user_id: number,
    parent_id: number | null,
    post_id: number,
    content: string
  ) {
    const commentDTO = new CommentDTO(user_id, post_id, parent_id, content);
    const commentQuery = new CommentQuery();
    const newComment = await commentQuery.createComment(commentDTO);
    console.log(newComment);
    return newComment;
  }
  public async updateComment(id: number, comment: CommentDTO) {
    const allowedFields = ['content'];
    const updatedComment: Record<string, any> = {};
    for (const key of allowedFields) {
      if (key in comment) {
        updatedComment[key] = (comment as any)[key];
      }
    }
    if (Object.keys(updatedComment).length === 0) {
      throw new Error('No valid fields to update');
    }
    const commentQuery = new CommentQuery();
    return await commentQuery.updateComment(id, updatedComment);
  }
  public async deleteComment(id: number) {
    const commentQuery = new CommentQuery();
    return await commentQuery.deleteComment(id);
  }
  public async getAllComments() {
    const commentQuery = new CommentQuery();
    return await commentQuery.getAllComments();
  }
  public async getAllCommentsByUser(id: number) {
    const commentQuery = new CommentQuery();
    return await commentQuery.getAllCommentsByUser(id);
  }
  public async getCommentById(id: number) {
    const commentQuery = new CommentQuery();
    return await commentQuery.getCommentById(id);
  }
}
