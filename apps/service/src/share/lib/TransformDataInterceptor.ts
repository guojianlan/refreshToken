/**
 * share/lib/TransformDataInterceptor.ts
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from './ApiResponse';
import { Response } from 'express';
@Injectable()
export class TransformDataInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const res = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        // 对responseHeaders这个key特殊处理，变成设置头信息返回
        if (data && data.responseHeaders) {
          Object.keys(data.responseHeaders).forEach((key) => {
            res.setHeader(key, data.responseHeaders[key]);
          });
          delete data.responseHeaders;
        }
        return ApiResponse.success(data);
      }),
    );
  }
}
