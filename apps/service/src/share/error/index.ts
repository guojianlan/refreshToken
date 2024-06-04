import { isObject, isString } from 'lodash';

/**
 * /share/error/index.ts
 */
export class CustomBaseException extends Error {
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number,
  ) {
    super();
    this.initMessage();
  }

  public initMessage() {
    if (isString(this.response)) {
      if (typeof this.response === 'string') {
        this.message = this.response;
      }
    } else if (
      isObject(this.response) &&
      isString((this.response as Record<string, any>).message)
    ) {
      this.message = (this.response as Record<string, any>).message;
    }
  }

  public getResponse(): string | object {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }
  public getBusinessCode() {
    if (isString(this.response)) {
      return this.status;
    }
    return this.response?.code || this.status;
  }

  public static createBody(
    objectOrError: object | string,
    message?: string,
    statusCode?: number,
  ) {
    if (!objectOrError) {
      return { statusCode, message };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: message };
  }
}

export class CommonException extends CustomBaseException {
  constructor(message: any, code?: number, meta?: any) {
    super(
      CustomBaseException.createBody(
        { message, ...meta },
        message,
        code || 400,
      ),
      code || 400,
    );
  }
}

export class CustomException {
  static authException = () => {
    return new CommonException('请登录', 401, { code: 40100 });
  };
  static forbitionException = () => {
    return new CommonException('暂无权限', 403, { code: 40300 });
  };
  static badRequestException(message: string, meta?: Record<string, any>) {
    return new CommonException(message, 400, { code: 40001, ...meta });
  }
}
