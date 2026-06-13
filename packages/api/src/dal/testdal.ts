import { PostDTO, PostType } from './DTOs/post';
import { PostQuery } from './query/PostQuery';
export class DalPostManager {
  public postQuery = new PostQuery();
  public async createPost() {
    const post = new PostDTO(
      2,
      'hello there 2',
      'asset/image.jpg',
      2,
      PostType.Standard
    );
    const newPost = this.postQuery.createPost(post);
    console.log(newPost);
  }
  public async UpdatePost() {
    const post = new PostDTO(
      2,
      'Hello there, but an update',
      'asset/image.jpg',
      2,
      PostType.Event
    );
    // const updatePost = this.postQuery.updatePost(post, );
    // console.log(updatePost);
  }
  public async getAllPost() {
    const postQuery = new PostQuery();
    const newpost = await postQuery.getAllPosts();
    console.log('The Posts are: ', JSON.stringify(newpost, null, 2));
  }
}
