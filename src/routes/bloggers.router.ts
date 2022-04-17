import { Request, Response, Router } from 'express';
import { IProblemDetails } from '../repositories/types';
import {
  validateBloggerId,
  validatePosts
} from '../middlewares/field-validation/bloggers-field-validation.middleware';
import { handleFieldsErrors } from '../middlewares/field-validation/handle-fields-errors';
import { BloggersService } from '../domain/bloggers.service';

export const bloggersRouter = Router({});

bloggersRouter.get('/', async (req: Request, res: Response) => {
  const items = await BloggersService.findAll();
  res.send(items);
});

bloggersRouter.post(
  '/',
  validatePosts(),
  handleFieldsErrors(),
  async (req: Request, res: Response) => {
    const name = req.body.name ?? null;
    const youtubeUrl = req.body.youtubeUrl ?? null;

    const newItem = await BloggersService.create({ name, youtubeUrl });

    res.status(201).send(newItem);
  });

bloggersRouter.get(
  '/:id',
  validateBloggerId(),
  handleFieldsErrors(),
  async (req: Request, res: Response) => {
    const item = await BloggersService.findOne({ id: Number(req.params.id) });
    if (!item) return res.send(404);
    if (item) return res.send(item);
  });

bloggersRouter.post(
  '/:id',
  validateBloggerId(),
  handleFieldsErrors(),
  async (req: Request, res: Response) => {
    const updatedItem = await BloggersService.update({
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
  });

bloggersRouter.delete(
  '/:id',
  validateBloggerId(),
  handleFieldsErrors(),
  async (req: Request, res: Response) => {
    const isItemDeleted = await BloggersService.remove({ id: Number(req.params.id) });

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
