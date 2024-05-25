import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Data<T> {
  data: T;
  code: number;
  message: string;
}

export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next
      .handle()
      .pipe(
        map(({ data, message = '请求成功', code = 200 }) => ({ code, message, data })),
      );
  }
}
