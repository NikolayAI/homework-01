import { posts } from './db';
import { IPost } from './types';

export class PostsRepository {
  private static items: IPost[] = [...posts];

  static getItems(): IPost[] {
    return this.items;
  }

  static getItem({ id }: { id: number }): IPost | null {
    const item = this.items.find((item) => item.id === id);
    return item ?? null;
  }

  static createItem({
    title,
    content,
    shortDescription,
    bloggerId
  }: Omit<IPost, 'id'>): IPost {
    const newItem: IPost = {
      id: Number(new Date()),
      bloggerId,
      title,
      content,
      shortDescription,
    };
    this.items.push(newItem);
    return newItem;
  }

  static updateItem({
    id,
    title,
    content,
    shortDescription,
    bloggerId,
  }: IPost): IPost | null {
    const item = this.getItem({ id });
    if (item) {
      item.title = title ? title : item.title;
      item.content = content ? content : item.content;
      item.shortDescription = shortDescription ? shortDescription : item.shortDescription;
      item.bloggerId = bloggerId ? bloggerId : item.bloggerId;
      return item;
    }
    return null;
  }

  static deleteItem({ id }: { id: number }): boolean {
    const item = this.getItem({ id });
    if (item) {
      this.items = this.items.filter((item) => item.id !== id);
      return true;
    }
    return false;
  }
}
