import { Request, Response } from 'express';

import { IPost, IProblemDetails } from './types';
import { POST_SHORT_DESCRIPTION_MAX_LENGTH } from './constants';
import { bloggers } from './bloggers.controller';

let posts: IPost[] = [
  {
    id: 1,
    title: 'some title',
    shortDescription: 'some description',
    content: 'some content',
    bloggerId: 1,
    bloggerName: 'some blogger name',
  },
];

export class PostsController {
  static async getPosts(req: Request, res: Response) {
    res.send(posts);
  }

  static async getPost(req: Request, res: Response) {
    const item = posts.find((item) => item.id === Number(req.params.id));
    if (!item) res.send(404);
    if (item) res.send(item);
  }

  static async createPost(req: Request, res: Response) {
    const {
      title,
      shortDescription,
      content,
      bloggerId,
    } = req.body || {}

    const bloggerName = bloggers.find((blogger) => blogger.id === bloggerId)?.name ?? null;

    if (!title || !shortDescription || !content || !bloggerId) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'title, short description, content, blogger id is required',
      };
      res.status(400).send(problems);
    }

    if (shortDescription?.length > POST_SHORT_DESCRIPTION_MAX_LENGTH) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'shortDescription should be less than 100 symbols',
      };
      res.status(400).send(problems);
    }

    const newItem: IPost = {
      id: +(new Date()),
      bloggerId,
      bloggerName,
      title,
      content,
      shortDescription,
    };
    posts.push(newItem);
    res.status(201).send(newItem);
  }

  static async updatePost(req: Request, res: Response) {
    const {
      title,
      shortDescription,
      content,
      bloggerId,
    } = req.body || {}

    const updatedItem = posts.find((item) => item.id === bloggerId);

    if (!updatedItem) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 404,
        instance: 'some instance',
        detail: 'not found',
      };
      res.status(404).send(problems);
    }

    if (shortDescription?.length > POST_SHORT_DESCRIPTION_MAX_LENGTH) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'shortDescription should be less than 100 symbols',
      };
      res.status(400).send(problems);
    }

    if (updatedItem) {
      posts = posts.map((item) => {
        if (item.id === Number(req.params.id)) {
          item.title = title ? title : item.title;
          item.content = content ? content : item.content;
          item.shortDescription = shortDescription ? shortDescription : item.shortDescription;
        }
        return item;
      });
      res.send(204);
    }
  }

  static async deletePost(req: Request, res: Response) {
    const deletedItem = posts.find((item) => item.id === Number(req.params.id));

    if (!deletedItem) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 404,
        instance: 'some instance',
        detail: 'not found',
      };
      res.status(404).send(problems);
    }

    if (deletedItem) {
      posts = posts.filter((item) => item.id !== Number(req.params.id));
      res.send(204);
    }
  }
}
