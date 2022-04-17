import { BloggersRepository } from '../repositories/bloggers.repository';
import { IBlogger } from '../repositories/types';

export class BloggersService {
  static async findAll(): Promise<IBlogger[]> {
    return await BloggersRepository.findAll();
  }

  static async findOne({ id }: { id: number }): Promise<IBlogger | null> {
    return await BloggersRepository.findOne({ id });
  }

  static async create({
    name,
    youtubeUrl
  }: Omit<IBlogger, 'id'>): Promise<IBlogger> {
    return await BloggersRepository.create({ name, youtubeUrl });
  }

  static async update({
    id,
    name,
    youtubeUrl
  }: IBlogger): Promise<boolean> {
    return await BloggersRepository.update({ id, name, youtubeUrl });
  }

  static async remove({ id }: { id: number }): Promise<boolean> {
    return await BloggersRepository.remove({ id });
  }
}
