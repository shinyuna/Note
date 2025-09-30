export type RequestOptions = {
  headers?: HeadersInit;
  timeout?: number;
  cache?: RequestCache;
  baseURL?: string;
  credentials?: RequestCredentials;
};

export type HttpClientParams = Pick<RequestOptions, 'timeout' | 'credentials'> & {
  baseURL: string;
};
export type RequestParams = {
  path: string;
  method: NonNullable<RequestInit['method']>;
  body?: unknown;
  options?: RequestOptions;
};

export interface RESTDataSource {
  get<TResult = unknown>(path: string, options?: RequestOptions): Promise<TResult>;
  post<TResult = unknown, Body = unknown>(path: string, body: Body, options?: RequestOptions): Promise<TResult>;
  patch<TResult = unknown, Body = unknown>(path: string, body: Body, options?: RequestOptions): Promise<TResult>;
  put<TResult = unknown, Body = unknown>(path: string, body: Body, options?: RequestOptions): Promise<TResult>;
  delete<TResult = unknown, Body = unknown>(path: string, body?: Body, options?: RequestOptions): Promise<TResult>;
}
