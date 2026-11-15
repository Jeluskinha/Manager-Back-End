import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../errors/appError";

const handleErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {

  if (error instanceof AppError) {
    return handleError(error, res);
  }

  // Erro inesperado: registra no servidor (o cliente só recebe a mensagem genérica)
  console.error(`[${req.method} ${req.originalUrl}]`, error);

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Erro interno do servidor"
  });
};

export default handleErrorMiddleware;