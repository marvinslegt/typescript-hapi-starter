import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';

interface IResponseMeta {
  operation?: string;
  method?: string;
  paging?: string | null;
}

interface IResponseError {
  code?: string | number;
  message?: string;
  error?: string;
}

interface IResponse<T> {
  meta: IResponseMeta;
  data: T[];
  errors: IResponseError[];
}

interface IResponseOptions<T> {
  value?: T | null | undefined;
  boom?: Boom.Boom<unknown> | null | undefined;
}

export default function createResponse<T>(
  request: Hapi.Request,
  { value = null, boom = null }: IResponseOptions<T>
): IResponse<T> {
  const errors: IResponseError[] = [];
  const data: unknown = [];

  if (boom) {
    errors.push({
      code: boom.output.payload.statusCode,
      error: boom.output.payload.error,
      message: boom.output.payload.message,
    });
  }

  if (value && data) {
    if (Array.isArray(value)) {
      (data as unknown[]).push(...value);
    } else {
      (data as unknown[]).push(value);
    }
  }

  return {
    meta: {
      method: request.method.toUpperCase(),
      operation: request.url.pathname,
      paging: null,
    },
    data: data as T[],
    errors,
  };
}
