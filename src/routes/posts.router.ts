import { Request, Response, Router } from 'express';

import { BloggersRepository } from '../repositories/bloggers.repository';
import { PostsRepository } from '../repositories/posts.repository';
import { IProblemDetails } from '../repositories/types';
import { POST_SHORT_DESCRIPTION_MAX_LENGTH } from './constants';

export const postsRouter = Router({});

postsRouter
  .get('/', (req: Request, res: Response) => {
    const items = PostsRepository.getItems();
    const itemsDto = items.map((item) => ({
      ...item,
      bloggerName: BloggersRepository.getItem({ id: item.bloggerId })?.name ?? null,
    }));
    res.send(itemsDto);
  })
  .post('/', (req: Request, res: Response) => {
    const {
      title,
      shortDescription,
      content,
      bloggerId,
    } = req.body || {};

    if (!title || !shortDescription || !content || !bloggerId) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'title, short description, content, blogger id is required',
      };
      return res.status(400).send(problems);
    }

    if (shortDescription?.length > POST_SHORT_DESCRIPTION_MAX_LENGTH) {
      const problems: IProblemDetails = {
        type: 'some type',
        title: 'some title',
        status: 400,
        instance: 'some instance',
        detail: 'shortDescription should be less than 100 symbols',
      };
      return res.status(400).send(problems);
    }

    const newItem = PostsRepository.createItem({
      title,
      content,
      shortDescription,
      bloggerId
    });
    const newItemDto = {
      ...newItem,
      bloggerName: BloggersRepository.getItem({ id: newItem.bloggerId })?.name ?? null,
    };

    res.status(201).send(newItemDto);
  })
  .get('/:id', (req: Request, res: Response) => {
    const item = PostsRepository.getItem({ id: Number(req.params.id) });
    if (!item) return res.send(404);
    if (item) {
      const itemDto = {
        ...item,
        bloggerName: BloggersRepository.getItem({ id: item.bloggerId })?.name ?? null,
      };
      return res.send(itemDto);
    }
  })
  .post('/:id', (req: Request, res: Response) => {
    const {
      title,
      shortDescription,
      content,
      bloggerId,
    } = req.body || {};

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

    const updatedItem = PostsRepository.updateItem({
      id: Number(req.params.id),
      bloggerId,
      title,
      content,
      shortDescription,
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
    const isItemDeleted = PostsRepository.deleteItem({ id: Number(req.params.id) });

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