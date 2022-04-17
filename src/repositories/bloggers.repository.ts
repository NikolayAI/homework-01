import { bloggers } from './db';
import { IBlogger } from './types';

export class BloggersRepository {
  static async findAll(): Promise<IBlogger[]> {
    return await bloggers.find({}).toArray();
  }

  static async findOne({ id }: { id: number }): Promise<IBlogger | null> {
    return await bloggers.findOne({ id });
  }

  static async create({
    name,
    youtubeUrl
  }: Omit<IBlogger, 'id'>): Promise<IBlogger> {
    const newItem: IBlogger = { id: Number(new Date()), name, youtubeUrl };
    await bloggers.insertOne(newItem);
    return newItem;
  }

  static async update({
    id,
    name,
    youtubeUrl
  }: IBlogger): Promise<boolean> {
    const updatedItem = await bloggers
      .updateOne({ id }, { $set: { name, youtubeUrl } });
    return updatedItem.matchedCount === 1;
  }

  static async remove({ id }: { id: number }): Promise<boolean> {
    const removedItem = await bloggers.deleteOne({ id });
    return removedItem.deletedCount === 1;
  }
}
