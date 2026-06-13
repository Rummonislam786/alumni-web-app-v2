import { PostDTO, PostType } from '@alumni-web-app-v2/dal/src/DTOs/post';
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
  }

  public async getAllPostByUserID(id: number) {
    const postQuery = new PostQuery();
    const newpost = postQuery.getAllPostsByUser(id);
    console.log('The Posts are: ', JSON.stringify(newpost, null, 2));
  }
}
