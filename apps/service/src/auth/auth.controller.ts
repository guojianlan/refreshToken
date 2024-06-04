import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserEntity } from './entity/user.entity';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: UserEntity) {
    return this.authService.login(body);
  }
  @Get('refreshToken')
  refreshToken(@Req() req: Request) {
    const refreshToken = req.headers['refresh-token'] || '';
    return this.authService.refreshToken(refreshToken as string);
  }
}
