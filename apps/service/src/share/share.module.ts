/**
 * share/share.module.ts
 */
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformDataInterceptor } from './lib/TransformDataInterceptor';
import { AllExceptionsFilter } from './lib/AllExceptionsFilter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformDataInterceptor,
    },
  ],
})
export class ShareModule {}
