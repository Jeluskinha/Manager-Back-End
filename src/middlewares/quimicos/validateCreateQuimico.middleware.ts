// middlewares/validateQuimico.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appError";

export const validaCreateQuimicoJSON = (req: Request, res: Response, next: NextFunction) => {
  const { produto, codigo } = req.body;

  const validKeys = ['produto', 'codigo'];
  const receivedKeys = Object.keys(req.body);
  const invalidKeys = receivedKeys.filter(key => !validKeys.includes(key));
  const missingKeys = validKeys.filter(key => !receivedKeys.includes(key));

  if (invalidKeys.length > 0 || missingKeys.length > 0) {
    throw new AppError(
      'Chaves inválidas', 
      400,
      {
        invalidKeys,
        missingKeys,
        expected_schema: {
          "produto": "string",
          "codigo": "string"
        }
      }
    );
  }

  if (typeof produto !== 'string' || typeof codigo !== 'string') {
    throw new AppError(
      'Verifique os campos enviados.', 
      400,
      {
        expected_schema: {
          "produto": "string",
          "codigo": "string"
        }
      }
    );
  }

  next();
};