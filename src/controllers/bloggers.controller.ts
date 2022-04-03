import { Request, Response } from 'express';

import { IBlogger, IProblemDetails } from './types';

const youtubeUrlMatch = new RegExp('^https:\/\/([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+$');

export let bloggers: IBlogger[] = [
  { id: 1, name: 'Ivan', youtubeUrl: 'someUrl' },
  { id: 2, name: 'Petr', youtubeUrl: 'someUrl' },
  { id: 3, name: 'Sasha', youtubeUrl: 'someUrl' },
  { id: 4, name: 'Egor', youtubeUrl: 'someUrl' },
  { id: 5, name: 'Sergey', youtubeUrl: 'someUrl' },
];

export class BloggersController {
  static async getBloggers(req: Request, res: Response) {
    res.send(bloggers);
  }

  static async getBlogger(req: Request, res: Response) {
    const item = bloggers.find((item) => item.id === Number(req.params.id));
    if (!item) res.send(404);
    if (item) res.send(item);
  }

  static async createBlogger(req: Request, res: Response) {
    const name = req.body.name ?? null;
    const youtubeUrl = req.body.youtubeUrl ?? null;

    if (!name || !youtubeUrl) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'name and youtube url is required',
      };
      res.status(400).send(problems);
    }

    if (!youtubeUrlMatch.test(youtubeUrl)) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'youtube url is invalid',
      };
      res.status(400).send(problems);
    }

    const newItem: IBlogger = {
      id: +(new Date()),
      name,
      youtubeUrl,
    };
    bloggers.push(newItem);
    res.status(201).send(newItem);
  }

  static async updateBlogger(req: Request, res: Response) {
    const youtubeUrl = req.body.youtubeUrl ?? null;
    const updatedItem = bloggers.find((item) => item.id === Number(req.params.id));

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

    if (!youtubeUrlMatch.test(youtubeUrl)) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'youtube url is invalid',
      };
      res.status(400).send(problems);
    }

    if (updatedItem) {
      bloggers = bloggers.map((item) => {
        if (item.id === Number(req.params.id)) {
          item.name = req.body.name ? req.body.name : item.name;
          item.youtubeUrl = req.body.youtubeUrl ? req.body.youtubeUrl : item.youtubeUrl;
        }
        return item;
      });
      res.send(204);
    }
  }

  static async deleteBlogger(req: Request, res: Response) {
    const deletedItem = bloggers.find((item) => item.id === Number(req.params.id));

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
      bloggers = bloggers.filter((item) => item.id !== Number(req.params.id));
      res.send(204);
    }
  }
}
