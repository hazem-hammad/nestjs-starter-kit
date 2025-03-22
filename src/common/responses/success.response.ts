import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export class SuccessResponse<T> {
  constructor(
    public readonly data: T,
    public readonly message?: string,
  ) {}

  static create<T>(
    data: T,
    message?: string,
    statusCode: number = HttpStatus.OK,
  ) {
    throw new HttpException(new SuccessResponse(data, message), statusCode);
  }

  toJSON() {
    return {
      message: this.message || null,
      data: this.data,
    };
  }
}
