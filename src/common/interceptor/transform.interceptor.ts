import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const path = context.switchToHttp().getRequest().url;

    const timestamp = new Date().toISOString();
    return next.handle().pipe(
      map((data) => {
        if (data.error !== undefined) {
          delete data['response'];
          delete data['name'];
          throw new HttpException(
            { status: 'FAILED', ...data },
            data['statusCode'],
          );
        }
        const res = {
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
        res['status'] = 'SUCCESS';
        if (Array.isArray(data)) res['data'] = data;
        else res['payload'] = data;
        res['path'] = context.switchToHttp().getRequest().url;
        res['timestamp'] = new Date().toISOString();

        return res as Response<T>;
      }),

      catchError(async (responseData) => {
        const { response, status = 500 } = responseData;

        return Promise.reject(
          new HttpException(
            {
              status: status === 422 ? 'INVALID' : 'FAILED',
              message:
                (!response ? responseData?.message : response.message) ||
                'Internal Server Error',
              statusCode: !response ? status : response.statusCode,
              error: !response ? null : response.error,
              path,
              timestamp,
            },
            status,
          ),
        );
      }),
    );
  }
}
