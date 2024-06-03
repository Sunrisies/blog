import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Res,
  Query,
  Inject,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './user/dto/register.dto';
import { LoginDto } from './user/dto/login.dto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}
  // 获取cookie的值

  @Get('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.appService.refreshToken(request, res);
  }

  @Post('/register')
  register(@Body(ValidationPipe) RegisterDto: RegisterDto) {
    return this.appService.register(RegisterDto);
  }

  @Post('/login')
  async queryUser(
    @Body(ValidationPipe) LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.appService.login(LoginDto, res);
  }
}
