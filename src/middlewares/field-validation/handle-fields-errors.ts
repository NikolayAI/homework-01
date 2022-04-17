import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const handleFieldsErrors = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorsMessages: errors.array().map((error) => ({
          message: error.msg,
          field: error.param,
        })),
        resultCode: 0,
        data: {
          additionalProp1: 'some prop1',
          additionalProp2: 'some prop2',
          additionalProp3: 'some prop3'
        },
      });
    }
    next();
  };
};