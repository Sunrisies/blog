import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
enum HttpStatus {
  AccessTokenExpired = 401,
  RefreshTokenExpired = 402,
  Forbidden = 403,
}

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { message } = exception;
    let code;
    switch (message) {
      case 'access_token 失效,请走刷新token流程':
        code = HttpStatus.AccessTokenExpired;
        break;
      case 'refresh_token 失效,请重新登录':
        code = HttpStatus.RefreshTokenExpired;
        break;
      case '无权限访问':
        code = HttpStatus.Forbidden;
        break;
      default:
        code = HttpStatus.Forbidden;
        break;
    }

    response.status(200).json({
      code,
      message,
    });
  }
}
