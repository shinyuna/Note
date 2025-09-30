import { HttpClientError } from './httpClient.error';

import type { RESTDataSource, HttpClientParams, RequestOptions, RequestParams } from './httpClient.type';

export class HTTPClient implements RESTDataSource {
  private static AbortController = new AbortController();
  private baseURL: string;
  private timeout: number;
  private credentials: RequestCredentials;
  private readonly DEFAULT_TIMEOUT = 10 * 1000;

  private constructor({ baseURL, timeout, credentials }: HttpClientParams) {
    this.baseURL = baseURL;
    this.timeout = timeout ?? this.DEFAULT_TIMEOUT;
    this.credentials = credentials ?? 'same-origin';
  }

  static create(params: HttpClientParams) {
    return new HTTPClient(params);
  }

  get<TResult = unknown>(path: string, options?: RequestOptions) {
    return this.request<TResult>({ path, method: 'GET', options });
  }
  post<TResult = unknown, Body = unknown>(path: string, body: Body, options?: RequestOptions) {
    return this.request<TResult>({ path, method: 'POST', body, options });
  }
  patch<TResult = unknown, Body = unknown>(path: string, body: Body, options?: RequestOptions) {
    return this.request<TResult>({ path, method: 'PATCH', body, options });
  }
  put<TResult = unknown, Body = unknown>(path: string, body: Body, options?: RequestOptions) {
    return this.request<TResult>({ path, method: 'PUT', body, options });
  }
  delete<TResult = unknown, Body = unknown>(path: string, body?: Body, options?: RequestOptions) {
    return this.request<TResult>({ path, method: 'DELETE', body, options });
  }

  private abortSignal() {
    const timeoutController = new AbortController();
    let combinedSignal: AbortSignal = timeoutController.signal;

    if (this.hasAbortSignalAny(AbortSignal)) {
      combinedSignal = AbortSignal.any([HTTPClient.AbortController.signal, timeoutController.signal]);
    }

    const timeoutId = setTimeout(() => {
      timeoutController.abort(
        new DOMException('Timeout - Request was aborted before receiving a response', 'AbortError')
      );
    }, this.timeout);
    const cancelTimeout = () => clearTimeout(timeoutId);

    return { combinedSignal, cancelTimeout };
  }

  private hasAbortSignalAny(AbortSignal: any): AbortSignal is { any: (AbortSignals: AbortSignal[]) => AbortSignal } {
    return typeof AbortSignal !== 'undefined' && 'any' in AbortSignal;
  }

  private async request<TResult = unknown>(params: RequestParams) {
    const url = `${this.baseURL}${params.path}`;
    const { combinedSignal, cancelTimeout } = this.abortSignal();

    const hasBody = this.hasBody(params.method, params.body);
    const headers = hasBody
      ? { 'Content-Type': 'application/json', ...params.options?.headers }
      : params.options?.headers;

    try {
      const response = await fetch(url, {
        headers,
        method: params.method,
        signal: combinedSignal,
        credentials: this.credentials,
        ...(hasBody ? { body: JSON.stringify(params.body) } : {}),
        ...params.options,
      });

      if (!response.ok) {
        throw HttpClientError.createHttpClientError({
          message: `HTTP error! response is not ok`,
          url: response.url,
          statusCode: response.status,
        });
      }

      const data = await response.json();

      return data as TResult;
    } finally {
      cancelTimeout();
    }
  }

  private hasBody(method: string, body: unknown): body is object {
    if (method === 'GET') {
      return false;
    }

    return typeof body === 'object' && body !== null;
  }
}

