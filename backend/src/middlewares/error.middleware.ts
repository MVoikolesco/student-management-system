import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        status: 'error',
        message: 'Já existe um registro com este valor único'
      });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Registro não encontrado'
      });
    }
  }

  if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
    return res.status(400).json({
      status: 'error',
      message: 'JSON inválido'
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor'
  });
}; 