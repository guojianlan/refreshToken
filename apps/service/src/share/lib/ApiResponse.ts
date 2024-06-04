/**
 * share/lib/ApiResponse.ts
 */
interface IApiResponse<T> {
  status: number;
  code: number;
  data: T;
  msg?: string;
}

export class ApiResponse {
  static success: <T>(data: T) => IApiResponse<T> = (data) => {
    return {
      status: 1,
      code: 0,
      data: data,
    };
  };
  static fail: (code?: number, msg?: string, data?: any) => IApiResponse<any> =
    (code = 1, msg = '', data = {}) => {
      return {
        status: 0,
        code,
        msg,
        data: data,
      };
    };
}
