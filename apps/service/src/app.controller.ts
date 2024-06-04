/**
 * app.controller.ts
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/guard/authGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test')
  @UseGuards(AuthGuard)
  getHelloTest(): { list: string[] } {
    return {
      list: ['a', 'b', 'c'],
    };
  }
}
