import { PostType } from '@alumni-web-app-v2/dal/src/DTOs/post';
import { PostManager } from './PostManager';

const postmanager = new PostManager();
console.log(
  postmanager.createNewPost(
    2,
    'hello everyone, this is from business logic',
    'asset/image1.jpg',
    1,
    PostType.Standard
  )
);
postmanager.getAllPostByUserID(2);
