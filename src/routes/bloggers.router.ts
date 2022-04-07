import { Request, Response, Router } from 'express';

import { BloggersRepository } from '../repositories/bloggers.repository';
import { IProblemDetails } from '../repositories/types';

const youtubeUrlMatch = new RegExp('^https:\/\/([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+$');

export const bloggersRouter = Router({});

bloggersRouter
  .get('/', (req: Request, res: Response) => {
    const items = BloggersRepository.getItems();
    res.send(items);
  })
  .post('/', (req: Request, res: Response) => {
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
      return res.status(400).send(problems);
    }

    if (!youtubeUrlMatch.test(youtubeUrl)) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'youtube url is invalid',
      };
      return res.status(400).send(problems);
    }

    const newItem = BloggersRepository.createItem({ name, youtubeUrl });

    res.status(201).send(newItem);
  })
  .get('/:id', (req: Request, res: Response) => {
    const item = BloggersRepository.getItem({ id: Number(req.params.id) });
    if (!item) return res.send(404);
    if (item) return res.send(item);
  })
  .post('/:id', (req: Request, res: Response) => {
    const youtubeUrl = req.body.youtubeUrl ?? null;

    if (!youtubeUrlMatch.test(youtubeUrl)) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'youtube url is invalid',
      };
      return res.status(400).send(problems);
    }

    const updatedItem = BloggersRepository.updateItem({
      id: Number(req.params.id),
      name: req.body.name,
      youtubeUrl: req.body.youtubeUrl,
    });

    if (!updatedItem) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 404,
        instance: 'some instance',
        detail: 'not found',
      };
      return res.status(404).send(problems);
    }

    if (updatedItem) res.send(204);
  })
  .delete('/:id', (req: Request, res: Response) => {
    const isItemDeleted = BloggersRepository.deleteItem({ id: Number(req.params.id) });

    if (!isItemDeleted) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 404,
        instance: 'some instance',
        detail: 'not found',
      };
      return res.status(404).send(problems);
    }

    if (isItemDeleted) res.send(204);
  });
