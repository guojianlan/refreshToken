declare global {
  namespace Express {
    interface Request {
      aa: string;
      cc: Date;
      headers: {
        accessToken?: string;
        t: string;
        refreshToken?: string;
      };
    }
  }
}
declare module 'http' {
  interface IncomingHttpHeaders {
    accessToken?: string;
    t: string;
    refreshToken?: string;
  }
}
