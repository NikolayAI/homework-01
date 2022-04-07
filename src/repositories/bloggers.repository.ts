import { bloggers } from './db';
import { IBlogger } from './types';

export class BloggersRepository {
  private static items: IBlogger[] = [...bloggers];

  static getItems(): IBlogger[] {
    return this.items;
  }

  static getItem({ id }: { id: number }): IBlogger | null {
    const item = this.items.find((item) => item.id === id);
    return item ?? null;
  }

  static createItem({ name, youtubeUrl }: Omit<IBlogger, 'id'>): IBlogger {
    const newItem: IBlogger = {
      id: Number(new Date()),
      name,
      youtubeUrl,
    };
    this.items.push(newItem);
    return newItem;
  }

  static updateItem({ id, name, youtubeUrl }: IBlogger): IBlogger | null {
    const item = this.getItem({ id });
    if (item) {
      item.name = name ? name : item.name;
      item.youtubeUrl = youtubeUrl ? youtubeUrl : item.youtubeUrl;
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
