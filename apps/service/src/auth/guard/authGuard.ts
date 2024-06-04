/**
 * auth/guard/authGuard.ts
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CustomException } from '../../share/error';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const headerAuthorization = req.headers.authorization || '';
    const bearer = headerAuthorization.split(' ')[1];
    if (!bearer) throw CustomException.authException();
    try {
      this.jwtService.verify(bearer);
      //   这里可以做黑白名单做限制，回源库查找用户是否禁用等
    } catch (e) {
      throw CustomException.authException();
    }

    return true;
  }
}
