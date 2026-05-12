import { PostDTO, PostType } from './DTOs/post';
import { PostQuery } from './query/PostQuery';
export class DalPostManager {
  public async createPost() {
    const postQuery = new PostQuery();
    const post = new PostDTO(
      2,
      'hello there',
      'asset/image.jpg',
      2,
      PostType.Event
    );
    const newPost = postQuery.createPost(post);
    console.log(newPost);
  }
}
