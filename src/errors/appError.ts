import { Response } from 'express'
class AppError extends Error {
  
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number = 400, details?: any) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
  }
}

const handleError = (error: AppError, response: Response) => {
  const { statusCode, message, details } = error

  return response.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      ...(details && { details }) // opcional
  })
}
export { AppError, handleError }