import { PostDTO, PostType } from '@alumni-web-app-v2/api/src/dal/DTOs/post';
import { PostQuery } from '@alumni-web-app-v2/api/src/dal/query/PostQuery';

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

  public async getAllPostByUserID() {
    const postQuery = new PostQuery();
    const newpost = postQuery.getAllPosts();
    console.log('The Posts are: ', JSON.stringify(newpost, null, 2));
  }
}
