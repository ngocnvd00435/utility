// src/interceptors/transform.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: 200,
        message: 'success',
        error: null,
        data, // Tất cả dữ liệu trả về sẽ nằm trong field 'data'
      })),
    );
  }
}
