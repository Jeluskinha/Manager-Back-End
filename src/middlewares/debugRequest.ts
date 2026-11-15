import { Request, Response, NextFunction } from 'express';
// Middleware's relacionados a métodos de request

// Middleware para log de requisições (método e URL)
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Middleware para capturar erros de parsing JSON (deve ser usado APÓS o express.json())
export const jsonErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    console.error('Erro de parsing JSON:', err.message);
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next(err);
};