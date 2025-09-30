type HttpClientErrorDTO = {
  url: string;
  message: string;
  statusCode: number;
}

export class HttpClientError extends Error {
  private constructor(dto: HttpClientErrorDTO) {
    super(dto.message);
    this.name = 'HttpClientError';
  }

  static createHttpClientError(dto: HttpClientErrorDTO) {
    return new HttpClientError(dto);
  }

  static isHttpClientError(error: unknown): error is HttpClientError {
    return error instanceof HttpClientError;
  }
}
