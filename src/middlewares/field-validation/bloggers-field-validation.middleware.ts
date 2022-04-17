import { body, param } from 'express-validator';
import { youtubeUrlMatch } from './constants';

export const validateName = () => {
  return body('name')
    .isString()
    .withMessage('Post id should be a string.')
    .isLength({ min: 1 })
    .withMessage('Blogger name should contains more than 1 symbol.')
    .isLength({ max: 30 })
    .withMessage('Blogger name should contains less than 30 symbols.');
};
export const validateYoutubeUrl = () => {
  return body('youtubeUrl')
    .isString()
    .withMessage('Post id should be a string.')
    .custom((value) => youtubeUrlMatch.test(value))
    .withMessage('YouTube url should be valid.');
};

export const validateBloggerId = () => {
  return param('id')
    .isInt({ min: 1 })
    .withMessage('Blogger id should be number that more than 0.');
};
export const validatePosts = () => {
  return [
    validateName(),
    validateYoutubeUrl(),
  ];
};