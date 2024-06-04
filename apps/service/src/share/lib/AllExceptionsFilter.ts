/**
 * share/lib/AllExceptionsFilter.ts
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './ApiResponse';
import { CommonException } from '../error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    if (exception instanceof CommonException) {
      // 如果是自定义的异常
      return res
        .status(exception.getStatus())
        .send(
          ApiResponse.fail(
            exception.getBusinessCode(),
            exception.message,
            exception.getResponse(),
          ) as unknown as string,
        );
    }
    if (exception instanceof HttpException) {
      // http异常
      return res
        .status(exception.getStatus())
        .send(
          ApiResponse.fail(
            exception.getStatus(),
            exception.message,
            exception.getResponse(),
          ) as unknown as string,
        );
    }
    // 无法预知的异常
    res
      .status(500)
      .send(
        ApiResponse.fail(50000, exception.message, { error: exception.stack }),
      );
  }
}
