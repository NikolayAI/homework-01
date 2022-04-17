import { PostsRepository } from '../repositories/posts.repository';
import { IPost, IPostDto } from '../repositories/types';
import { BloggersRepository } from '../repositories/bloggers.repository';

export class PostsService {
  static async findAll(): Promise<IPostDto[]> {
    const posts = await PostsRepository.findAll();
    const bloggers = await BloggersRepository.findAll();
    return posts.map((item) => ({
      ...item,
      bloggerName: bloggers.find((blogger) => blogger.id === item.bloggerId)?.name ?? null,
    }));
  }

  static async findOne({ id }: { id: number }): Promise<IPostDto | null> {
    const item = await PostsRepository.findOne({ id });
    if (item) {
      const blogger = await BloggersRepository.findOne({ id: item.bloggerId });
      return {
        ...item,
        bloggerName: blogger?.name ?? null,
      };
    }
    return null
  }

  static async create({
    title,
    content,
    shortDescription,
    bloggerId
  }: Omit<IPost, 'id'>): Promise<IPostDto> {
    const newItem = await PostsRepository.create({
      title,
      content,
      shortDescription,
      bloggerId
    });
    const blogger = await BloggersRepository.findOne({ id: newItem.bloggerId });
    return {
      ...newItem,
      bloggerName: blogger?.name ?? null,
    };
  }

  static async update({
    id,
    title,
    content,
    shortDescription,
    bloggerId,
  }: IPost): Promise<boolean> {
    return PostsRepository.update({
      id,
      title,
      content,
      shortDescription,
      bloggerId,
    });
  }

  static async remove({ id }: { id: number }): Promise<boolean> {
    return PostsRepository.remove({ id });
  }
}
