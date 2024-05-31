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
import * as cookie from 'cookie';
let info;
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;
  canActivate(context: ExecutionContext): any {
    const request: Request = context.switchToHttp().getRequest();
    // 获取cookie
    console.log(cookie, 'cookiecookie');
    const cookieString = request.headers.cookie || ''; // user_id=1; user_name=%E6%9C%9D%E9%98%B3
    const parsedCookies = cookie.parse(cookieString);

    const access_token = parsedCookies.access_token;
    console.log(access_token, 'tokentoken');
    if (!access_token) {
      throw new UnauthorizedException('access_token 失效,请走刷新token流程');
    }
    try {
      info = this.jwtService.verify(access_token);
      console.log(info, 'infoinfo');
      (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
export { info };
