/**
 * auth/auth.service.ts
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entity/user.entity';
import { CustomException } from '../share/error';

const users: UserEntity[] = [
  {
    id: 1,
    username: 'admin@qq.com',
    password: '123456',
    deleteAt: null,
  },
  {
    id: 2,
    username: '424139777@qq.com',
    password: '123456',
    deleteAt: new Date(),
  },
  {
    id: 3,
    username: '',
    password: '123456',
    deleteAt: null,
  },
];
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  login(user: UserEntity) {
    // 判断用户是否合法
    const findIndex = users.findIndex(
      (item) => item.username === user.username && item.deleteAt === null,
    );
    if (findIndex < 0) {
      throw CustomException.badRequestException('账号不存在', {
        username: '账号不存在',
      });
    }
    if (users[findIndex].password !== user.password) {
      throw CustomException.badRequestException('密码错误', {
        username: '密码错误',
      });
    }

    const tokens = this._generateToken(users[findIndex]);
    return {
      responseHeaders: {
        ...tokens,
      },
    };
  }
  _generateToken(user: UserEntity) {
    const payload = {
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });
    return {
      'Access-Token': accessToken,
      'Refresh-Token': refreshToken,
    };
  }
  async refreshToken(refreshToken: string) {
    const { userId } = this.jwtService.verify(refreshToken);
    const user = users.find(
      (item) => item.id == userId && item.deleteAt === null,
    );
    if (user) {
      const tokens = this._generateToken(user);
      return {
        responseHeaders: {
          ...tokens,
        },
        success: true,
      };
    }
    return {
      success: false,
    };
  }
}
