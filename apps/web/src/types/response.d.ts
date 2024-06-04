declare namespace ApiManager {
  export interface IResponseListWithPagination<T> extends IResponseList<T> {
    pagination: {
      count: number;
      pageSize: number;
      page: number;
    };
  }
  export interface IResponseList<T> {
    list: T[];
  }
  export interface IResponseItem<T> {
    item: T;
  }

  export type TResponse = RequestInit & {
    queryCache?: boolean;
    fetchEventStream?: boolean;
  };
  export interface IActionResponse<T> extends Response {
    json: () => Promise<IFetchActionPromise<T>>;
    error?: boolean;
    // 错误的时候才有
    response?: IActionResponse<T>;
  }
  export interface IFetchActionPromise<T> {
    data: T;
    msg: string;
    code: number;
  }
}
