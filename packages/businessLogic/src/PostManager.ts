import { PostType } from '@alumni-web-app-v2/shared/src/types/post';
import { PostDTO } from '@alumni-web-app-v2/dal/src/DTOs/post';
import { PostQuery } from '@alumni-web-app-v2/dal/src/query/PostQuery';

export class PostManager {
  public async createNewPost(
    user_id: number,
    caption: string,
    media_url: string,
    comments_count: number,
    post_type: PostType
  ) {
    const postQuery = new PostQuery();
    const post = new PostDTO(
      user_id,
      caption,
      media_url,
      comments_count,
      post_type
    );
    const newPost = postQuery.createPost(post);
    console.log(newPost);
    return newPost;
  }
  public async updatePost(post: PostDTO, postID: number) {
    const allowedFields = ['caption', 'media_url'];
    const data: Record<string, any> = {};
    for (const key of allowedFields) {
      if (key in post) {
        data[key] = (post as any)[key];
      }
    }
    if (Object.keys(data).length === 0) {
      throw new Error('No valid fields to update');
    }
    const postQuery = new PostQuery();
    return await postQuery.updatePost(postID, data);
  }
  public async deletePost(id: number) {
    const postQuery = new PostQuery();
    return await postQuery.deletePost(id);
  }
  public async getAllPostByUserID(id: number) {
    const postQuery = new PostQuery();
    const newpost = await postQuery.getAllPostsByUser(id);
    console.log('The Posts are: ', JSON.stringify(newpost, null, 2));
    return newpost;
  }
  public async getPostByID(id: number) {
    const postQuery = new PostQuery();
    return await postQuery.getPostById(id);
  }
  public async getAllPosts() {
    const postQuery = new PostQuery();
    return await postQuery.getAllPosts();
  }
}
