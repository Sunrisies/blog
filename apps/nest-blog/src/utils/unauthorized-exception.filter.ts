import { Catch, ExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception,'111');
    response
      .status(401)
      .json({
        statusCode: 401,
        message: 'Unauthorized1212',
        error: 'Unauthorized',
      });
  }
}
