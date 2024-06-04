/**
 * app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ShareModule } from './share/share.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ShareModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => {
        return {
          secret: 'testasdasdads',
          signOptions: {
            expiresIn: 60 * 60 * 0.5, //半小时
          },
        };
      },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
