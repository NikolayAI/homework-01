import { Request, Response, Router } from 'express';
import { IProblemDetails } from '../repositories/types';
import {
  validatePostId,
  validatePosts,
  validateShortDescription
} from '../middlewares/field-validation/posts-field-validation.middleware';
import { handleFieldsErrors } from '../middlewares/field-validation/handle-fields-errors';
import { PostsService } from '../domain/posts.service';

export const postsRouter = Router({});

postsRouter.get('/', async (req: Request, res: Response) => {
  const items = await PostsService.findAll();
  res.send(items);
});

postsRouter.post('/', validatePosts(), async (req: Request, res: Response) => {
  const newItem = await PostsService.create({
    title: req.body?.title,
    content: req.body?.content,
    shortDescription: req.body?.shortDescription,
    bloggerId: req.body?.bloggerId
  });
  res.status(201).send(newItem);
});

postsRouter.get(
  '/:id',
  validatePostId(),
  handleFieldsErrors(),
  async (req: Request, res: Response) => {
    const item = await PostsService.findOne({ id: Number(req.params.id) });
    if (!item) return res.send(404);
    return res.send(item);
  });

postsRouter.put(
  '/:id',
  validatePostId(),
  validateShortDescription(),
  handleFieldsErrors(),
  async (req: Request, res: Response) => {
    const {
      title,
      shortDescription,
      content,
      bloggerId,
    } = req.body || {};

    const updatedItem = await PostsService.update({
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
  });

postsRouter.delete(
  '/:id',
  validatePostId(),
  handleFieldsErrors(),
  async (req: Request, res: Response) => {
    const isItemDeleted = await PostsService.remove({ id: Number(req.params.id) });

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