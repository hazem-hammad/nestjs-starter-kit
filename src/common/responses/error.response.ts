import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  constructor(
    public readonly message: string,
    public readonly errors?: Record<string, string[]>,
    public readonly data?: any,
  ) {}

  static create(
    message: string,
    errors?: Record<string, string[]> | null,
    data?: any,
    statusCode: number = HttpStatus.OK,
  ) {
    throw new HttpException(
      new ErrorResponse(message, errors || undefined, data),
      statusCode,
    );
  }

  toJSON() {
    return {
      message: this.message,
      errors: this.errors || null,
      data: this.data || null,
    };
  }
}
