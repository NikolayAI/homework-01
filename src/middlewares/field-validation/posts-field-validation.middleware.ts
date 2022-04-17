import { body, param } from 'express-validator';

import { POST_SHORT_DESCRIPTION_MAX_LENGTH } from './constants';
import { handleFieldsErrors } from './handle-fields-errors';

export const validatePostId = () => {
  return param('id')
    .isLength({ min: 1 })
    .withMessage('Post id should contains more than 1 symbol.')
    .isInt()
    .withMessage('Post id should be a number.')
};
export const validateTitle = () => {
  return body('title')
    .isLength({ min: 2 })
    .withMessage('Title should contains more than 1 symbol.')
    .isLength({ max: 20 })
    .withMessage('Title should contains less than 20 symbols.');
};
export const validateShortDescription = () => {
  return body('shortDescription')
    .isLength({ max: POST_SHORT_DESCRIPTION_MAX_LENGTH })
    .withMessage(`Title should contains less than ${POST_SHORT_DESCRIPTION_MAX_LENGTH} symbols.`);
};
export const validateContent = () => {
  return body('content')
    .isLength({ min: 2 })
    .withMessage('Content should contains more than 1 symbol.')
    .isLength({ max: 20 })
    .withMessage('Title should contains less than 20 symbols.');
};
export const validateBloggerId = () => {
  return body('bloggerId')
    .isInt({ min: 1 })
    .withMessage('Blogger id should be number that more than 0.');
};
export const validatePosts = () => {
  return [
    validateTitle(),
    validateShortDescription(),
    validateContent(),
    validateBloggerId(),
    handleFieldsErrors,
  ];
};