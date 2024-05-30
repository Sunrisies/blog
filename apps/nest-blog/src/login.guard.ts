import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  Module,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as cookie from 'cookie';
import { APP_FILTER } from '@nestjs/core';
import {  } from './utils/unauthorized-exception.filter';
let info;
@Injectable()
// @Module({
//   providers: [
//     {
//       provide: APP_FILTER,
//       useClass: UnauthorizedExceptionFilter,
//     },
//   ],
// })
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;
  canActivate(context: ExecutionContext): any {
    const request: Request = context.switchToHttp().getRequest();
    // 获取cookie
    console.log(cookie, 'cookiecookie');
    const cookieString = request.headers.cookie || ''; // user_id=1; user_name=%E6%9C%9D%E9%98%B3
    const parsedCookies = cookie.parse(cookieString);

    const token = parsedCookies.token;
    console.log(token, 'tokentoken');
    if (!token) {
      throw new UnauthorizedException('请重新登录');
    }
    try {
      info = this.jwtService.verify(token);
      console.log(info, 'infoinfo');
      (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
export { info };
