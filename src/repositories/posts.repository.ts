import { posts } from './db';
import { IPost } from './types';

export class PostsRepository {
  static async findAll(): Promise<IPost[]> {
    return await posts.find({}).toArray();
  }

  static async findOne({ id }: { id: number }): Promise<IPost | null> {
    return await posts.findOne({ id });
  }

  static async create({
    title,
    content,
    shortDescription,
    bloggerId
  }: Omit<IPost, 'id'>): Promise<IPost> {
    const newItem: IPost = {
      id: Number(new Date()),
      bloggerId,
      title,
      content,
      shortDescription,
    };
    await posts.insertOne(newItem);
    return newItem;
  }

  static async update({
    id,
    title,
    content,
    shortDescription,
    bloggerId,
  }: IPost): Promise<boolean> {
    const updatedItem = await posts
      .updateOne({ id }, {
        $set: {
          title,
          content,
          shortDescription,
          bloggerId
        }
      });
    return updatedItem.matchedCount === 1;
  }

  static async remove({ id }: { id: number }): Promise<boolean> {
    const removedItem = await posts.deleteOne({ id });
    return removedItem.deletedCount === 1;
  }
}
