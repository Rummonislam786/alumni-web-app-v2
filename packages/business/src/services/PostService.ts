import { PostRepository } from '@alumni-web-app-v2/dal';
import {
  CreatePostDTO,
  UpdatePostDTO,
  PostResponseDTO,
} from '@alumni-web-app-v2/shared';

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(data: CreatePostDTO): Promise<PostResponseDTO> {
    const post = await this.postRepository.create(data);
    return post;
  }
  async updatePost(id: number, data: UpdatePostDTO): Promise<PostResponseDTO> {
    const post = await this.postRepository.update(id, data);
    return post;
  }
  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async getPostById(id: number): Promise<PostResponseDTO | null> {
    const post = await this.postRepository.findById(id);
    return post;
  }

  async getAllPosts(): Promise<PostResponseDTO[]> {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostsByUserId(user_id: number): Promise<PostResponseDTO[]> {
    const posts = await this.postRepository.findAll();
    return posts.filter((post) => post.user_id === user_id);
  }

  async getPostsByCaptionKeyword(keyword: string): Promise<PostResponseDTO[]> {
    const posts = await this.postRepository.findAll();
    return posts.filter((post) => post.caption.includes(keyword));
  }

  async getPostsByHashtag(hashtag: string): Promise<PostResponseDTO[]> {
    const posts = await this.postRepository.findAll();
    return posts.filter((post) => post.caption.includes(`#${hashtag}`));
  }
}
